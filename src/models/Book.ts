import { Schema, model, Document } from 'mongoose';

interface IBook extends Document {
    title: string;
    numberOfPages: number;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  numberOfPages: { type: Number, required: true },
});

export const Book = model<IBook>('Book', bookSchema);
