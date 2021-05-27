const getBranchNameFromRef = (ref) => {
  const match = ref.match(/^refs\/heads\/(.*)$/)

  if (match) {
    return match[1]
  }
}

const getCommentsFromMainBranch = async ({ commitIndex = 0, octokit, owner, repo }) => {
  const { data: commits } = await octokit.rest.repos.listCommits({
    owner,
    repo,
  })
  const baseSha = commits[commitIndex].sha
  const { data: comments } = await octokit.rest.repos.listCommentsForCommit({
    owner,
    repo,
    commit_sha: baseSha,
  })

  return { baseSha, comments }
}

module.exports = { getBranchNameFromRef, getCommentsFromMainBranch }
