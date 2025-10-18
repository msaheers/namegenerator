import mongoose from "mongoose";

const nameSchema = new mongoose.Schema({
    nome: { type: String, required: true }
});

export default mongoose.model("Name", nameSchema);