const { Schema, model } = require("mongoose");

const LGASchema = new Schema(
  {
    name: {
      require: true,
      type: String,
    },
    stateID: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: "State",
    },
    schools: {
      require: true,
      type: String,
      default: 0,
    },
    teachers: {
      require: true,
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model("LGA", LGASchema);
