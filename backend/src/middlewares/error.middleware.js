const errorMiddleware = (err, req, res, next) => {
    console.log("Middleware Error :", err.message);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || []
    })
};

export default errorMiddleware;