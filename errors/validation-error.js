class ValidationError extends Error {
  constructor(message = 'Неправильные почта или пароль') {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = ValidationError;
