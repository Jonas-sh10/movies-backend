import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        unique: true
    },
    overview: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    release_date: {
        type: Date,
        required: [true, 'La fecha de estreno es obligatoria']
    },
    poster_path: {
        type: String,
        default: null
    },
    vote_average: {
        type: Number,
        required: [true, 'La calificación es obligatoria']
    },
    vote_count: {
        type: Number,
        required: [true, 'La cantidad de votos es obligatoria']
    },
    popularity: {
        type: Number,
        required: [true, 'La popularidad es obligatoria']
    },
    genre_ids: {
        type: [Number],
        required: [true, 'Los géneros son obligatorios']
    },
    trailer_url: {
        type: String,
        default: null
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
