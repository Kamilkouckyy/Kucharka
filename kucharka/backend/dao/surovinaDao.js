const Surovina = require("../models/Surovina");
 
const surovinaDao = {
  // Vytvoření nové suroviny
  async create(data) {
    const surovina = new Surovina(data);
    return await surovina.save();
  },
 
  // Získání všech surovin
  async list() {
    return await Surovina.find().sort({ name: 1 });
  },
 
  // Získání suroviny podle ID
  async get(id) {
    return await Surovina.findById(id);
  },
 
  // Aktualizace suroviny
  async update(id, data) {
    return await Surovina.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  },
 
  // Smazání suroviny
  async remove(id) {
    return await Surovina.findByIdAndDelete(id);
  },
};
 
module.exports = surovinaDao;
 