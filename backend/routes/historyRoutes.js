import express from "express";
import History from "../models/History.js";

const router = express.Router();

// GET history
router.get("/", async (req, res) => {
  try {
    console.log("GET /api/historico called");

    const historico = await History.find().sort({ createdAt: -1 });
    console.log("History fetched:", historico);

    res.json(historico);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ message: err.message });
  }
});

// POST new history
router.post("/", async (req, res) => {
  try {
    console.log("POST/api/historico called with body:", req.body);

    const { nomeCompleto } = req.body;
    if (!nomeCompleto) return res.status(400).json({ error: "Full name required" });

    const entry = new History({ nomeCompleto });
    // await entry.save();

    console.log("Saved to history:", entry);
    res.status(201).json(entry);
  } catch (err) {
    console.error("Error saving history:", err);
    res.status(400).json({ message: err.message });
  }
});

export default router;
