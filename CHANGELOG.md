# Changelog

## [4.1.0](https://github.com/netlify/delta-action/compare/v4.0.3...v4.1.0) (2022-11-24)


### Features

* make graphs optional ([#331](https://github.com/netlify/delta-action/issues/331)) ([38e4750](https://github.com/netlify/delta-action/commit/38e47500db147312c4e9bc24233afae6fcea1a66))


### Bug Fixes

* **deps:** update dependency @actions/core to v1.10.0 ([#323](https://github.com/netlify/delta-action/issues/323)) ([148539a](https://github.com/netlify/delta-action/commit/148539a3cf0aebdd69fbdbaa4f8af870e358c676))
* **deps:** update dependency @actions/core to v1.9.1 ([#315](https://github.com/netlify/delta-action/issues/315)) ([a4a093b](https://github.com/netlify/delta-action/commit/a4a093b7b0ad1b06760b11a791751838223cce36))
* **deps:** update dependency @actions/github to v5.1.1 ([#324](https://github.com/netlify/delta-action/issues/324)) ([31f8709](https://github.com/netlify/delta-action/commit/31f870981bbe8d4cafe487ab75070a9ec6fca94e))

## [4.0.3](https://github.com/netlify/delta-action/compare/v4.0.2...v4.0.3) (2022-07-11)


### Bug Fixes

* support custom PR numbers for workflow_run ([#308](https://github.com/netlify/delta-action/issues/308)) ([213d85b](https://github.com/netlify/delta-action/commit/213d85b01c9d810d66bd87214409ba870a715f26))

## [4.0.2](https://github.com/netlify/delta-action/compare/v4.0.1...v4.0.2) (2022-07-08)


### Bug Fixes

* read eventName from correct payload ([#304](https://github.com/netlify/delta-action/issues/304)) ([1d4d398](https://github.com/netlify/delta-action/commit/1d4d39837147c6921105f75fa63f9c1efdd392f0))

## [4.0.1](https://github.com/netlify/delta-action/compare/v4.0.0...v4.0.1) (2022-07-07)


### Bug Fixes

* detect pull-requests correctly ([#302](https://github.com/netlify/delta-action/issues/302)) ([7edd063](https://github.com/netlify/delta-action/commit/7edd063f7b29991ea0fccb93c165ebfe7d44d450))

## [4.0.0](https://github.com/netlify/delta-action/compare/v3.0.2...v4.0.0) (2022-07-07)


### ⚠ BREAKING CHANGES

* The runner now uses node 16

### Features

* support workflow_run event and use node 16 ([#300](https://github.com/netlify/delta-action/issues/300)) ([5f20f0c](https://github.com/netlify/delta-action/commit/5f20f0c7486ade3a35f5b302e93ba02b1b2ce381))


### Bug Fixes

* **deps:** update dependency @actions/core to v1.9.0 ([#295](https://github.com/netlify/delta-action/issues/295)) ([55e940b](https://github.com/netlify/delta-action/commit/55e940b31ab9b903a9d32cd334511b9bab151856))
* **deps:** update dependency pretty-ms to v8 ([#293](https://github.com/netlify/delta-action/issues/293)) ([8007bf5](https://github.com/netlify/delta-action/commit/8007bf59f3c29ab8cb328854191ae07900db35b9))
* order of commits in PR comment ([#301](https://github.com/netlify/delta-action/issues/301)) ([d2210d2](https://github.com/netlify/delta-action/commit/d2210d2497c2a240b38aa2ae51585883d390309b))

## [3.0.2](https://github.com/netlify/delta-action/compare/v3.0.1...v3.0.2) (2022-06-02)


### Bug Fixes

* correctly draw missing metrics from previous commits ([#290](https://github.com/netlify/delta-action/issues/290)) ([305594b](https://github.com/netlify/delta-action/commit/305594ba187ccb9ea224f6cad99df2ca7f9a3992))
* **deps:** update dependency @actions/core to v1.7.0 ([#280](https://github.com/netlify/delta-action/issues/280)) ([5b22d94](https://github.com/netlify/delta-action/commit/5b22d94da0ea94c30fe3b65ed1457fa7e2df6677))
* **deps:** update dependency @actions/core to v1.8.0 ([#282](https://github.com/netlify/delta-action/issues/282)) ([52943b1](https://github.com/netlify/delta-action/commit/52943b1287871c272b8ce4be985d66dd39f2e757))
* **deps:** update dependency @actions/core to v1.8.2 ([#287](https://github.com/netlify/delta-action/issues/287)) ([9230ecf](https://github.com/netlify/delta-action/commit/9230ecfb310a7c0b0d8f3bd845f5f54e3e6218f0))
* **deps:** update dependency @actions/github to v5.0.3 ([#288](https://github.com/netlify/delta-action/issues/288)) ([9023f48](https://github.com/netlify/delta-action/commit/9023f482c816a05b2e6f21b4136680d1b86a04ba))

### [3.0.1](https://github.com/netlify/delta-action/compare/v3.0.0...v3.0.1) (2022-03-07)


### Bug Fixes

* output ESM ([#266](https://github.com/netlify/delta-action/issues/266)) ([77b4183](https://github.com/netlify/delta-action/commit/77b41839f7eb8486282ba762bf4f0a1bd801e39e))

## [3.0.0](https://www.github.com/netlify/delta-action/compare/v2.0.0...v3.0.0) (2021-12-09)


### ⚠ BREAKING CHANGES

* use pure ES modules (#177)

### Miscellaneous Chores

* use pure ES modules ([#177](https://www.github.com/netlify/delta-action/issues/177)) ([2ead9e6](https://www.github.com/netlify/delta-action/commit/2ead9e68a08ad380c06c82754fd86ff12c5d41a7))

## [2.0.0](https://www.github.com/netlify/delta-action/compare/v1.3.0...v2.0.0) (2021-11-25)


### ⚠ BREAKING CHANGES

* drop support for Node 8 and 10 (#159)

### Bug Fixes

* **deps:** update dependency @actions/core to v1.6.0 ([#145](https://www.github.com/netlify/delta-action/issues/145)) ([44e422a](https://www.github.com/netlify/delta-action/commit/44e422a27d3f9319ac2b04e326147da9fd189626))


### Miscellaneous Chores

* drop support for Node 8 and 10 ([#159](https://www.github.com/netlify/delta-action/issues/159)) ([5cb7e98](https://www.github.com/netlify/delta-action/commit/5cb7e981de742c1338679b8ba4bd384df25dbc77))

## [1.3.0](https://www.github.com/netlify/delta-action/compare/v1.2.4...v1.3.0) (2021-06-27)


### Features

* draw mean in graph ([#86](https://www.github.com/netlify/delta-action/issues/86)) ([5209da8](https://www.github.com/netlify/delta-action/commit/5209da859cd9d795920b591885555e88cc22bf0b))

### [1.2.4](https://www.github.com/netlify/delta-action/compare/v1.2.3...v1.2.4) (2021-06-22)


### Bug Fixes

* account for missing metrics in the base branch ([#80](https://www.github.com/netlify/delta-action/issues/80)) ([54a4530](https://www.github.com/netlify/delta-action/commit/54a45304746b67afe54e429011eda5a64823aa4b))

### [1.2.3](https://www.github.com/netlify/delta-action/compare/v1.2.2...v1.2.3) (2021-05-31)


### Bug Fixes

* show most recent items in graph ([#66](https://www.github.com/netlify/delta-action/issues/66)) ([233b983](https://www.github.com/netlify/delta-action/commit/233b9830c97fbe43f5eae0e519093a2f8ba2cd2d))

### [1.2.2](https://www.github.com/netlify/delta-action/compare/v1.2.1...v1.2.2) (2021-05-31)


### Bug Fixes

* reduce max graph items ([#64](https://www.github.com/netlify/delta-action/issues/64)) ([8b11ffa](https://www.github.com/netlify/delta-action/commit/8b11ffa14b67766d64a337264846148bcb3fd356))

### [1.2.1](https://www.github.com/netlify/delta-action/compare/v1.2.0...v1.2.1) (2021-05-30)


### Bug Fixes

* improve graph rendering ([#58](https://www.github.com/netlify/delta-action/issues/58)) ([77c1a67](https://www.github.com/netlify/delta-action/commit/77c1a6747d9d9db5694b206fcf80f5004a9ded7c))

## [1.2.0](https://www.github.com/netlify/delta-action/compare/v1.1.0...v1.2.0) (2021-05-30)


### Features

* add graph for historical data ([#54](https://www.github.com/netlify/delta-action/issues/54)) ([ff1ba70](https://www.github.com/netlify/delta-action/commit/ff1ba70b51984c1e46e6341589b6a6f18a825ad2))
* add graph for historical data ([#57](https://www.github.com/netlify/delta-action/issues/57)) ([d477357](https://www.github.com/netlify/delta-action/commit/d4773571d884d6aa70aa09322dbaea5ed2dd91c8))

## [1.1.0](https://www.github.com/netlify/delta-action/compare/v1.0.4...v1.1.0) (2021-05-27)


### Features

* add historic data to metadata comments ([#52](https://www.github.com/netlify/delta-action/issues/52)) ([24ab1e6](https://www.github.com/netlify/delta-action/commit/24ab1e6953362abcd3fe59d44d1807942415c61d))

### [1.0.4](https://www.github.com/netlify/delta-action/compare/v1.0.3...v1.0.4) (2021-05-24)


### Bug Fixes

* **deps:** update dependency @actions/core to v1.3.0 ([#48](https://www.github.com/netlify/delta-action/issues/48)) ([d7cd7b3](https://www.github.com/netlify/delta-action/commit/d7cd7b3899900fae77d7af7cae49d19ff4d9efef))

### [1.0.3](https://www.github.com/netlify/delta-action/compare/v1.0.2...v1.0.3) (2021-05-19)


### Bug Fixes

* **deps:** update dependency @actions/github to v5 ([#39](https://www.github.com/netlify/delta-action/issues/39)) ([e941254](https://www.github.com/netlify/delta-action/commit/e94125470d497623109de7aa2a70d3e6e245a4cd))

### [1.0.2](https://www.github.com/netlify/delta-action/compare/v1.0.1...v1.0.2) (2021-04-20)


### Bug Fixes

* use correct format in comment metadata ([#18](https://www.github.com/netlify/delta-action/issues/18)) ([badb5f6](https://www.github.com/netlify/delta-action/commit/badb5f6f531a9681e14c46d8a06ec68eb41b23bf))

### [1.0.1](https://www.github.com/netlify/delta-action/compare/v1.0.0...v1.0.1) (2021-04-19)


### Bug Fixes

* **deps:** update dependency pretty-ms to v7 ([#9](https://www.github.com/netlify/delta-action/issues/9)) ([3045e10](https://www.github.com/netlify/delta-action/commit/3045e106c469ac7a5dba130511c4baac8ba1877a))
