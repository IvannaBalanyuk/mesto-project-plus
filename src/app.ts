import express, {
  json,
  Request,
  Response,
  NextFunction,
} from 'express';
import mongoose from 'mongoose';
import { celebrate, Joi, errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import Router from './routes';
import errorsController from './middlewares/errors';
import { createUser, login } from './controllers/users';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';
import NotFoundError from './errors/404-not-found-error';
import { urlRegEx } from './utils/constants';

const { PORT = 3000 } = process.env;
const uri = 'mongodb://127.0.0.1:27017/';

const app = express();

app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

mongoose.connect(`${uri}mestodb`);

app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', Router);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  const customError = new NotFoundError('Запрашиваемый ресурс не найден');
  return next(customError);
});

app.use(errorLogger);
app.use(errors());
app.use(errorsController);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
