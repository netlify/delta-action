const prettyBytes = require('pretty-bytes')
const prettyMilliseconds = require('pretty-ms')

const KILO = 1e3

// eslint-disable-next-line complexity
const formatValue = (value, unit) => {
  const normalizedUnit = unit && unit.toLowerCase()

  switch (normalizedUnit) {
    case 'b':
    case 'byte':
    case 'bytes':
      return prettyBytes(value)

    case 'kb':
    case 'kilobyte':
    case 'kilobytes':
      return prettyBytes(value * KILO)

    case 'ms':
    case 'millisecond':
    case 'milliseconds':
      return prettyMilliseconds(value)

    case 's':
    case 'seconds':
      return prettyMilliseconds(value * KILO)

    default:
      return value.toLocaleString()
  }
}

module.exports = { formatValue }
