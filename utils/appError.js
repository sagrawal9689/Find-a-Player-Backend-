class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    // this.message
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError
