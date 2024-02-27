const core = require('@actions/core');
const github = require('@actions/github');
const prettier = require('prettier');

async function run() {
  try {
    const prNumber = github.context.payload.pull_request.number;
    const token = core.getInput('github-token');
    const octokit = github.getOctokit(token);
    
    // Get the files modified in the pull request
    const files = await octokit.pulls.listFiles({
      ...github.context.repo,
      pull_number: prNumber
    });

    const filesWithFormattingErrors = [];
    files.data.forEach(file => {
      const content = file.data.content;
      try {
        prettier.check(content, { filepath: file.data.filename });
      } catch (error) {
        filesWithFormattingErrors.push(file.data.filename);
      }
    });

    if (filesWithFormattingErrors.length > 0) {
      const errorList = filesWithFormattingErrors.join(', ');
      const errorMessage = `The following files have formatting errors: ${errorList}`;
      core.setFailed(errorMessage);
    } else {
      console.log('Code formatting check passed.');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
