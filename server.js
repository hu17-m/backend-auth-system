require("dotenv").config(); // ✅ FIRST LINE

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Routes
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});