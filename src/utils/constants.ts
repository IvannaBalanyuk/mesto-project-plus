export enum RequestStatuses {
  OK_SUCCESS = 200,
  CREATED_SUCCESS = 201,
  NOT_FOUND_ERROR = 404,
  BAD_REQUEST_ERROR = 400,
  INTERNAL_SERVER_ERROR = 500,
  AUTH_ERROR = 401,
  EMAIL_ERROR = 409,
}

// eslint-disable-next-line no-useless-escape
export const urlRegEx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

export const idRegEx = /^[0-9a-fA-F]{24}$/;
