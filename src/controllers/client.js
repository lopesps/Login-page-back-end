import mongoose from "mongoose";
import { ClientSchema } from "../models/clients.js";

const Client = mongoose.model("Client", ClientSchema);

export const addNewClient = async (req, res) => {
  //validations
  if (!req.body.name) {
    return res.status(422).json({ msg: "O nome é obrigatório!" });
  }
  if (!req.body.email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }
  if (!req.body.cpf) {
    return res.status(422).json({ msg: "O cpf é obrigatório!" });
  }
  //check if user exists
  const emailExists = await Client.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(422).json({ msg: "Utilize outro email!" });
  }
  const cpfExists = await Client.findOne({ cpf: req.body.cpf });
  if (cpfExists) {
    return res.status(422).json({ msg: "Este CPF já está em uso!" });
  }
  //create user
  console.log(req.body);
  const newClient = new Client({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    client_address: req.body.client_address,
    cpf: req.body.cpf,
  });
  newClient.save((err) => {
    if (err) {
      return res.status(500).json({
        msg: err,
      });
    }
    res.status(201).json({ msg: "Usuario registrado com sucesso!" });
  });
};

export const getClients = (req, res) => {
  Client.find({}, (err, client) => {
    if (err) {
      res.send(err);
    }
    res.json({ client }).end();
  });
};

export const getUserWhithID = async (req, res) => {
  const user = await Client.findById({ _id: req.params.userId });

  if (!client) {
    return res.status(404).json({ msg: "Usuario não encontrado!" });
  }
  return res.status(200).json({ client });
};

export const updateClient = (req, res) => {
  Client.findOneAndUpdate(
    { _id: req.params.userId },
    req.body,
    { new: true },
    (err, client) => {
      if (err) {
        res.send(err);
      }
      res.json(client);
    }
  );
};

export const deleteClient = (req, res) => {
  User.remove({ _id: req.params.userId }, (err) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "User deleted!" });
  });
};
