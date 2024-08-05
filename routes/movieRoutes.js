import express from 'express';
import { createMovie, getMovies, getUserMovies, updateMovie, deleteMovie, likeMovie } from '../controllers/movieController.js';
import protect from '../middleware/uathMiddleware.js';

const router = express.Router();

router.post('/', protect, createMovie);
router.get('/', protect, getUserMovies);
router.put('/:id', protect, updateMovie);
router.delete('/:id', protect, deleteMovie);
router.get('/all', protect, getMovies);
// Ruta para dar/retirar "me gusta" a una película
router.post('/:id/like', protect, likeMovie);

export default router;

