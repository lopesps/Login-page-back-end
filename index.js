import * as dotenv from "dotenv";
import express from "express";
import router from "./src/routes/routes.js";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//credentials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

//mongoose connection
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.efgede7.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT);
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

/* mongoose.connect(
  "mongodb://127.0.0.1:27017/user",
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("mongoDB Connection succeeded");
    } else {
      console.log("Error in mongoDB Connection :" + err);
    }
  }
); */

//Private route
app.use("/user/:id", (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split("")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }
});

//serving static files
app.use(express.static("public"));
//Router
app.use(router);

//Open route
app.get("/", (req, res) =>
  res
    .status(200)
    .json({ msg: "Node and express server is running on port", PORT })
);

/* app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));
 */
