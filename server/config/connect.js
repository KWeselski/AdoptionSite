import mongoose from "mongoose";

const connectDb = (url) => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to database.");
  });

  mongoose.connection.on("error", (err) => {
    console.log(`Mongoose connection error: ${err}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from database.");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("Mongoose connection closed due to app termination.");
      process.exit(0);
    });
  });
};
export default connectDb;
