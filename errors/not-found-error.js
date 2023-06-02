class NotFoundError extends Error {
  constructor(message = 'карточка или пользователь не найден') {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
