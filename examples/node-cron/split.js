const path = require('path');
const fse = require('fs-extra');
const { CronJob } = require('cron');

const { accessLogPath } = require('./config/index');
const { genYesterdayLogFileName, formatNow } = require('./utils');
const { DEST_DIR_NAME } = require('./config/const');

const accessLogPath = fse.readdirSync(accessLogPath);

function schedule(cronTime, onTick) {
  if (!cronTime) return;

  if (typeof onTick !== 'function') return;

  const c = new CronJob(
    cronTime,
    onTick,
    null,
    true,
    'Asia/Shanghai' // zone, important!
  );

  process.on('exit', () => c.stop());
}

function splitLogFile() {
  const accessLogFile = path.join(accessLogPath, 'access.log');

  const destDir = path.join(accessLogPath, DEST_DIR_NAME);
  fse.ensureDirSync(destDir);
  const destFile = path.join(destDir, genYesterdayLogFileName());
  fse.ensureFileSync(destFile);
  fse.outputFileSync(destFile, ''); // prevent replicate, clean up first

  // copy
  fse.copySync(accessLogFile, destFile);

  // clean up
  fse.outputFileSync(accessLogFile, '');
}

function splitLogFileTimed() {
  const cronTime = '0 0 0 * * *'; // 0:00:00 of per day

  schedule(cronTime, splitLogFile);
}

module.exports = {
  splitLogFileTimed,
};
