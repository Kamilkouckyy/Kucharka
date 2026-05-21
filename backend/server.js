console.log('START');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const surovinyRoutes = require("./routes/suroviny");
const receptyRoutes = require("./routes/recepty");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/kucharka";

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/suroviny", surovinyRoutes);
app.use("/api/recepty", receptyRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Kucharka API běží" });
});

// Připojení k MongoDB a spuštění serveru
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Připojeno k MongoDB");
    app.listen(PORT, () => {
      console.log(`Server běží na portu ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MONGOOSE ERROR:", error.message);
    console.error("FULL ERROR:", JSON.stringify(error));
    process.exit(1);
  });