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
import { PORT, DATABASE_URI } from './config';
import { urlRegEx } from './utils/constants';

const app = express();

app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

mongoose.connect(`${DATABASE_URI}mestodb`);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://mesto.domain.students.nomoredomainswork.ru');
  res.setHeader('Access-Control-Allow-Headers', [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Credentials',
    'Authorization',
    'Cookie',
  ]);
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().regex(urlRegEx).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/', Router);

app.use('*', (req: Request, res: Response, next: NextFunction) => next(new NotFoundError('Запрашиваемый ресурс не найден')));

app.use(errorLogger);
app.use(errorsController);
app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
