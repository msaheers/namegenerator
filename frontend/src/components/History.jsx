import { useState, useEffect } from "react";
import axios from "axios";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const res = await axios.get("http://localhost:5000/api/historico");
    setHistory(res.data);
  };

  return (
    <div>
      <h3>History</h3>
      <ul>
        {history.map((h) => (
          <li key={h._id}>{h.nomeCompleto}</li>
        ))}
      </ul>
    </div>
  );
};

export default History;
