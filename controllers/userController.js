import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';

const register = asyncHandler( async (req,res) => {
    const { nombre, email, password } = req.body;

    if(!nombre || !email || !password) {
        res.status(400);
        throw new Error('Por favor, rellena todos los campos');
    }

    // Verificar que el usuario no exista
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('El usuario ya existe');
    } else {

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Crear el usuario
        const user = await User.create({
            nombre,
            email,
            password: hashPassword
        });

        // Si el usuario se ha creado con exito
        if (user) {
            res.status(201).json({
                _id: user.id,
                nombre: user.nombre,
                email: user.email
            });
        } else {
            res.status(400);
            throw new Error('No se pudo crear el usuario');
        }
    }
});

const login = asyncHandler( async (req,res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Por favor, rellena todos los campos');
    }

    //Verificar que el usuario exista en la base de datos
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            nombre: user.nombre,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Credenciales incorrectas');
    }

    res.status(200).json({ message: 'Login' });

});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const data = (req, res) => {
    res.status(200).json(req.user);
}

export { 
    register,
    login,
    data
};
