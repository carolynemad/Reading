import { Schema, model, Document } from "mongoose";
import { Book } from "./Book";

interface IReadingInterval extends Document {
  userId: string;
  bookId: string;
  startPage: number;
  endPage: number;
}

const readingIntervalSchema = new Schema<IReadingInterval>({
  userId: { type: String, required: true },
  bookId: { type: Schema.Types.String, ref: "Book", required: true },
  startPage: { type: Number, required: true },
  endPage: {
    type: Number,
    required: true,
    validate: [
      {
        validator: function (this: IReadingInterval, value: number) {
          return value > this.startPage;
        },
        message: "End page ({VALUE}) must be greater than start page ({PATH})",
      },
      {
        validator: async function (this: IReadingInterval, value: number) {
          const book = await Book.findById(this.bookId).select('numberOfPages');
          if (!book) {
            throw new Error('Book not found');
          }
          return value <= book.numberOfPages;
        },
        message: "End page ({VALUE}) must be within the book's number of pages",
      },
    ],
  },
});

export const ReadingInterval = model<IReadingInterval>("ReadingInterval", readingIntervalSchema);
