import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ClientSchema = new Schema({
  name: {
    type: String,
    required: "Enter a name!",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: "Enter a phone!",
  },
  client_address: {
    type: String,
    required: "Enter a address!",
  },
  cpf: {
    type: String,
    required: "Enter a cpf!",
    unique: true,
  },
});
