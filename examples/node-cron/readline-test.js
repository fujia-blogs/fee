const fs = require('fs');
const path = require('path');
const readline = require('readline');

const main = () => {
  let num = 0;
  const logFile = path.resolve(__dirname, 'data.txt');
  const readStream = fs.createReadStream(logFile);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on('line', (line) => {
    console.log('line -> ', line);
    num++;
  });

  rl.on('close', () => {
    console.log('num: ', num);
  });
};

main();
