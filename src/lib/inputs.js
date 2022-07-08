import process from 'process'

import core from '@actions/core'
import { context } from '@actions/github'

const getPrNumber = () => {
  const { eventName, payload } = context

  if (eventName === 'pull_request') {
    return payload.number
  }

  if (
    eventName === 'workflow_run' &&
    payload?.workflow_run?.event === 'pull_request' &&
    payload?.workflow_run?.pull_requests?.length === 1
  ) {
    return payload.workflow_run.pull_requests[0].number
  }
}

export const getInputs = () => {
  const {
    GITHUB_DEV_BASE_BRANCH: envBaseBranch,
    GITHUB_REPOSITORY: repository,
    GITHUB_TOKEN: envToken,
    GITHUB_WORKSPACE: rootPath = process.cwd(),
  } = process.env
  const { job, ref, sha: commitSha } = context
  const baseBranch = envBaseBranch || core.getInput('base_branch')
  const title = core.getInput('title')
  const [owner, repo] = repository.split('/')
  const token = envToken || core.getInput('token')
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
    token,
  }
}
