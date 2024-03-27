import { Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';
import { ICustomError, ICustomRequest } from '../utils/types';
import { RequestStatuses, ERROR_MESSAGES } from '../utils/constants';

const errorsController = (
  err: ICustomError,
  req: ICustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if (err && isCelebrateError(err)) {
    const statusCode = err.statusCode || RequestStatuses.BAD_REQUEST_ERROR;
    const defaultMessage = ERROR_MESSAGES[String(RequestStatuses.BAD_REQUEST_ERROR)];
    const errorMessage = err.details.get('body')?.message || '';

    res.status(statusCode).send({ message: `${defaultMessage}: ${errorMessage}` });
    next();
  } else {
    const statusCode = err.statusCode || RequestStatuses.INTERNAL_SERVER_ERROR;
    const defaultMessage = ERROR_MESSAGES[String(statusCode)]
      || ERROR_MESSAGES[String(RequestStatuses.INTERNAL_SERVER_ERROR)];
    const errorMessage = err.message || '';

    res.status(statusCode).send({ message: `${defaultMessage}: ${errorMessage}` });
    next();
  }
};

export default errorsController;
