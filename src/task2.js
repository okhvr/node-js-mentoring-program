const csv = require('csvtojson');
const fs = require("fs");

const logger = fs.createWriteStream('log.txt', {
    flags: 'w' // Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
  });
const csvFilePath='src/assets/node_mentoring_t1_2_input_example.csv';
const readableStream = fs.createReadStream(csvFilePath);
const onComplete = () => console.log('done!');

csv()
.fromStream(readableStream)
.subscribe((json)=>{
    logger.write(`${JSON.stringify(json)}\n`);
}, console.error, onComplete);