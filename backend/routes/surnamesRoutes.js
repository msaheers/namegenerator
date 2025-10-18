import express from "express";
import Surname from "../models/Surname.js";

const router = express.Router();

// GET all surnames
router.get("/", async (req, res) => {
  try {
    console.log("📥 GET /api/apelidos called");

    const surnames = await Surname.find();
    console.log("✅ Surnames fetched from DB:", surnames);

    if (!surnames.length) {
      console.warn("⚠️ No surnames found in the database!");
    }

    res.json(surnames);
  } catch (err) {
    console.error("❌ Error fetching surnames:", err);
    res.status(500).json({ message: err.message });
  }
});

// POST new surname
router.post("/", async (req, res) => {
  try {
    console.log("📤 POST /api/apelidos called with body:", req.body);

    const surname = new Surname({ apelido: req.body.apelido });
    await surname.save(); // ✅ now it actually saves!

    console.log("✅ Saved new surname:", surname);
    res.status(201).json(surname);
  } catch (err) {
    console.error("❌ Error saving surname:", err);
    res.status(400).json({ message: err.message });
  }
});

router.delete("/clear", async (req, res) => {
  try {
    await Surname.deleteMany({});
    console.log(" All surnames cleared!");
    res.status(200).json({ message: "All surnames cleared!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

