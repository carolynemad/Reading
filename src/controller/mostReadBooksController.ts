import { Request, Response } from "express";
import { ReadingInterval } from "../models/ReadingInterval";
import mostReadBooksService from "../services/mostReadBooksService";

const getMostReadBooks = async (res: Response) => {
  console.log("Received request to /most-read");

  try {
    console.log("Fetching all reading intervals from the database");
    const intervals = await ReadingInterval.find();
    console.log(`Found ${intervals.length} reading intervals`);

    const sortedBooks = mostReadBooksService.calculateMostReadBooks(intervals);

    console.log("Sending response with sorted books by pages read");
    res.send(sortedBooks);
  } catch (error) {
    console.error("Error occurred while processing /most-read request:", error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching the most read books" });
  }
};

const mostReadBooksController = {
  getMostReadBooks,
};

export default mostReadBooksController;
