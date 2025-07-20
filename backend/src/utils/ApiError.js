class ApiError extends Error {
    constructor(
        statusCode = 500,
        message = "Something went wrong",
        errors = [],
        stack
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.errors = Array.isArray(errors) ? errors : [errors];
        this.success = false;

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default ApiError;