const mongoose = require("mongoose");
 
const surovinaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Název suroviny je povinný"],
      trim: true,
    },
    unit: {
      type: String,
      required: [true, "Jednotka množství je povinná"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
 
module.exports = mongoose.model("Surovina", surovinaSchema);
 