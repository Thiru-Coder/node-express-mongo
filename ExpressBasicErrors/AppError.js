/**
 * AppError class that extends the Error class for custom error handling.
 * @class
 * @extends Error
 * @param {string} message - Error message.
 * @param {number} status - HTTP status code.
 */
class AppError extends Error {
  constructor(message, status) {
    super();
    /**
     * Error message.
     * @type {string}
     */
    this.message = message;
    /**
     * HTTP status code.
     * @type {number}
     */
    this.status = status;
  }
}

module.exports = AppError;
