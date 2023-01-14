import express from "express";
import { authUser } from "../controllers/auth.js";
import {
  addNewUser,
  getUsers,
  getUserWhithID,
  updateUser,
  deleteUser,
} from "../controllers/controller.js";

const router = express.Router();

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
  .route("/user/:userId")
  //get specific contact
  .get(getUserWhithID)

  //update a contact
  .put(updateUser)

  //delete a contact
  .delete(deleteUser);

export default router;
