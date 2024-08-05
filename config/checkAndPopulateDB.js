import Movie from "../model/movieModel.js";
import populateDatabase from "./populateDB.js"

const checkAndPopulateDB = async () => {
    try {
        const movieCount = await Movie.countDocuments();
        if (movieCount === 0) {
            console.log('Database is empty. Populating with initial data...'.green.underline.bold);
            await populateDatabase();
        } else {
            console.log('Database already contains data. Skipping population...'.yellow.underline.bold);
        }
    } catch (error) {
        console.error('Error checking database:', error);
    }
}

export default checkAndPopulateDB;
