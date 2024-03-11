import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { ICustomRequest } from '../utils/types';
import AuthError from '../errors/401-auth-error';

export default (req: ICustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AuthError('Ошибка авторизации');
  }

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key') as JwtPayload;
  } catch (err) {
    throw new AuthError('Ошибка авторизации');
  }

  req.user = {
    _id: payload._id,
  };

  next();
};
