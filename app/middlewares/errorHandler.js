export const errorHandler = (err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json(
        err.status === 500
            ? { message: "ERROR 500" }
            : {
                status: err.status,
                success: false,
                message: err.message || "Error interno del servidor",
            }
    );
};