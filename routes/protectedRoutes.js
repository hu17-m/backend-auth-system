const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

// Dashboard (all logged-in users)
router.get("/dashboard", protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.role}` });
});

// Admin route
router.get("/admin", protect, authorizeRoles("admin", "superadmin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});

// Teacher route
router.get("/teacher", protect, authorizeRoles("teacher"), (req, res) => {
  res.json({ message: "Teacher access granted" });
});

// Student route
router.get("/student", protect, authorizeRoles("student"), (req, res) => {
  res.json({ message: "Student access granted" });
});

module.exports = router;