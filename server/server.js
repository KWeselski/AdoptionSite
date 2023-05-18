import express from "express";
import cors from "cors";
import connectDb from "./config/connect.js";
import animalsRouter from "./routes/animals.js";
import sheltersRouter from "./routes/shelters.js";
import applicationsRouter from "./routes/applications.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "Hello" });
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
