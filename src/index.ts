import express from 'express';
import { ExpressJoiError } from 'express-joi-validation';
import { UsersController } from './controllers';
import HttpStatus from 'http-status-codes';

const port = 3000;
const app = express();

app.use(express.json());
app.use('/users', UsersController);

app.get('/', (req, res) => {
    res.send('Server works!');
});

// Custom error handler
app.use((err: ExpressJoiError, req: express.Request, res: express.Response) => {
    if (err && err.error && err.error.isJoi) {
        res.status(HttpStatus.BAD_REQUEST).end(`You submitted a bad ${err.type} paramater.`);
    } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).end('internal server error');
    }
});

app.listen(port, err => {
    if (err) {
        console.log(`An eror occured: ${err.message}`);
        throw err;
    }
    console.log(`Server is listening on ${port}`);
});
