import RequestStatuses from '../utils/constants';

export default class IncorrectDataError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = RequestStatuses.BAD_REQUEST_ERROR;
  }
}
