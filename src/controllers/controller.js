import mongoose from "mongoose";
import { UserSchema } from "../models/model.js";
import bcrypt from "bcrypt";
import Auth from "../middlewares/Auth.js";

const User = mongoose.model("User", UserSchema);

export const addNewUser = async (req, res) => {
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
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(422).json({ msg: "Utilize outro email!" });
  }
  const userExists = await User.findOne({ userName: req.body.userName });
  if (userExists) {
    return res.status(422).json({ msg: "Utilize outro nome de usuario!" });
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
  newUser.save((err) => {
    if (err) {
      return res.status(500).json({
        msg: "Erro ao conectar com o servidor, tente novamente mais tarde!",
      });
    }
    res.status(201).json({ msg: "Usuario criado com sucesso!" });
  });
};

export const getUsers = (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json({ user }).end();
  });
};

export const getUserWhithID = async (req, res) => {
  const user = await User.findById({ _id: req.params.userId }, "-password");

  if (!user) {
    return res.status(404).json({ msg: "Usuario não encontrado!" });
  }
  return res.status(200).json({ user });
};

export const updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    req.body,
    { new: true },
    (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    }
  );
};

export const deleteUser = (req, res) => {
  User.remove({ _id: req.params.userId }, (err) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "User deleted!" });
  });
};
