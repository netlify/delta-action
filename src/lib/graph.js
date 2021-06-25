const BAR_BODY = '|  |'
const BAR_BODY_FILLED = '|▒▒|'
const BAR_BODY_MEAN = '┼──┼'
const BAR_TOP = '┌──┐'
const GAP = ' '
const GAP_MEAN = '─'
const GAP_LENGTH = 4
const LINE_COUNT = 20

const drawBase = (points) => {
  const axisPadding = '─'.repeat(GAP_LENGTH / 2)
  const axis = points.map(() => `${axisPadding}┴${'─'.repeat(BAR_BODY.length - 2)}┴${axisPadding}`).join('')
  const legend = points
    .map(({ label }) => {
      const text = getPaddedString(label, BAR_BODY.length + GAP_LENGTH)

      return text
    })
    .join('')

  return `└─${axis}>\n  ${legend}`
}

const drawGraph = (values, { drawMean = false, fillLast = false } = {}) => {
  const maxValue = values.reduce((max, { value }) => (value > max ? value : max), 0)
  const sum = values.reduce((acc, { value }) => acc + value, 0)
  const mean = sum / values.length
  const increment = maxValue / LINE_COUNT
  const meanLevel = drawMean ? LINE_COUNT - Math.round(mean / increment) : null
  const augmentedValues = values.map((dataPoint) => {
    const filledLevels = Math.round(dataPoint.value / increment)

    return { ...dataPoint, emptyLevels: LINE_COUNT - filledLevels }
  })

  const levels = Array.from({ length: LINE_COUNT }, (_, index) =>
    drawLevel({ fillLast, isMean: meanLevel === index + 1, level: index + 1, values: augmentedValues }),
  )
  const topLevels = [
    drawLevel({ level: -1, values: augmentedValues }),
    drawLevel({ level: 0, values: augmentedValues }),
  ]
  const base = drawBase(values)

  return `${[...topLevels, ...levels].join('\n')}\n${base}`
}

const drawLevel = ({ fillLast, isMean, level, values }) => {
  const gapCharacter = isMean ? GAP_MEAN : GAP
  const padding = gapCharacter.repeat(GAP_LENGTH / 2)
  const bars = values
    // eslint-disable-next-line complexity
    .map(({ displayValue, emptyLevels, value }, index) => {
      const isLastValue = index === values.length - 1

      if (emptyLevels < level) {
        const unfilledBody = isMean ? BAR_BODY_MEAN : BAR_BODY

        return `${padding}${isLastValue && fillLast ? BAR_BODY_FILLED : unfilledBody}${padding}`
      }

      if (emptyLevels === level) {
        return `${padding}${BAR_TOP}${padding}`
      }

      if (emptyLevels - 1 === level) {
        return getPaddedString((displayValue || value).toString(), BAR_BODY.length + GAP_LENGTH, gapCharacter)
      }

      return `${padding}${gapCharacter.repeat(BAR_BODY.length)}${padding}`
    })
    .join('')

  return `${level === -1 ? '^' : '│'} ${bars}`
}

const getPaddedString = (string, length, paddingCharacter = ' ') => {
  const totalPadding = length - string.length

  if (totalPadding < 0) {
    return `${string.slice(0, length - 1)}…`
  }

  const paddingRightLength = Math.max(0, Math.round(totalPadding / 2))
  const paddingLeftLength = Math.max(0, totalPadding - paddingRightLength)
  const paddingLeft = paddingCharacter.repeat(paddingLeftLength)
  const paddingRight = paddingCharacter.repeat(paddingRightLength)

  return `${paddingLeft}${string}${paddingRight}`
}

module.exports = { drawGraph }
