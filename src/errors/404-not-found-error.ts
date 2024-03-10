import RequestStatuses from '../utils/constants';

export default class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = RequestStatuses.NOT_FOUND_ERROR;
  }
}
