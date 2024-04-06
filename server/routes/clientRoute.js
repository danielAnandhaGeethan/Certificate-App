const express = require("express");
const Client = require("../models/clientModel");
const router = express.Router();

router.post("/clients/", async (req, res) => {
  try {
    if (
      !req.body.address ||
      !req.body.name ||
      !req.body.age ||
      !req.body.designation ||
      !req.body.password
    ) {
      return res.status(400).send({ message: "Invalid Data" });
    }

    const check = await Client.find({ address: req.body.address });

    if (check.length > 0) {
      return res.status(500).send({
        message: "User Already Exists",
      });
    }

    const newClient = {
      address: req.body.address,
      name: req.body.name,
      age: req.body.age,
      designation: req.body.designation,
      password: req.body.password,
    };

    const client = await Client.create(newClient);

    return res.status(201).json(client);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

router.get("/clients/:data", async (req, res) => {
  try {
    const data = req.params.data.split(",");

    const address = data[0];
    const password = data[1];

    const client = await Client.findOne({
      address,
      password,
    });

    if (client) {
      return res.status(200).json(client);
    } else {
      return res.status(400).send({ message: "No such user" });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
});

router.get("/student/:data", async (req, res) => {
  try {
    const data = req.params.data.split(",");

    const address = data[0];

    const client = await Client.findOne({
      address,
    });

    if (client) {
      return res.status(200).json(client);
    } else {
      return res.status(400).send({ message: "No such user" });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
});

router.get("/staff/:data", async (req, res) => {
  try {
    const data = req.params.data.split(",");

    const address = data[0];

    const client = await Client.findOne({
      address,
    });

    if (client) {
      return res.status(200).json(client);
    } else {
      return res.status(400).send({ message: "No such user" });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
});

router.put("/student/:data", async (req, res) => {
  try {
    const data = req.params.data.split(",");

    const sender = data[0];
    const receiver = data[1];

    const updatedClient = await Client.findOneAndUpdate(
      { address: receiver },
      { $push: { communications: sender } },
      { new: true }
    );

    if (updatedClient) {
      return res.status(200).send({ message: "Done" });
    } else {
      return res.status(400).send({ message: "No such user" });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
});

router.put("/staff/:address/:approves", async (req, res) => {
  try {
    const { address, approves } = req.params;

    let modifiedApproves;
    if (approves === "null") modifiedApproves = [];
    else modifiedApproves = approves.split(",");

    const updatedApproves = await Client.findOneAndUpdate(
      { address: address },
      { $set: { communications: modifiedApproves } },
      { new: true }
    );

    if (updatedApproves) {
      return res.status(200).send({ message: "Done" });
    } else {
      return res.status(400).send({ message: "No such user" });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
});

router.put("/student/:address/:approves", async (req, res) => {
  try {
    const { address, approves } = req.params;

    let modifiedApproves;
    if (approves === "null") modifiedApproves = [];
    else modifiedApproves = approves.split(",");

    const updatedApproves = await Client.findOneAndUpdate(
      { address: address },
      { $set: { communications: modifiedApproves } },
      { new: true }
    );

    if (updatedApproves) {
      return res.status(200).send({ message: "Done" });
    } else {
      return res.status(400).send({ message: "No such user" });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
});

module.exports = router;
