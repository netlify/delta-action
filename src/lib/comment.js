const regexEscape = require('regex-escape')

const { formatValue } = require('./units')

const createComment = ({ baseSha, metrics, job, previousMetrics = {}, title }) => {
  const metadata = `<!--delta:${job}@${JSON.stringify(metrics)}-->`
  const metricsList = metrics.map((metric) => getMetricLine(metric, previousMetrics[metric.name])).join('\n')
  const baseShaLine = baseSha && previousMetrics.length !== 0 ? `Comparing with ${baseSha}\n\n` : ''

  return `## ${title}\n\n${baseShaLine}${metricsList}\n${metadata}`
}

const getMetricsComment = ({ comments, job }) => {
  const deltaComment = comments.map(({ body }) => parseComment(body, job)).find(Boolean)

  return deltaComment
}

const getMetricLine = ({ displayName, name, units, value }, previousValue) => {
  const comparison = getMetricLineComparison(value, previousValue)
  const formattedValue = formatValue(value, units)

  return `- **${displayName || name}**: ${formattedValue}${comparison ? ` ${comparison}` : ''}`
}

const getMetricLineComparison = (value, previousValue) => {
  if (previousValue === undefined) {
    return ''
  }

  const difference = value - previousValue

  if (difference === 0) {
    return '(no change)'
  }

  // eslint-disable-next-line no-magic-numbers
  const percentage = Math.abs((difference / value) * 100).toFixed(2)
  const [word, icon] = difference > 0 ? ['increase', '⬆️'] : ['decrease', '⬇️']

  return `${icon} (${percentage}% ${word})`
}

const findDeltaComment = (body, job) => {
  const regex = new RegExp(`<!--delta:${regexEscape(job)}@(.*)-->`)
  const match = body.match(regex)

  return match
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

module.exports = { createComment, findDeltaComment, getMetricsComment }
