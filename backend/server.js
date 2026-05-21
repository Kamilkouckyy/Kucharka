console.log('START');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
require("dotenv").config();
console.log('dotenv OK');
const express = require("express");
console.log('express OK');
const mongoose = require("mongoose");
console.log('mongoose OK');
const cors = require("cors");
console.log('cors OK');

console.log('loading suroviny routes...');
const surovinyRoutes = require("./routes/suroviny");
console.log('suroviny OK');
console.log('loading recepty routes...');
const receptyRoutes = require("./routes/recepty");
console.log('recepty OK');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/kucharka";

app.use(cors());
app.use(express.json());

app.use("/api/suroviny", surovinyRoutes);
app.use("/api/recepty", receptyRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Kucharka API běží" });
});

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
    process.exit(1);
  });