import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { ICustomRequest } from '../utils/types';
import AuthError from '../errors/401-auth-error';
import { JWT_SECRET } from '../config';

let key = 'simple-secret-key';
if (JWT_SECRET) {
  key = JWT_SECRET;
}

export default (req: ICustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (req.method === 'OPTIONS') {
    next();
  }

  if (!token) {
    throw new AuthError('Ошибка авторизации');
  }

  let payload;

  try {
    payload = jwt.verify(token, key) as JwtPayload;
  } catch (err) {
    throw new AuthError('Ошибка авторизации');
  }

  req.user = {
    _id: payload._id,
  };

  next();
};
