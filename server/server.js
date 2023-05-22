import express from 'express';
import cors from 'cors';
import cloudinary from 'cloudinary';
import connectDb from './config/connect.js';
import animalsRouter from './routes/animals.js';
import sheltersRouter from './routes/shelters.js';
import applicationsRouter from './routes/applications.js';
import authRouter from './routes/auth.js';
import { getHomeData } from './controllers/homeController.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get('/', getHomeData);
app.use('/animals', animalsRouter);
app.use('/auth', authRouter);
app.use('/applications', applicationsRouter);
app.use('/shelters', sheltersRouter);

const startServer = async () => {
  try {
    connectDb(process.env.DB_URL);

    app.listen(8080, () =>
      console.log('Server started on port http://localhost:8080')
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
