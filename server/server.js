const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const clientRoute = require("./routes/clientRoute");

const PORT = 5555;
const URL = "mongodb://127.0.0.1:27017/certificates";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log(res);
  return res.status(234).send("Welcome to the App");
});

app.use("/", clientRoute);

mongoose
  .connect(URL)
  .then(() => {
    console.log("App connected to database");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
