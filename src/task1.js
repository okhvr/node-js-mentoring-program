import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


rl.on('line', (line) => {
  console.log(line.split('').reverse().join(''));
});
