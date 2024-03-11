import { Response, NextFunction } from 'express';
import { ICustomError, ICustomRequest } from '../utils/types';
import { RequestStatuses } from '../utils/constants';

const errorsController = (
  err: ICustomError,
  req: ICustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode = RequestStatuses.INTERNAL_SERVER_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === RequestStatuses.INTERNAL_SERVER_ERROR
        ? 'Ошибка по умолчанию'
        : message,
    });
};

export default errorsController;
