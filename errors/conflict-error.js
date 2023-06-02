class ConflictError extends Error {
  constructor(message = 'адрес электронной почты уже используется') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
