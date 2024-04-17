const express = require("express");
const cors = require("cors");
const clientRoute = require("./routes/clientRoute");
const mongoose = require("mongoose");

PORT = 5555;
MONGO_URI =
  "mongodb+srv://Daniel:20bai1111@certificates.vzgl1fl.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to the App");
});

app.use("/", clientRoute);

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB Atlas:", err);
    process.exit(1);
  });
