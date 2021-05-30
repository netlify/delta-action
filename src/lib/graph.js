const BAR_BODY = '|  |'
const BAR_BODY_FILLED = '|▒▒|'
const BAR_TOP = '┌──┐'
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

const drawGraph = (values, { fillLast = false } = {}) => {
  const maxValue = values.reduce((max, { value }) => (value > max ? value : max), 0)
  const increment = maxValue / LINE_COUNT
  const augmentedValues = values.map((dataPoint) => {
    const filledLevels = Math.round(dataPoint.value / increment)

    return { ...dataPoint, emptyLevels: LINE_COUNT - filledLevels }
  })

  const levels = Array.from({ length: LINE_COUNT }, (_, index) =>
    drawLevel({ fillLast, level: index + 1, values: augmentedValues }),
  )
  const topLevels = [
    drawLevel({ level: -1, values: augmentedValues }),
    drawLevel({ level: 0, values: augmentedValues }),
  ]
  const base = drawBase(values)

  return `${[...topLevels, ...levels].join('\n')}\n${base}`
}

const drawLevel = ({ fillLast, level, values }) => {
  const padding = ' '.repeat(GAP_LENGTH / 2)
  const bars = values
    // eslint-disable-next-line complexity
    .map(({ displayValue, emptyLevels, value }, index) => {
      const isLastValue = index === values.length - 1

      if (emptyLevels < level) {
        return `${padding}${isLastValue && fillLast ? BAR_BODY_FILLED : BAR_BODY}${padding}`
      }

      if (emptyLevels === level) {
        return `${padding}${BAR_TOP}${padding}`
      }

      if (emptyLevels - 1 === level) {
        return getPaddedString((displayValue || value).toString(), BAR_BODY.length + GAP_LENGTH)
      }

      return `${padding}${' '.repeat(BAR_BODY.length)}${padding}`
    })
    .join('')

  return `${level === -1 ? '^' : '│'} ${bars}`
}

const getPaddedString = (string, length) => {
  const totalPadding = length - string.length

  if (totalPadding < 0) {
    return `${string.slice(0, length - 1)}…`
  }

  const paddingRightLength = Math.max(0, Math.round(totalPadding / 2))
  const paddingLeftLength = Math.max(0, totalPadding - paddingRightLength)
  const paddingLeft = ' '.repeat(paddingLeftLength)
  const paddingRight = ' '.repeat(paddingRightLength)

  return `${paddingLeft}${string}${paddingRight}`
}

module.exports = { drawGraph }
