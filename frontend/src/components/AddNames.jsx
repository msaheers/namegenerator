import { useState, useEffect } from "react";
import axios from "axios";

const AddNames = () => {
  const [names, setNames] = useState([]);
  const [newName, setNewName] = useState("");
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    fetchNames();
  }, []);

  const fetchNames = async () => {
    const res = await axios.get("http://localhost:5000/api/nomes");
    setNames(res.data);
  };

  const addName = async () => {
    if (!newName.trim()) return;
    await axios.post("http://localhost:5000/api/nomes", { nome: newName });
    setNewName("");
    fetchNames();
  };

  const clearAll = async () => {
    if (window.confirm("Are you sure you want to clear all names?")) {
      await axios.delete("http://localhost:5000/api/nomes/clear"); // we'll add this route next
      setNames([]);
    }
  };

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h3>Add First Name</h3>
      <input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Enter first name"
      />
      <button onClick={addName}>Add</button>
      <button onClick={clearAll} style={{ color: "white" }}>Clear All</button>

      {showList && (
        <ul>
          {names.map((n) => (
            <li key={n._id}>{n.nome}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddNames;
