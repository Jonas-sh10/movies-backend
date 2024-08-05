import express from 'express';
import { register, login, data } from '../controllers/userController.js';
import protect from '../middleware/uathMiddleware.js';

const router = express.Router();

// endpoints publicos
router.post('/register', register);
router.post('/login', login);

// endpoints privados
router.get('/data', protect, data);

export default router;
