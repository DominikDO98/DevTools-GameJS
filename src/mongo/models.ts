import { Schema, model } from "mongoose";

const scoreSchema = new Schema({
  userId: Schema.ObjectId,
  score: Number,
});

const userSchema = new Schema({
  username: String,
});

export const scoreModel = model("Score", scoreSchema);
export const userModel = model("User", userSchema);
