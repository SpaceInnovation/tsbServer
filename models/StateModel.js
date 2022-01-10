const { Schema, model } = require("mongoose");

const StateSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
});

module.exports = model("State", StateSchema);
