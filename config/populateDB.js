import Movie from "../model/movieModel.js";

const API_KEY = 'c2525d0edb9b982c034d6f755a582ad4';
const URL_API = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

const populateDatabase = async () => {
    try {
        const response = await fetch(URL_API);

        if (!response.ok) {
            throw new Error("Error fetching movies from API");

        }

        const data = await response.json();

        if (!data.results || !Array.isArray(data.results) || data.results.length === 0) {
            throw new Error("No movies found in the response.");
        }

        const movies = data.results;

        for (const movie of movies) {
            const newMovie = new Movie({
                title: movie.title,
                overview: movie.overview,
                release_date: movie.release_date,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average,
                vote_count: movie.vote_count,
                popularity: movie.popularity,
                genre_ids: movie.genre_ids,
                poster_path: movie.poster_path || null,
                likes: []
            });
            await newMovie.save();
            console.log(`Movie '${movie.title}' added to the database.`);
        }
    } catch (error) {
        console.error('Error populating database:', error.message); // Mensaje de error más descriptivo
    }
}

export default populateDatabase;
