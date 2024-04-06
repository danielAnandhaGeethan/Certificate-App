const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  designation: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  communications: {
    type: [String],
  },
});

const Client = mongoose.model("clients", ClientSchema);

module.exports = Client;
