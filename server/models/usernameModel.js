const mongoose = require("mongoose");

const UsernameSchema = new mongoose.Schema({
  students: [
    {
      address: String,
      id: String,
    },
  ],
  staff: [
    {
      address: String,
      id: String,
    },
  ],
});

const Usernames = mongoose.model("usernames", UsernameSchema);

module.exports = Usernames;
