const mongoose = require("mongoose");
 
const receptSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Název receptu je povinný"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Kategorie je povinná"],
      enum: ["polévka", "hlavní jídlo", "dezert", "příloha", "předkrm"],
    },
    procedure: {
      type: String,
      required: [true, "Postup vaření je povinný"],
    },
    ingredients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Surovina",
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    ratingSum: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
 
module.exports = mongoose.model("Recept", receptSchema);