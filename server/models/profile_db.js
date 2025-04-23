const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    name: String,
    img: String,
    role: String,
    dob: Date,
    summary: String,
    skills: [String],

    technicalSkills: {
      languages: [String],
      frameworks: [String],
      tools: [String]
    },

    education: [
      {
        degree: String,
        institution: String,
        year: String,
        marks: String,
      },
    ],

    projects: [
      {
        name: String,
        description: String,
        technology: String,
      },
    ],

    contact: {
      email: String,
      phone: String,
      linkedIn: String,
      github: String,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;
