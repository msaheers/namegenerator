import mongoose from "mongoose";

const surnameSchema = new mongoose.Schema({
    apelido: { type: String, required: true }
});

export default mongoose.model("Surname", surnameSchema);