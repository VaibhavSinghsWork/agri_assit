const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const mandiRoutes = require("./routes/mandiRoutes");


const app = express();


// Connect to MongoDB
connectDB();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/mandi", mandiRoutes);
//app.use("/api/fertilizer", fertilizerRoutes);


// Test route
app.get("/", (req, res) => {
    res.send("Agri Assist Backend is running");
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});