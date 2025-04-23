const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const LoginModel = require("./models/login_db");
const ProfileModel=require("./models/profile_db")

const app = express();
app.use(express.json({ limit: "10mb" })); // Increased limit for JSON payload
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/login")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


app.post('/register', (req, res) => {
  const { email } = req.body;
  LoginModel.findOne({ email: email })
    .then(user => {
      if (user) {
        res.json("User already registered");
      } else {
        LoginModel.create(req.body)
          .then(() => res.json("success"))
          .catch(err => res.status(500).json("Registration failed: " + err.message));
      }
    })
    .catch(err => res.status(500).json("Error: " + err.message));
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;//Getting email,password from frontend
  LoginModel.findOne({ email: email }) //searches for a document (record) in the database collection where email matches
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("success");
        } else {
          res.json("Incorrect password");
        }
      } else {
        res.json("No record found");
      }
    })
    .catch(err => res.status(500).json("Error: " + err.message));
});

app.post("/submit-profile", (req, res) => {
  const newProfile = new ProfileModel(req.body);
  
  newProfile.save()
    .then(() => res.json("Profile submitted successfully"))
    .catch(err => res.status(500).json("Profile submission failed: " + err.message));
});

//Fetch
app.get("/latest-profile", async (req, res) => {
  try {
    const profile = await ProfileModel.findOne().sort({ createdAt: -1 }); // Fetch the latest profile
    if (!profile) {
      return res.status(404).json({ message: "No profiles found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
});

app.get("/contact-info", async (req, res) => {
  try {
    const profile = await ProfileModel.findOne().sort({ createdAt: -1 });
    // console.log("Fetched profile:", profile); // Debugging log

    if (!profile || !profile.contact) {
      console.log("No contact info found!");
      return res.status(404).json({ message: "No contact information found" });
    }
    
    res.json(profile.contact);
  } catch (error) {
    console.error("Error fetching contact information:", error.message);
    res.status(500).json({ message: "Error fetching contact information", error: error.message });
  }
});


app.get("/project-info", async (req, res) => {
  try {
    const profile = await ProfileModel.findOne().sort({ createdAt: -1 }); // Fetch the latest project
    if (!profile ) {
      return res.status(404).json({ message: "No Project information found" });
    }
    res.json(profile.projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Project information", error: error.message });
  }
});

app.get("/technical-skills", async (req, res) => {
  try {
    const profile = await ProfileModel.findOne().sort({ createdAt: -1 }); 
    if (!profile ) {
      return res.status(404).json({ message: "No Technical Skill found" });
    }
    res.json(profile.technicalSkills);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Technical skill", error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
