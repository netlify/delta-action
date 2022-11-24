import process from 'process'

import core from '@actions/core'
import { context } from '@actions/github'

const getPrNumber = () => {
  const { eventName, payload } = context

  if (eventName === 'pull_request') {
    return payload.number
  }

  const prNumberInput = Number.parseInt(core.getInput('pr_number'))
  if (Number.isInteger(prNumberInput)) {
    return prNumberInput
  }
}

export const getInputs = () => {
  const {
    GITHUB_DEV_BASE_BRANCH: envBaseBranch,
    GITHUB_REPOSITORY: repository,
    GITHUB_WORKSPACE: rootPath = process.cwd(),
  } = process.env
  const { job, ref, sha: commitSha } = context
  const baseBranch = envBaseBranch || core.getInput('base_branch')
  const title = core.getInput('title', { required: true })
  const style = core.getInput('style', { required: false }) || 'graph'
  const [owner, repo] = repository.split('/')
  const token = core.getInput('token', { required: true })
  const prNumber = getPrNumber()

  return {
    baseBranch,
    commitSha,
    job,
    owner,
    prNumber,
    ref,
    repo,
    rootPath,
    title,
    style,
    token,
  }
}
