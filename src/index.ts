import express from 'express';
import UsersRoutes from './router/users';
import { ExpressJoiError } from 'express-joi-validation';

const port = 3000;
const app = express();

app.use(express.json());
app.use('/users', UsersRoutes);

app.get('/', (req, res) => {
    res.send('Server works!');
});

// Custom error handler
app.use((err: ExpressJoiError, req: express.Request, res: express.Response) => {
    if (err && err.error && err.error.isJoi) {
        const e: ExpressJoiError = err;
        // e.g "you submitted a bad query"
        res.status(400).end(`You submitted a bad ${e.type} paramater.`);
    } else {
        res.status(500).end('internal server error');
    }
});

app.listen(port, err => {
    if (err) {
        throw err;
    }
    console.log(`Server is listening on ${port}`);
});