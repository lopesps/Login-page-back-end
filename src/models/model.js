import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  userName: {
    type: String,
    required: "Enter a user name!",
  },
  password: {
    type: String,
    required: "Enter a password!",
  },
  email: {
    type: String,
  },
});
