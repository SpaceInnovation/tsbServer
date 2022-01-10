const { Schema, model } = require("mongoose");

const teacherSchema = Schema(
  {
    serial: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      // required: true
    },
    surname: {
      type: String,
      // required: true
    },
    firstName: {
      type: String,
    },
    otherNames: {
      type: String,
    },
    email: {
      type: String,
      // required: true,
    },

    phone: {
      type: String,
      // required: true,
    },
    staffID: {
      type: String,
      // required: true,
    },
    gender: {
      type: String,
      // required: true
    },
    dob: {
      type: Date,
      // required: true
    },
    age: {
      type: Number,
    },
    NIN: {
      type: String,
    },
    disability: {
      type: String,
      default: "None",
    },
    maritalStatus: {
      type: String,
    },
    spouse: {
      type: String,
    },
    nationality: {
      type: String,
    },
    stateOrigin: {
      type: Schema.Types.ObjectId,
      ref: "State",
    },
    LGAOrigin: {
      type: Schema.Types.ObjectId,
      ref: "LGA",
    },
    address: {
      type: String,
    },
    qualification: {
      type: Schema.Types.ObjectId,
      ref: "Qualification",
    },
    discipline: {
      type: String,
    },
    // subject: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Subject",
    // },

    gradeLevel: {
      type: Schema.Types.ObjectId,
      ref: "GradeLevel",
    },
    appointmentDate: {
      type: Date,
      required: true,
    },

    imageURL: {
      type: String,
      // required: true,
    },
    nextOfKin: {
      name: {
        type: String,
        // required:true
      },
      email: String,

      occupation: {
        type: String,
      },
      phone: {
        // required:true,
        type: String,
      },
      relationship: {
        type: String,
      },
      address: {
        type: String,
      },
    },
    servedYears: {
      type: Number,
    },
    retirementYear: {
      type: Number,
    },
    steps: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      default: "Employed",
    },
    counter: {
      type: Number,
      require: true,
      default: 0,
    },
    currentSchool: {
      type: Schema.Types.ObjectId,
      ref: "School",
      require: true,
    },
    // createdBy: {
    //   require: true,
    //   type: Schema.Types.ObjectId,
    //   ref: "Admin",
    // },
  },
  { timestamps: true }
);
// Userchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// Userchema.methods.getResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");
//   this.resetPasswordExpired = Date.now() + 20 * (60 * 1000);
//   return resetToken;
// };

module.exports = model("Teacher", teacherSchema);
