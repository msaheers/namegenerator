import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    nomeCompleto: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("History", historySchema);