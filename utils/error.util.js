export default class BadRequestError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = 400;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
