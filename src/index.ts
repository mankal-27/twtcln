import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes'
import tweetRoutes from './routes/tweetRoute'

const app = express();

app.use(express.json());
app.use('/user',userRoutes)
app.use('/tweet', tweetRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is listening at Port: 3000');
});
