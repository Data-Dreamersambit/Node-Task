const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/userModel");

const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
  try {
    if (req?.user?.id) {
      res.status(404).json({ message: "Iser Id Not Found" });
    }
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ message: "User Find Successfully", data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { name, email, address, bio } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, address, bio },
      { new: true }
    ).select("-password");
    res.json(updateUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


  
module.exports = router;
