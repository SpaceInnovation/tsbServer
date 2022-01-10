const { Schema, model } = require("mongoose");

const RoleSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
});

module.exports = model("Role", RoleSchema);
