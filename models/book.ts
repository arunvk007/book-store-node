import mongoose, { Document, Model, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

interface IBook extends Document {
    name: string
    author: string
    genre: string
    star_rating: number
    published: Date
    price: number
    language: string
    image: string
}
 
const bookSchema = new Schema<IBook>(
  {
    name: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      default: null
    },
    star_rating: {
      type: Number,
      default: 0
    },
    published: {
      type: Date,
      default: null
    },
    price: {
      type: Number,
      default: 0
    },
    language: {
      type: String
    }, 
    image: {
        type: String,
        default: null
    }
  },
  {
    timestamps: true,
  }
);

bookSchema.plugin(mongooseUniqueValidator);
const Book = mongoose.model<IBook>("Book", bookSchema);

export default Book;
