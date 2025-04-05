const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();
 
 
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
 
    if (!name || name.trim() === "") {
      console.log(`Data not found`)
    }
    if (!email || email.trim() === "") {
      console.log(`Data not found`)
    }
    if (!password || password.trim() === "") {
      console.log(`Data not found`)
    }
   
   

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
       
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong inputs" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
