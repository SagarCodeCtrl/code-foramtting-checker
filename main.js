const { exec } = require('child_process');
const core = require('@actions/core');

try {
  // Get input for ignored files and folders
  const ignoreFiles = core.getInput('ignore-files');
  const ignoreFolders = core.getInput('ignore-folders');

  // Construct codespell command with ignore files and folders options
  const command = `codespell --check-filenames --ignore-words-list="myword,anotherword" --skip=${ignoreFiles} --ignore=${ignoreFolders} .`;

  // Run codespell command
  exec(command, (error, stdout, stderr) => {
    if (error) {
      core.setFailed(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      core.warning(`Warning: ${stderr}`);
    }
    console.log(stdout);
    core.setOutput('spellcheck-result', stdout);
  });
} catch (error) {
  core.setFailed(error.message);
}
