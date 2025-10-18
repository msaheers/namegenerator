import express from "express"; 
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nameRoutes from "./routes/nameRoutes.js";
import surnamesRoutes from "./routes/surnamesRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/nomes", nameRoutes);
app.use("/api/apelidos", surnamesRoutes);
app.use("/api/historico", historyRoutes);

// ✅ Add this test route
app.get("/", (req, res) => {
  res.send("🚀 Name Generator API is running successfully!");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected ✅"))
    .catch(err => console.error(err));

app.listen(process.env.PORT || 5000, () => 
    console.log(`Server running on port ${process.env.PORT || 5000}`));
