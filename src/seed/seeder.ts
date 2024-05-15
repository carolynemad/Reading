import dotenv from "dotenv";
import mongoose from "mongoose";
import { ReadingInterval } from "../models/ReadingInterval.js";
import { Book } from "../models/Book.js";
import faker from "faker";

dotenv.config();

/**
npx tsc
node dist/seed/seeder.js
 *
 * @async
 * @returns {*}
 */
async function seedData() {
  try {
    const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;

    if (!mongoConnectionString) {
      console.error(
        "MongoDB connection string is not defined in environment variables"
      );
      process.exit(1);
    }

    await mongoose.connect(mongoConnectionString, {});
    console.log("MongoDB connected");

    await ReadingInterval.deleteMany({});
    await Book.deleteMany({});

    const bookPromises = Array.from({ length: 100 }, () => {
      const title = faker.company.catchPhrase();
      const numberOfPages = faker.datatype.number({ min: 50, max: 500 });

      return Book.create({ title, numberOfPages });
    });
    const books = await Promise.all(bookPromises);
    console.log("Books seeded successfully");

    const readingIntervalPromises = Array.from({ length: 50 }, () => {
      const userId = faker.datatype.uuid();
      const book =
        books[faker.datatype.number({ min: 0, max: books.length - 1 })];
      const startPage = faker.datatype.number({
        min: 1,
        max: book.numberOfPages - 1,
      });
      const endPage =
        startPage +
        faker.datatype.number({ min: 1, max: book.numberOfPages - startPage });

      return ReadingInterval.create({
        userId,
        bookId: book._id,
        startPage,
        endPage,
      });
    });

    await Promise.all(readingIntervalPromises);
    console.log("Reading intervals seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedData();
