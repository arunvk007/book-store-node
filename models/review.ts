import mongoose, { Document, Model, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

interface IReview extends Document {
    user: Schema.Types.ObjectId
    book: Schema.Types.ObjectId
    rating: number
    message: string
}

const reviewSchema = new Schema<IReview>(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    message: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

reviewSchema.plugin(mongooseUniqueValidator);
const Review = mongoose.model<IReview>("Review", reviewSchema);

export default Review;
