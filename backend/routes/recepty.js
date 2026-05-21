const express = require("express");
const router = express.Router();
const receptDao = require("../dao/receptDao");
 
// GET /api/recepty — seznam všech receptů
router.get("/", async (req, res) => {
  try {
    const recepty = await receptDao.list();
    res.json({ status: "ok", data: recepty });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
 
// GET /api/recepty/:id — detail receptu
router.get("/:id", async (req, res) => {
  try {
    const recept = await receptDao.get(req.params.id);
    if (!recept) {
      return res.status(404).json({ status: "error", message: "Recept nenalezen" });
    }
    res.json({ status: "ok", data: recept });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
 
// POST /api/recepty — vytvoření nového receptu
router.post("/", async (req, res) => {
  try {
    const { name, category, procedure, ingredients } = req.body;
    if (!name || !category || !procedure) {
      return res.status(400).json({
        status: "error",
        message: "Název, kategorie a postup jsou povinné",
      });
    }
    const recept = await receptDao.create({ name, category, procedure, ingredients: ingredients || [] });
    res.status(201).json({ status: "ok", data: recept });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
 
// PUT /api/recepty/:id — aktualizace receptu
router.put("/:id", async (req, res) => {
  try {
    const recept = await receptDao.update(req.params.id, req.body);
    if (!recept) {
      return res.status(404).json({ status: "error", message: "Recept nenalezen" });
    }
    res.json({ status: "ok", data: recept });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
 
// DELETE /api/recepty/:id — smazání receptu
router.delete("/:id", async (req, res) => {
  try {
    const recept = await receptDao.remove(req.params.id);
    if (!recept) {
      return res.status(404).json({ status: "error", message: "Recept nenalezen" });
    }
    res.json({ status: "ok", message: "Recept byl smazán" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
 
// POST /api/recepty/:id/hodnoceni — hodnocení receptu
router.post("/:id/hodnoceni", async (req, res) => {
  try {
    const { rating } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        status: "error",
        message: "Hodnocení musí být číslo mezi 1 a 5",
      });
    }
    const recept = await receptDao.rate(req.params.id, Number(rating));
    if (!recept) {
      return res.status(404).json({ status: "error", message: "Recept nenalezen" });
    }
    res.json({ status: "ok", data: recept });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
 
module.exports = router;