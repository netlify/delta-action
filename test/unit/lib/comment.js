import test from 'ava'

import { createPullRequestComment } from '../../../src/lib/comment.js'

test('createPullRequestComment ignores missing metrics', (t) => {
  const baseSha = '0d22eac17bedb89df6db003fe0f19b5cdb4062cc'
  /* eslint-disable no-magic-numbers */
  const metrics = [
    { value: 33_254.267_163_666_664, units: 'ms', name: 'largeDepsNft' },
    { value: 50_735.233_039_666_666, units: 'ms', name: 'largeDepsZisi' },
  ]
  const previousMetrics = [
    {
      __commit: baseSha,
      largeDepsNft: 30_445.912_780_333_33,
      largeDepsZisi: 46_321.186_879_999_994,
    },
    {
      __commit: '846798a00e801a7e936fca4226f84900e67df587',
      largeDepsNft: 35_916.193_093_666_654,
    },
    {
      __commit: '433569875b474d701a748b41fc8146d626a2fef5',
      largeDepsNft: 39_139.893_285_333_33,
      largeDepsZisi: 57_660.846_667,
    },
  ]
  /* eslint-enable no-magic-numbers */

  t.snapshot(createPullRequestComment({ baseSha, metrics, previousMetrics, title: '', job: '' }))
})
