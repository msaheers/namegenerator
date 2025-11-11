import express from "express";
import Name from "../models/Name.js";

const router = express.Router();

// 🟢 GET all names
router.get("/", async (req, res) => {
  try {
    console.log("📥 GET /api/names called");
    const names = await Name.find();
    res.json(names);
  } catch (err) {
    console.error("❌ Error fetching names:", err);
    res.status(500).json({ message: err.message });
  }
});

// 🟣 POST new name
router.post("/", async (req, res) => {
  try {
    console.log("📤 POST /api/names called with body:", req.body);
    const name = new Name({ nome: req.body.nome });
    await name.save();
    console.log("✅ Saved new name:", name);
    res.status(201).json(name);
  } catch (err) {
    console.error("❌ Error saving name:", err);
    res.status(400).json({ message: err.message });
  }
});

// 🔵 DELETE all names
router.delete("/clear", async (req, res) => {
  try {
    await Name.deleteMany({});
    console.log("🧹 All names cleared!");
    res.status(200).json({ message: "All names cleared!" });
  } catch (err) {
    console.error("❌ Error clearing names:", err);
    res.status(500).json({ message: err.message });
  }
});

// 🟡 GENERATE random name
router.post("/generate", async (req, res) => {
  try {
    const { firstNames, surnames } = req.body;

    // validation
    if (!firstNames?.length || !surnames?.length) {
      return res
        .status(400)
        .json({ message: "Both firstNames and surnames are required!" });
    }

    // pick random names
    const randomFirst =
      firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLast =
      surnames[Math.floor(Math.random() * surnames.length)];

    const fullName = `${randomFirst} ${randomLast}`;
    console.log("✨ Generated name:", fullName);

    // optional: save the generated name to MongoDB
    const newName = new Name({ nome: fullName });
    await newName.save();

    res.status(200).json({ name: fullName });
  } catch (err) {
    console.error("❌ Error generating name:", err);
    res.status(500).json({ message: "Error generating name" });
  }
});

export default router;
