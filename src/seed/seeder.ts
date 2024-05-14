import mongoose from "mongoose";
import { ReadingInterval } from "../models/ReadingInterval";
import { Book } from "../models/Book";
import faker from "faker";

/*
npx tsc
node dist/seed/seeder.js
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
    mongoose
      .connect(mongoConnectionString, {})
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.log(err));

    await ReadingInterval.deleteMany({});
    await Book.deleteMany({});

    const bookPromises = Array.from({ length: 300 }, () => {
      const title = faker.company.catchPhrase();
      const numberOfPages = faker.datatype.number({ min: 50, max: 500 });

      return Book.create({ title, numberOfPages });
    });
    const books = await Promise.all(bookPromises);
    console.log("Books seeded successfully");

    const readingIntervalPromises = Array.from({ length: 100 }, () => {
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
