import mongoose from "mongoose";
import { UserSchema } from "../models/model.js";
import jwt from "jsonwebtoken";

const User = mongoose.model("User", UserSchema);
const SECRET = "test123";

export const authUser = async (req, res) => {
  await User.findOne({ userName: req.body.userName }, (err, user) => {
    console.log(req.body.userName);
    if (err) {
      res.send(err);
    }
    if (user.password === req.body.password) {
      const token = jwt.sign({ userId: user.userId }, SECRET, {
        expiresIn: 300,
      });
      return res.json({ auth: true, token });
    }
    res.status(401).end();
  }).clone();
};
