import asyncHandler from "express-async-handler";
import Movie from "../model/movieModel.js";

// Obtener películas del usuario
const getUserMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find({ user: req.user._id }); // Cambia `req.user.id` a `req.user._id` para mantener consistencia
    res.status(200).json(movies);
});

// Obtener todas las películas
const getMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find({});
    res.status(200).json(movies);
});

// Crear una nueva película
const createMovie = asyncHandler(async (req, res) => {
    const { title, overview, release_date, poster_path, vote_average, vote_count, popularity, genre_ids } = req.body;

    if (!title || !overview || !release_date || !poster_path || !vote_average || !vote_count || !popularity || !genre_ids) {
        res.status(400);
        throw new Error('Please provide all required fields to create a movie');
    }

    if (!Array.isArray(genre_ids) || genre_ids.length === 0) {
        res.status(400);
        throw new Error('Genre IDs cannot be an empty array');
    }

    try {
        const movie = await Movie.create({
            ...req.body,
            user: req.user._id // Cambia `req.user.id` a `req.user._id`
        });
        res.status(201).json(movie);
    } catch (error) {
        res.status(400);
        throw new Error('Error creating movie - Duplicate title');
    }
});

// Actualizar una película
const updateMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(404);
        throw new Error('Movie not found');
    }

    if (movie.user.toString() !== req.user._id.toString()) { // Cambia `req.user.id` a `req.user._id`
        res.status(401);
        throw new Error('Not authorized');
    }

    const movieUpdated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(movieUpdated);
});

// Eliminar una película
const deleteMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(404);
        throw new Error('Movie not found');
    }

    if (movie.user.toString() !== req.user._id.toString()) { // Cambia `req.user.id` a `req.user._id`
        res.status(401);
        throw new Error('Not authorized');
    }

    await movie.deleteOne();
    res.status(200).json({ id: req.params.id });
});

// Dar o retirar "me gusta" a una película
const likeMovie = asyncHandler(async (req, res) => {
    const userId = req.user._id; // Cambia `req.user.id` a `req.user._id`
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(404);
        throw new Error('Movie not found');
    }

    // Es una variable booleana que indica si el usuario ya dio "me gusta" o no
    const hasLiked = movie.likes.includes(userId);

    if (hasLiked) {
        // Usuario ya dio "me gusta", así que lo eliminamos
        movie.likes = movie.likes.filter(id => !id.equals(userId));
    } else {
        // Usuario no dio "me gusta", así que lo agregamos
        movie.likes.push(userId);
    }

    await movie.save();
    res.status(200).json({ movieId: req.params.id, userId });
});

export {
    getUserMovies,
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie,
    likeMovie
};
