/**
 * Custom error class for handling application-specific errors.
 * @class
 * @extends Error
 */
class AppError extends Error {
  /**
   * Create a new AppError instance.
   * @constructor
   * @param {string} message - The error message.
   * @param {number} status - The HTTP status code associated with the error.
   */
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

module.exports = AppError;
