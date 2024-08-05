import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
        default: 'USER_ROLE',
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);

