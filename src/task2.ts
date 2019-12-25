import csv from 'csvtojson';
import fs from 'fs';

const logger = fs.createWriteStream('log.txt', {
    flags: 'w', // Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
});
const csvFilePath = 'src/assets/node_mentoring_t1_2_input_example.csv';
const readableStream = fs.createReadStream(csvFilePath);
const onComplete: () => void = () => console.log('done!');

csv()
    .fromStream(readableStream)
    .subscribe(
        json => {
            logger.write(`${JSON.stringify(json)}\n`);
        },
        console.error,
        onComplete,
    );
