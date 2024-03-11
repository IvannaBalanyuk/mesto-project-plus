import { Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import { MongoError } from 'mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { ICustomRequest } from '../utils/types';
import RequestStatuses from '../utils/constants';
import NotFoundError from '../errors/404-not-found-error';
import IncorrectDataError from '../errors/400-incorrect-data';
import EmailError from '../errors/409-email-error';

export const getUsers = (req: ICustomRequest, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.status(RequestStatuses.OK_SUCCESS).send({ data: users }))
    .catch(next);
};

export const getUserById = (req: ICustomRequest, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  return User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }

      res.status(RequestStatuses.OK_SUCCESS).send({ data: user });
    })
    .catch((err) => {
      if (err instanceof MongooseError.CastError) {
        const customError = new IncorrectDataError('Переданы некорректные данные при запросе информации о пользователе');
        return next(customError);
      }
      return next(err);
    });
};

export const createUser = (req: ICustomRequest, res: Response, next: NextFunction) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => {
      res.status(RequestStatuses.CREATED_SUCCESS).send({ data: user });
    })
    .catch((err) => {
      if (err instanceof MongooseError.ValidationError) {
        const customError = new IncorrectDataError('Переданы некорректные данные при запросе о регистрации пользователя');
        return next(customError);
      }

      return next(err);
    });
};

export const updateUser = (req: ICustomRequest, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const id = req.user && req.user._id;

  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }

      return res.status(RequestStatuses.OK_SUCCESS).send({ data: updatedUser });
    })
    .catch((err) => {
      if (err instanceof MongooseError.ValidationError) {
        const customError = new IncorrectDataError('Переданы некорректные данные при запросе на изменение информации о пользователе');
        return next(customError);
      }

      return next(err);
    });
};

export const updateUserAvatar = (req: ICustomRequest, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const id = req.user && req.user._id;

  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }

      return res.status(RequestStatuses.OK_SUCCESS).send({ data: updatedUser });
    })
    .catch((err) => {
      if (err instanceof MongooseError.ValidationError) {
        const customError = new IncorrectDataError('Переданы некорректные данные при запросе на изменение аватара пользователя');
        return next(customError);
      }

      return next(err);
    });
};

export const login = (req: ICustomRequest, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  User
    .findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Введен непральный пароль или email');
      }

      return bcrypt.compare(password, user.password)
        .then((matched: any) => {
          if (!matched) {
            throw new NotFoundError('Введен непральный пароль или email');
          }

          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .end();
    })
    .catch(next);
};
