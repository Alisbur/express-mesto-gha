class ValidationError extends Error {
  constructor(message = 'переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля') {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = ValidationError;
