import { Response, NextFunction } from 'express';
import { ICustomRequest } from '../utils/types';

export default (req: ICustomRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '65eb3ebf0d60062f339378b7',
  };

  next();
};
