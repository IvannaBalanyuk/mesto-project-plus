import { RequestStatuses } from '../utils/constants';

export default class EmailError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = RequestStatuses.EMAIL_ERROR;
  }
}
