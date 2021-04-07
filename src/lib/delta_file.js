const { readFile } = require('fs')
const { join } = require('path')
const { promisify } = require('util')

const core = require('@actions/core')

const pReadFile = promisify(readFile)

const readDeltaFile = async (rootPath, inputFile) => {
  try {
    const filePath = join(rootPath, inputFile)
    const file = await pReadFile(filePath, 'utf8')

    return JSON.parse(file)
  } catch (error) {
    core.debug(`Could not read delta file: ${error.message}`)

    return {}
  }
}

module.exports = { readDeltaFile }
