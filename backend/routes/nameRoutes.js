import express from "express";
import Name from "../models/Name.js";

const router = express.Router();

// GET all names
router.get("/", async (req, res) => {
  try {
    console.log("📥 GET /api/nomes called");
    const names = await Name.find();
    res.json(names);
  } catch (err) {
    console.error("❌ Error fetching names:", err);
    res.status(500).json({ message: err.message });
  }
});

// POST new name
router.post("/", async (req, res) => {
  try {
    console.log("📤 POST /api/nomes called with body:", req.body);
    const name = new Name({ nome: req.body.nome });
    await name.save();
    console.log("✅ Saved new name:", name);
    res.status(201).json(name);
  } catch (err) {
    console.error("❌ Error saving name:", err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE all names
router.delete("/clear", async (req, res) => {
  try {
    await Name.deleteMany({});
    console.log(" All names cleared!");
    res.status(200).json({ message: "All names cleared!" });
  } catch (err) {
    res.status(500).json({message:err.message });
  }
})

export default router;
