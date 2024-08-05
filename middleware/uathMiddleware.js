import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Verificar si el encabezado Authorization está presente y comienza con 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener token del encabezado
            // Parte en 2 el encabezado Authorization [0] Bearer - [1] token
            token = req.headers.authorization.split(' ')[1];

            // verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Obtener el usuario que corresponde al token
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Acceso no autorizado, token no válido');
        }
    } else {
        // Si no hay encabezado Authorization o no comienza con 'Bearer'
        res.status(401);
        throw new Error('Acceso no autorizado, no se proporciono un token');
    }
});

export default protect;
