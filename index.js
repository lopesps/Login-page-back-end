import express from "express";
import router from "./src/routes/routes.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//mongoose connection
mongoose.connect(
  "mongodb://127.0.0.1:27017/user",
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("mongoDB Connection succeeded");
    } else {
      console.log("Error in mongoDB Connection :" + err);
    }
  }
);

//serving static files
app.use(express.static("public"));
app.use(router);

app.get("/", (req, res) =>
  res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));
