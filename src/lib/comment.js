import regexEscape from 'regex-escape'

import { drawGraph } from './graph.js'
import { formatValue } from './units.js'

const MAX_GRAPH_ITEMS = 13
const PAST_METRICS_COUNT = 30

export const createHeadBranchComment = ({ commitSha, metrics, job, previousCommit, title }) => {
  const allMetrics = getMetricsForHeadBranch({ commitSha, job, metrics, previousCommit })
  const metadata = `<!--delta:${job}@${JSON.stringify(allMetrics)}-->`
  const metricsList = metrics.map((metric) => getMetricLine(metric)).join('\n')

  return `## ${title}\n\n${metricsList}\n${metadata}`
}

export const createPullRequestComment = ({ baseSha, job, metrics, previousMetrics, title }) => {
  // Accounting for both the legacy metadata format (object) and the new
  // format (array of objects).
  const previousMetricsArray = (Array.isArray(previousMetrics) ? previousMetrics : [previousMetrics]).filter(Boolean)
  const metadata = `<!--delta:${job}@{}-->`
  const metricsList = metrics
    .map((metric) => {
      const [comparison = {}] = previousMetricsArray
      const previousValue = comparison[metric.name]
      // eslint-disable-next-line dot-notation
      const previousSha = comparison['__commit']
      const graphMetrics = [...previousMetricsArray, { __commit: baseSha, [metric.name]: metric.value }]
      const graph = getGraph({ metrics: graphMetrics, metricName: metric.name, units: metric.units })

      return getMetricLine(metric, previousValue, previousSha, graph)
    })
    .join('\n')
  const baseShaLine = baseSha && previousMetricsArray.length !== 0 ? `*Comparing with ${baseSha}*\n\n` : ''

  return `## ${title}\n\n${baseShaLine}${metricsList}\n${metadata}`
}

const getGraph = ({ metrics, metricName, units }) => {
  const points = metrics.map((metric, index) => {
    const offset = metrics.length - 1 - index
    const label = offset === 0 ? 'T' : `T-${offset}`

    return {
      // eslint-disable-next-line dot-notation
      commit: metric['__commit'],
      displayValue: formatValue(metric[metricName], units),
      label,
      value: metric[metricName],
    }
  })
  const graph = drawGraph(points.slice(MAX_GRAPH_ITEMS * -1), { drawMean: true, fillLast: true })
  const legendItems = points
    .map(
      ({ commit, displayValue, label }) =>
        `- ${label === 'T' ? '**' : ''}${label} (${label === 'T' ? 'current commit' : commit}): ${displayValue}${
          label === 'T' ? '**' : ''
        }`,
    )
    .join('\n')
  const legend = `<details>\n<summary>Legend</summary>\n\n${legendItems}</details>`
  const lines = ['```', graph, '```', legend]

  return lines.join('\n')
}

export const getMetricsComment = ({ comments, job }) => {
  const deltaComment = comments.map(({ body }) => parseComment(body, job)).find(Boolean)

  return deltaComment
}

const getMetricsForHeadBranch = ({ commitSha, job, metrics, previousCommit }) => {
  const metricValues = metrics.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {})
  const currentCommitMetrics = { __commit: commitSha, ...metricValues }

  if (previousCommit) {
    const previousMetrics = getMetricsComment({ comments: previousCommit.comments, job })
    const normalizedPreviousMetrics = normalizeMetrics(previousMetrics, previousCommit.baseSha).slice(
      0,
      PAST_METRICS_COUNT - 1,
    )

    return [currentCommitMetrics, ...normalizedPreviousMetrics]
  }

  return [currentCommitMetrics]
}

const getMetricLine = ({ displayName, name, units, value }, previousValue, previousSha, graph = '') => {
  const comparison = getMetricLineComparison(value, previousValue, previousSha)
  const formattedValue = formatValue(value, units)

  return `### ${displayName || name}: ${formattedValue}\n${comparison ? ` ${comparison}` : ''}\n${graph}`
}

const getMetricLineComparison = (value, previousValue, previousSha) => {
  if (previousValue === undefined) {
    return ''
  }

  const difference = value - previousValue

  if (difference === 0) {
    return '(no change)'
  }

  const percentage = Math.abs((difference / value) * FLOAT_TO_PERCENT).toFixed(2)
  const [word, icon] = difference > 0 ? ['increase', '⬆️'] : ['decrease', '⬇️']
  const shaText = previousSha ? ` vs. ${previousSha}` : ''

  return `${icon} **${percentage}% ${word}**${shaText}`
}

const FLOAT_TO_PERCENT = 100

export const findDeltaComment = (body, job) => {
  const regex = new RegExp(`<!--delta:${regexEscape(job)}@(.*)-->`)
  const match = body.match(regex)

  return match
}

const normalizeMetrics = (metrics, sha) => {
  if (!metrics) {
    return []
  }

  if (Array.isArray(metrics)) {
    return metrics
  }

  return [{ __commit: sha, ...metrics }]
}

const parseComment = (body, job) => {
  const match = findDeltaComment(body, job)

  if (!match) {
    return
  }

  try {
    return JSON.parse(match[1])
  } catch (_) {
    // no-op
  }
}
