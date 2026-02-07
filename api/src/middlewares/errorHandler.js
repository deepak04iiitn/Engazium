export const errorHandler = (statusCode , message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;

    return error;
}

export const globalErrorHandler = (err , req , res , next) => {

    if(!err) {
        err = new Error('Internal server error');
        err.statusCode = 500;
    }

    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal server error';

    if(err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = Object.values(err.errors).map((val) => val.message).join(', ');
    }

    if(err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        err.statusCode = 400;
        err.message = `${field} already exists`;
    }

    if(err.name === "JsonWebTokenError") {
        err.statusCode = 401;
        err.message = "Invalid token";
    }

    if(err.name === "TokenExpiredError") {
        err.statusCode = 401;
        err.message = "Token expired";
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}