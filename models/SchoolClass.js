const { Schema, model } = require("mongoose");

const SchoolClassesSchema = Schema(
  {
    classes: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
    school: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: "School",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
  },
  { timestamps: true }
);

module.exports = model("SchoolClass", SchoolClassesSchema);
