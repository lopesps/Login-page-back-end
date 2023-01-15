import mongoose from "mongoose";
import { UserSchema } from "../models/model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const User = mongoose.model("User", UserSchema);

export const authUser = async (req, res) => {
  const { userName, password } = req.body;
  //validations
  if (!userName) {
    return res.status(422).json({ msg: "O nome é obrigatório!" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatório!" });
  }
  //check if user exists
  const user = await User.findOne({ userName: userName });
  if (!user) {
    return res.status(404).json({ msg: "Usuario não registrado!" });
  }
  //check password
  const checkPassword = await bcrypt.compare(password, user.password);
  console.log(checkPassword);
  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha invalida!" });
  }
  //validate token
  try {
    const secret = process.env.SECRET_KEY;
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );
    return res
      .status(200)
      .json({ msg: "Autenticação realizada com sucesso!", token });
  } catch (err) {
    return res.status(500).json({
      msg: "Erro ao conectar com o servidor, tente novamente mais tarde!",
    });
  }
};
