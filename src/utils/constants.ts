/* eslint-disable quote-props */
export enum RequestStatuses {
  OK_SUCCESS = 200,
  CREATED_SUCCESS = 201,
  BAD_REQUEST_ERROR = 400,
  AUTH_ERROR = 401,
  NOT_FOUND_ERROR = 404,
  EMAIL_ERROR = 409,
  INTERNAL_SERVER_ERROR = 500,
}

type TErrorMessages<T extends string> = {
  [key in T]: string;
}

export const ERROR_MESSAGES: TErrorMessages<string> = {
  '200': 'Запрос выполнен успешно',
  '201': 'Создание прошло успешно',
  '400': 'Некорректный запрос',
  '401': 'Ошибка авторизации',
  '404': 'Ресурс не найден',
  '409': 'Конфликт запроса с текущим состоянием сервера',
  '500': 'На сервере произошла ошибка',
};

// eslint-disable-next-line no-useless-escape
export const urlRegEx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
