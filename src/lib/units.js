const prettyBytes = require('pretty-bytes')
const prettyMilliseconds = require('pretty-ms')

// eslint-disable-next-line complexity
const formatValue = (value, unit) => {
  const normalizedUnit = unit && unit.toLowerCase()

  switch (normalizedUnit) {
    case 'b':
    case 'byte':
    case 'bytes':
      return prettyBytes(value)

    case 'ms':
    case 'millisecond':
    case 'milliseconds':
      return prettyMilliseconds(value)

    case 's':
    case 'seconds':
      // eslint-disable-next-line no-magic-numbers
      return prettyMilliseconds(value * 1000)

    default:
      return value.toLocaleString()
  }
}

module.exports = { formatValue }
