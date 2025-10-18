import { useState, useEffect } from "react";
import axios from "axios";

const AddSurnames = () => {
  const [surnames, setSurnames] = useState([]);
  const [newSurname, setNewSurname] = useState("");
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    fetchSurnames();
  }, []);

  const fetchSurnames = async () => {
    const res = await axios.get("http://localhost:5000/api/apelidos");
    setSurnames(res.data);
  };

  const addSurname = async () => {
    if (!newSurname.trim()) return;
    await axios.post("http://localhost:5000/api/apelidos", { apelido: newSurname });
    setNewSurname("");
    fetchSurnames();
  };

  const clearAll = async () => {
    if (window.confirm("Are you sure you want to delete all surnames?")) {
      await axios.delete("http://localhost:5000/api/apelidos/clear");
      setSurnames([]);
    }
  };

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h3>Add Surname</h3>
      <input
        value={newSurname}
        onChange={(e) => setNewSurname(e.target.value)}
        placeholder="Enter surname"
      />
      <button onClick={addSurname}>Add</button>
      <button onClick={clearAll} style={{ backgroundColor: "white", color: "white" }}>
        Clear All
      </button>

      {showList && (
      <ul>
        {surnames.map((s) => (
          <li key={s._id}>{s.apelido}</li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default AddSurnames;

