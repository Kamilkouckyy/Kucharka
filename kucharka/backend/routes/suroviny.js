const express = require("express");
const router = express.Router();
const surowinaDao = require("../dao/surowinaDao");
 
// GET /api/suroviny — seznam všech surovin
router.get("/", async (req, res) => {
  try {
    const suroviny = await surowinaDao.list();
    res.json({ status: "ok", data: suroviny });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
 
// GET /api/suroviny/:id — detail suroviny
router.get("/:id", async (req, res) => {
  try {
    const surovina = await surowinaDao.get(req.params.id);
    if (!surovina) {
      return res.status(404).json({ status: "error", message: "Surovina nenalezena" });
    }
    res.json({ status: "ok", data: surovina });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
 
// POST /api/suroviny — vytvoření nové suroviny
router.post("/", async (req, res) => {
  try {
    const { name, unit } = req.body;
    if (!name || !unit) {
      return res.status(400).json({ status: "error", message: "Název a jednotka jsou povinné" });
    }
    const surovina = await surowinaDao.create({ name, unit });
    res.status(201).json({ status: "ok", data: surovina });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
 
// PUT /api/suroviny/:id — aktualizace suroviny
router.put("/:id", async (req, res) => {
  try {
    const surovina = await surowinaDao.update(req.params.id, req.body);
    if (!surovina) {
      return res.status(404).json({ status: "error", message: "Surovina nenalezena" });
    }
    res.json({ status: "ok", data: surovina });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
 
// DELETE /api/suroviny/:id — smazání suroviny
router.delete("/:id", async (req, res) => {
  try {
    const surovina = await surowinaDao.remove(req.params.id);
    if (!surovina) {
      return res.status(404).json({ status: "error", message: "Surovina nenalezena" });
    }
    res.json({ status: "ok", message: "Surovina byla smazána" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
 
module.exports = router;