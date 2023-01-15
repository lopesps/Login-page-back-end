import express from "express";
import { authUser } from "../controllers/auth.js";
import {
  addNewUser,
  getUsers,
  getUserWhithID,
  updateUser,
  deleteUser,
  getCats,
} from "../controllers/controller.js";
import { addNewClient, getClients } from "../controllers/client.js";

const router = express.Router();

router
  .route("/cats/:catCode")
  //get all contacts
  .get(getCats);

router
  .route("/user")
  //get all contacts
  .get(getUsers);

router
  .route("/api/register")
  //post a new contact
  .post(addNewUser);

router
  .route("/api/login")
  //post a new contact
  .post(authUser);

router
  .route("/api/clients")
  //post a new contact
  .post(addNewClient)

  .get(getClients)

  .get(getUserWhithID)

  .put(updateClient)

  .delete(deleteClient);

router
  .route("/user/:userId")
  //get specific contact
  .get(getUserWhithID)

  //update a contact
  .put(updateUser)

  //delete a contact
  .delete(deleteUser);

export default router;
