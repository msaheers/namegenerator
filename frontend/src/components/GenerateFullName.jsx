import { useState } from "react";
import axios from "axios";

const GenerateFullName = () => {
  const [generatedName, setGeneratedName] = useState("");

  const generateName = async () => {
    try {
      // 1️⃣ Fetch all names and surnames from MongoDB
      const namesRes = await axios.get("http://localhost:5000/api/nomes");
      const surnamesRes = await axios.get("http://localhost:5000/api/apelidos");

      const names = namesRes.data;
      const surnames = surnamesRes.data;

      // 2️⃣ Make sure we have data
      if (!names.length || !surnames.length) {
        alert("⚠️ No names or surnames found in database. Please add some first!");
        return;
      }

      // 3️⃣ Pick random ones
      const randomName = names[Math.floor(Math.random() * names.length)].nome;
      const randomSurname = surnames[Math.floor(Math.random() * surnames.length)].apelido;
      const fullName = `${randomName} ${randomSurname}`;

      // 4️⃣ Save generated name to history
      await axios.post("http://localhost:5000/api/historico", { nomeCompleto: fullName });

      // 5️⃣ Show result
      setGeneratedName(fullName);
      console.log("✅ Generated full name:", fullName);

    } catch (err) {
      console.error("❌ Error generating name:", err);
      alert("Error generating name! Check console for details.");
    }
  };

  return (
    <div>
      <h3>Generate Names</h3>
      <button onClick={generateName}>Generate</button>
      {generatedName && <h2>{generatedName}</h2>}
    </div>
  );
};

export default GenerateFullName;
