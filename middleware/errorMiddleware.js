const errorHandler = (err, req, res, next) => {
    // Si res.statusCode ya tiene un valor (por ejemplo, 404), se utiliza ese valor.
    // Si no, se usa 500 como valor predeterminado.
    const statusCode = res.statusCode ? res.statusCode : 500;

    // Establece el código de estado en la respuesta.
    res.status(statusCode);

    // Envía una respuesta JSON con el mensaje de error y, si no estamos en producción, la pila de errores.
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
};

export default errorHandler;
