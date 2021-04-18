# Delta Action

A GitHub Action for reporting benchmark data and comparing it against a baseline.

<img width="750" alt="Screenshot of a benchmark report comment" src="https://user-images.githubusercontent.com/4162329/115129623-8acac500-9fdf-11eb-9bfc-822a415cb436.png">

## The basics

This action reads benchmark metrics on GitHub pull requests and commits, and reports them by adding a comment with any metrics found. It also compares then against the latest commit on the main branch, treating it as the baseline.

The action looks for benchmark data in files on the repository root. These should be named in the format `.delta.<metric name>` — e.g. `.delta.install_time` will create a metric called `install_time`.

These files should contain:

- A number representing the value of the metric
- The units of the metric (optional)
- A human-friendly name of the metric (optional)

_Example: `.delta.install_time`_
```
350ms (Installation time)
```

The units will determine how the values will be formatted in the benchmark reports. Supported units are:

- Time (formatted with [`pretty-ms`](https://www.npmjs.com/package/pretty-ms))
  - `ms` / `milliseconds`
  - `s` / `seconds`
- Storage (formatted with [`pretty-bytes`](https://www.npmjs.com/package/pretty-bytes))
  - `b` / `bytes`
  - `kb` / `kilobytes`
- Unitless (formatted with [`Number.prototype.toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString))

## Configuration

The action supports the following inputs:

| Name          | Description                              | Default              |
| ------------- | ---------------------------------------- | -------------------- |
| `base_branch` | Name of the base branch                  | `main`               |
| `title`       | Title/heading to include in the comments | Delta results        |
| `token`       | GitHub access token                      |                      |

## Usage

1. Add a benchmark step to your workflow that creates a `.delta.<metric>` file with the format described above

```yaml
- name: Run benchmark
  run: echo 123ms > .delta.install_time
```

2. Add the action to the workflow

   ```yaml
   - name: Delta
     uses: netlify/delta-action@main
     with:
       token: ${{ secrets.GITHUB_TOKEN }}
   ```

## Contributors

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for instructions on how to set up and work on this repository. Thanks
for contributing!
