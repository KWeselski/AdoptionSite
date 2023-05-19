import express from "express";
import cors from "cors";
import cloudinary from "cloudinary";
import connectDb from "./config/connect.js";
import animalsRouter from "./routes/animals.js";
import sheltersRouter from "./routes/shelters.js";
import applicationsRouter from "./routes/applications.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET_KEY,
});

app.use("/animals", animalsRouter);
app.use("/applications", applicationsRouter);
app.use("/shelters", sheltersRouter);

const startServer = async () => {
  try {
    connectDb(process.env.DB_URL);

    app.listen(8080, () =>
      console.log("Server started on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
