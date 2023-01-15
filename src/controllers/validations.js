import mongoose from "mongoose";
import { UserSchema } from "../models/model.js";
import bcrypt from "bcrypt";

const User = mongoose.model("User", UserSchema);

export const registerNewUser = async (req, res) => {
  const checkPswd = req.body.checkPassword;
  //validations
  if (!req.body.userName) {
    return res.status(422).json({ msg: "O nome é obrigatório!" });
  }
  if (!req.body.email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }
  if (!req.body.password) {
    return res.status(422).json({ msg: "A senha é obrigatório!" });
  }
  if (req.body.password !== checkPswd) {
    return res.status(422).json({ msg: "As senhas não conferem!" });
  }
  //check if user exists
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(422).json({ msg: "Utilize outro email!" });
  }
  //create password
  const salt = await bcrypt.genSalt(12);
  const pswdHash = await bcrypt.hash(req.body.password, salt);
  console.log(req.body);
  //create user
  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: pswdHash,
  });
  newUser.save((err, user) => {
    if (err) {
      res.send(err);
    }
    res.status(201).json({ msg: "Usuario criado com sucesso!" });
  });
};
