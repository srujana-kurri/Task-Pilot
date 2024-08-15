const mongoose = require("mongoose");
const taskschema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    duedate: { type: Date, required: true},
    time: { type: Date, required: false},
    category: { type: String, required: true },
    status: { type: Boolean, required: false}
  });
const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [taskschema]
  },
{collection:"usersdata"})

module.exports = mongoose.model("taskscheduler",schema);