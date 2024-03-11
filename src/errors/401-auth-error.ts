import { RequestStatuses } from '../utils/constants';

export default class AuthError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = RequestStatuses.AUTH_ERROR;
  }
}
