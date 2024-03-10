import express, {
  json,
  Request,
  Response,
  NextFunction,
} from 'express';
import mongoose from 'mongoose';
import Router from './routes';
import errorsController from './controllers/errors';
import fakeAuth from './middlewares/fakeAuth';
import NotFoundError from './errors/404-not-found-error';

const { PORT = 3000 } = process.env;
const uri = 'mongodb://127.0.0.1:27017/';

const app = express();

mongoose.connect(`${uri}mestodb`);

app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use(fakeAuth);

app.use('/', Router);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  const customError = new NotFoundError('Запрашиваемый ресурс не найден');
  return next(customError);
});

app.use(errorsController);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
