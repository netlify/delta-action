const process = require('process')

const core = require('@actions/core')

const getInputs = () => {
  const {
    DELTA_FILENAME: envInputFile,
    GITHUB_DEV_BASE_BRANCH: envBaseBranch,
    GITHUB_JOB: job,
    GITHUB_REF: ref,
    GITHUB_REPOSITORY: repository,
    GITHUB_SHA: commitSha,
    GITHUB_TOKEN: envToken,
    GITHUB_WORKSPACE: rootPath = process.cwd(),
  } = process.env
  const baseBranch = envBaseBranch || core.getInput('base_branch')
  const inputFile = envInputFile || core.getInput('filename')
  const title = core.getInput('title')
  const [owner, repo] = repository.split('/')
  const token = envToken || core.getInput('token')
  const [, , prNumber] = ref.split('/')

  return {
    baseBranch,
    commitSha,
    inputFile,
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

module.exports = { getInputs }
