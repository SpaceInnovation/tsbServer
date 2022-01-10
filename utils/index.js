const School = require("../models/school");
const nodeMailer = require("nodemailer");

module.exports = class Utils {
  firstLetterToUpper(req) {
    const arr = req.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    let res = arr.join(" ");
    return res;
  }

  // for checking if the admin is a super
  isSuper(req) {
    let is_user = false;
    if (req.user.role === "super") {
      is_user = true;
    }
    return is_user;
  }

  // for asigning values during editing
  asignValue(field, id) {
    return field ? field : id;
  }

  sendingMail() {
    // create transporter
  }

  // FOR CALCULATING THE RETIREMENT
  retirement(yearOfBirth, yearEmployed) {
    let serviceYears = 35;
    let retirementAge = 60;
    let retirementYear = 0;
    let currentYear = new Date().getFullYear();
    let age = currentYear - yearOfBirth;
    let servedYears = currentYear - yearEmployed;

    if (servedYears <= serviceYears && age <= retirementAge) {
      retirementYear = serviceYears - servedYears;
      retirementYear = currentYear + retirementYear;
      if (retirementYear + age > retirementAge) {
        retirementYear = retirementAge - (age + servedYears);

        retirementYear = currentYear + retirementYear;

        return {
          message: "Active",
          retirementYear: retirementYear,
          age,
          servedYears: servedYears,
          teacher_status: "active",
        };
      }
      return {
        message: "Active",
        retirementYear: retirementYear,
        servedYears: servedYears,
        age,
        teacher_status: "active",
      };
    } else if (servedYears < serviceYears && age > retirementAge) {
      return {
        message: `inActive, This teacher is due for retirement. The age ${age} is above retirement`,
        age,
        servedYears: servedYears,
        teacher_status: "inActive",
      };
    } else if (servedYears > serviceYears && age < retirementAge) {
      return {
        message: `inActive, This teacher is due for retirement, having serviced for ${servedYears} years`,
        servedYears: servedYears,
        age,
        teacher_status: "inActive",
      };
    }
  }
};
