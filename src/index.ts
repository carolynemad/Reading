import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import readingIntervalsRoute from "./routes/readingIntervals";
import mostReadBooksRoute from "./routes/mostReadBooks";

export const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/reading-intervals", readingIntervalsRoute);
app.use("/books", mostReadBooksRoute);

const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;

if (!mongoConnectionString) {
  console.error(
    "MongoDB connection string is not defined in environment variables"
  );
  process.exit(1);
}

mongoose
  .connect(mongoConnectionString, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
