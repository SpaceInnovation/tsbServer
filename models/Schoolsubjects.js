const { Schema, model } = require("mongoose");

const SchoolSubjectsSchema = Schema(
  {
    subject: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: "Subject",
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
    subjectCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model("SchoolSubject", SchoolSubjectsSchema);
