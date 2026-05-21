const Recept = require("../models/Recept");
 
const receptDao = {
  // Vytvoření nového receptu
  async create(data) {
    const recept = new Recept(data);
    return await recept.save();
  },
 
  // Získání všech receptů (s názvem surovin)
  async list() {
    return await Recept.find().populate("ingredients", "name unit").sort({ createdAt: -1 });
  },
 
  // Získání receptu podle ID
  async get(id) {
    return await Recept.findById(id).populate("ingredients", "name unit");
  },
 
  // Aktualizace receptu
  async update(id, data) {
    return await Recept.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("ingredients", "name unit");
  },
 
  // Smazání receptu
  async remove(id) {
    return await Recept.findByIdAndDelete(id);
  },
 
  // Přidání hodnocení
  async rate(id, rating) {
    const recept = await Recept.findById(id);
    if (!recept) return null;
 
    recept.ratingSum += rating;
    recept.ratingCount += 1;
    recept.averageRating = Math.round((recept.ratingSum / recept.ratingCount) * 10) / 10;
 
    return await recept.save();
  },
};
 
module.exports = receptDao;
 