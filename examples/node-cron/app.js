const { CronJob } = require('cron');

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

function main() {
  function log() {
    console.log(Date.now());
  }

  const cronTime = '* * * * * *';
  schedule(cronTime, fn);
}
