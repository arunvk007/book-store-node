import mongoose, { Document, Model, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

interface IUser extends Document {
    first_name: string;
    last_name: string;
    gender: string;
    email: string;
    password: string;
    date_of_birth: Date;
    phone_number: string;
    role: string
}

const userSchema = new Schema<IUser>(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      default: null
    },
    email: {
      type: String,
      // required: true,
      // unique: true,
    },
    password: {
      type: String,
      default: null
    },
    date_of_birth: {
      type: Date,
      default: null
    },
    phone_number: {
      type: String
    },
    role: {
      type: String,
      default: 'client'
    }
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongooseUniqueValidator);
const User = mongoose.model<IUser>("User", userSchema);

export default User;
