const express = require("express");
const Client = require("../models/clientModel");
const Usernames = require("../models/usernameModel");
const router = express.Router();

router.get("/usernames/:data", async (req, res) => {
  try {
    const data = req.params.data.split(",");

    const address = data[0];
    const designation = parseInt(data[1]);

    let query = {};
    if (designation === 1) {
      query = { "students.address": address };
    } else if (designation === 2) {
      query = { "staff.address": address };
    } else {
      return res.status(400).send({ message: "Invalid designation" });
    }

    if (designation === 1) {
      const user = await Usernames.findOne(query, { "students.$": 1 });

      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(400).send({ message: "No such user" });
      }
    } else {
      const user = await Usernames.findOne(query, { "staff.$": 1 });

      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(400).send({ message: "No such user" });
      }
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
});

router.get("/usernames/length/:data", async (req, res) => {
  try {
    const designation = parseInt(req.params.data);

    let existingUsernames = await Usernames.findOne({});

    if (!existingUsernames) {
      return res.status(404).send({ message: "No usernames found" });
    }

    const arrayToSearch =
      designation === 1 ? existingUsernames.students : existingUsernames.staff;

    const lastUser = arrayToSearch[arrayToSearch.length - 1];

    if (!lastUser) {
      return res
        .status(404)
        .send({ message: "No users found in the specified array" });
    }

    res.status(200).send(lastUser);
  } catch (error) {
    console.error("Error fetching last user:", error);
    res.status(500).send({ error: "Failed to fetch last user" });
  }
});

router.post("/usernames/:data", async (req, res) => {
  try {
    const data = req.params.data.split(",");

    const address = data[0];
    const id = data[1];
    const designation = parseInt(data[2]);

    let existingUsernames = await Usernames.findOne({});

    if (!existingUsernames) {
      existingUsernames = new Usernames();
    }

    const arrayToUpdate =
      designation === 1 ? existingUsernames.students : existingUsernames.staff;

    arrayToUpdate.push({ address, id });
    await existingUsernames.save();

    res.status(201).send({ message: "Usernames created successfully" });
  } catch (error) {
    console.error("Error creating usernames:", error);
    res.status(500).send({ error: "Failed to create usernames" });
  }
});

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

router.get("/clients/:address", async (req, res) => {
  try {
    const { address } = req.params;

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

router.get("/clients/:address/:password", async (req, res) => {
  try {
    const { address, password } = req.params;

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
