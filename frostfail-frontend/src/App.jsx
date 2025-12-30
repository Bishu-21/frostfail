import { useEffect, useState } from "react";
import CreateMock from "./components/CreateMock";
import LogsTable from "./components/LogsTable";

export default function App() {
  const [logs, setLogs] = useState([]);

  // 🔁 Fetch logs from backend
  const fetchLogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/logs`);
      const data = await res.json();
      setLogs(data.reverse()); // latest on top
    } catch (err) {
      console.error("Failed to fetch logs");
    }
  };

  // Fetch logs on load
  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* LEFT */}
      <CreateMock onTest={fetchLogs} />

      {/* RIGHT */}
      <LogsTable logs={logs} />
    </div>
  );
}
