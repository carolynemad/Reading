import { Request, Response } from "express";
import { ReadingInterval } from "../models/ReadingInterval";
import mostReadBooksService from "../services/mostReadBooksService";

/**
 * Fetches the intervals from the database and calculates the most read books
 * Controller Layer
 * @async
 * @param {Response} res
 * @returns {*}
 */
const getMostReadBooks = async (res: Response) => {
  console.log("Received request to /most-read");

  try {
    console.log("Fetching all reading intervals from the database");
    const intervals: Array<{
      userId: string;
      bookId: string;
      startPage: number;
      endPage: number;
    }> = await ReadingInterval.find();
    if (!intervals || intervals.length === 0) {
      console.log("No reading intervals found");
      res.status(404).send({ error: "No reading intervals found" });
      return;
    }
    console.log(`Found ${intervals?.length} reading intervals`);

    const sortedBooks = await mostReadBooksService.calculateMostReadBooks(intervals);

    console.log("Sending response with sorted books by pages read");
    res.status(200).send(sortedBooks);
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
