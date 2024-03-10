import { Request } from 'express';
import jwt from 'jsonwebtoken';

export interface ICustomRequest extends Request {
  user?: {
    _id: string | jwt.JwtPayload;
  };
}

export interface ICustomError extends Error {
  statusCode: number;
}
