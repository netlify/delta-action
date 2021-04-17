const core = require('@actions/core')
const github = require('@actions/github')

const { createComment, findDeltaComment, getMetricsComment } = require('./lib/comment')
const { readDeltaFiles } = require('./lib/delta_file')
const { getCommentsFromMainBranch } = require('./lib/github')
const { getInputs } = require('./lib/inputs')

const processHeadBranch = async ({ commitSha, headMetrics, job, octokit, owner, repo, title }) => {
  const comment = createComment({ job, metrics: headMetrics, title })

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

  const comment = createComment({
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
  const { metrics: headMetrics = [] } = await readDeltaFiles(rootPath)
  const isHeadBranch = ref === `refs/heads/${baseBranch}`

  core.debug(`Running job ${job} on ref ${ref}`)

  if (headMetrics.length === 0) {
    core.debug(`No metrics found`)

    return
  }

  core.debug(`Found metrics: ${JSON.stringify(headMetrics)}`)

  const octokit = github.getOctokit(token)

  if (isHeadBranch) {
    await processHeadBranch({ commitSha, headMetrics, job, octokit, owner, repo, title })

    return
  }

  await processPullRequest({ headMetrics, job, octokit, owner, prNumber, repo, title })
}

try {
  run()
} catch (error) {
  core.debug(`Error: ${JSON.stringify(error)}`)
  core.setFailed(error.message)
}
