const { Schema, model } = require("mongoose");

const schoolSchema = Schema(
  {
    name: {
      require: true,
      type: String,
    },

    lga: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: "LGA",
    },

    subjects: {
      type: Number,
      default: 0,
    },
    teachers: {
      type: Number,
      default: 0,
    },
    classes: {
      type: Number,
      default: 0,
    },

    // createdBy: {
    //   require: true,
    //   type: Schema.Types.ObjectId,
    //   ref: "Admin",
    // },
  },
  { timestamps: true }
);

module.exports = model("School", schoolSchema);
