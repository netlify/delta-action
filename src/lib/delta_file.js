import { readdir, readFile } from 'fs'
import { promisify } from 'util'

import core from '@actions/core'

const pReadDir = promisify(readdir)
const pReadFile = promisify(readFile)

const readDeltaFile = async (filePath) => {
  try {
    const data = await pReadFile(filePath, 'utf8')
    const match = data.match(/(\d+(?:\.\d+)?)\s*(\w*)\s*(?:\(([\s\S]*)\))?/)

    if (!match) {
      return null
    }

    return {
      value: Number(match[1]),
      units: match[2],
      displayName: match[3],
    }
  } catch (_) {
    return null
  }
}

export const readDeltaFiles = async (rootPath) => {
  try {
    const items = await pReadDir(rootPath)
    const metricFiles = items
      .map((fileName) => ({ fileName, metricMatch: fileName.match(/^\.delta\.(.+)$/) }))
      .filter(({ metricMatch }) => Boolean(metricMatch))
      .map(({ fileName, metricMatch }) => ({ fileName, metricName: metricMatch[1] }))
    const metrics = metricFiles.map(async ({ fileName, metricName }) => {
      const data = await readDeltaFile(fileName)

      if (!data) {
        return
      }

      return {
        ...data,
        name: metricName,
      }
    })
    const metricsData = await Promise.all(metrics)

    return metricsData.filter(Boolean)
  } catch (error) {
    core.debug(`Could not read delta files: ${error.message}`)

    return []
  }
}
