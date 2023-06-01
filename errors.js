const VALIDATION_ERROR_CODE = 400;
const VALIDATION_ERROR_MESSAGE = { message: 'переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля' };
const AUTH_ERROR_CODE = 401;
const AUTH_ERROR_MESSAGE = { message: 'необходима авторизация' };
const NOT_FOUND_ERROR_CODE = 404;
const NOT_FOUND_ERROR_MESSAGE = { message: 'карточка или пользователь не найден' };
const DEFAULT_ERROR_CODE = 500;
const DEFAULT_ERROR_MESSAGE = { message: 'ошибка по-умолчанию' };

module.exports = {
  VALIDATION_ERROR_CODE,
  VALIDATION_ERROR_MESSAGE,
  AUTH_ERROR_CODE,
  AUTH_ERROR_MESSAGE,
  NOT_FOUND_ERROR_CODE,
  NOT_FOUND_ERROR_MESSAGE,
  DEFAULT_ERROR_CODE,
  DEFAULT_ERROR_MESSAGE,
};
