# Delta Action

A GitHub Action for capturing benchmark data and comparing them against a baseline.

## The basics

This action doesn't actually run any benchmarks for you. It simply reads them from a file, which you need to create
yourself using your benchmarking tool of choice, and prints the results in GitHub comments. It also automatically
compares the metrics against a baseline, giving you information about the variation of the results.

The format of this file is a JSON string containing an object with a `metrics` key. Each key in that object will be a
metric captured and compared by the action, with the values being a duration in milliseconds.

_Example input file:_

```json
{
  "metrics": {
    "mytask1": 10,
    "mytask2": 20,
    "mytask3": 30
  }
}
```

## Configuration

The action supports the following inputs:

| Name          | Description                              | Default              |
| ------------- | ---------------------------------------- | -------------------- |
| `base_branch` | Name of the base branch                  | `main`               |
| `filename`    | Name of the input file                   | `.delta-action.json` |
| `title`       | Title/heading to include in the comments | Delta results        |
| `token`       | GitHub access token                      |                      |

## Usage

1. Add a benchmark step to your workflow that creates a `.delta-action.json` file with the format described above

```yaml
- name: Run benchmark
  run: node some-benchmark-script.js > .delta-action.json
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
