import core from '@actions/core'
import github from '@actions/github'

import {
  createHeadBranchComment,
  createPullRequestComment,
  findDeltaComment,
  getMetricsComment,
} from './lib/comment.js'
import { readDeltaFiles } from './lib/delta_file.js'
import { getCommentsFromMainBranch } from './lib/github.js'
import { getInputs } from './lib/inputs.js'

const processHeadBranch = async ({ commitSha, headMetrics, job, octokit, owner, repo, title }) => {
  const previousCommit = await getCommentsFromMainBranch({ commitIndex: 1, octokit, owner, repo })
  const comment = createHeadBranchComment({ commitSha, job, metrics: headMetrics, previousCommit, title })

  await octokit.rest.repos.createCommitComment({
    owner,
    repo,
    commit_sha: commitSha,
    body: comment,
  })
}

const processPullRequest = async ({ headMetrics, job, octokit, owner, prNumber, repo, title }) => {
  const { baseSha, comments } = await getCommentsFromMainBranch({ octokit, owner, repo })
  const baseMetrics = getMetricsComment({ comments, job })

  core.debug(`Base metrics: ${JSON.stringify(baseMetrics)}`)

  const comment = createPullRequestComment({
    baseSha,
    job,
    metrics: headMetrics,
    previousMetrics: baseMetrics,
    title,
  })
  const existingComments = await octokit.paginate(octokit.rest.issues.listComments, {
    owner,
    repo,
    issue_number: prNumber,
  })
  const existingDeltaComment = existingComments.find((existingComment) => findDeltaComment(existingComment.body, job))

  if (existingDeltaComment) {
    core.debug(`Updating existing delta comment: ${existingDeltaComment.url}`)

    await octokit.rest.issues.updateComment({
      owner,
      repo,
      comment_id: existingDeltaComment.id,
      body: comment,
    })
  } else {
    core.debug('Creating new delta comment')

    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: prNumber,
      body: comment,
    })
  }
}

const run = async function () {
  const { baseBranch, commitSha, job, owner, prNumber, ref, repo, rootPath, title, token } = getInputs()
  const headMetrics = await readDeltaFiles(rootPath)

  core.debug(`Running job ${job} on ref ${ref}`)

  if (headMetrics.length === 0) {
    core.debug(`No metrics found`)

    return
  }

  core.debug(`Found metrics: ${JSON.stringify(headMetrics)}`)

  const octokit = github.getOctokit(token)
  const isPR = Boolean(prNumber)

  if (!isPR && ref === `refs/heads/${baseBranch}`) {
    core.debug(`This run is related to the ${baseBranch} branch`)

    await processHeadBranch({ commitSha, headMetrics, job, octokit, owner, repo, title })
  } else if (isPR) {
    core.debug(`This run is related to PR #${prNumber}`)

    await processPullRequest({ headMetrics, job, octokit, owner, prNumber, repo, title })
  } else {
    core.debug(`This run is not related to a PR or the default branch`)
  }
}

try {
  run()
} catch (error) {
  core.debug(`Error: ${JSON.stringify(error)}`)
  core.setFailed(error.message)
}
