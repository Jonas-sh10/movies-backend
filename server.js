import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import errorHandler from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import checkAndPopulateDB from './config/checkAndPopulateDB.js';

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json());
// Middleware para analizar los datos del formulario
app.use(express.urlencoded({ extended: false }));

// Middlewares
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/movies", movieRoutes);

app.use(errorHandler);

connectDB().then( async () => {
    await checkAndPopulateDB();
    app.listen(port, () => {
        console.log(`Server running on port ${port}`.magenta.underline.bold);
    });
});


