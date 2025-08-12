const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const workdir = core.getInput('workdir') || '.';
    const autoApprove = (core.getInput('auto_approve') || 'false').toLowerCase() === 'true';
    const options = { cwd: workdir };
    const args = ['apply', '-input=false'];
    if (autoApprove) args.push('-auto-approve');
    try { await exec.exec('terraform', ['init', '-input=false'], options); } catch(e) { core.info('terraform init skipped'); }
    await exec.exec('terraform', args, options);
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();
