import { useEffect, useState } from "react";
import CreateMock from "./components/CreateMock";
import LogsTable from "./components/LogsTable";
import { API_BASE } from "./api/frostfail";

export default function App() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadLogs = async () => {
      try {
        const res = await fetch(`${API_BASE}/logs`);
        const data = await res.json();

        if (isMounted) {
          setLogs(data.reverse());
        }
      } catch (err) {
        console.error("Failed to fetch logs", err);
      }
    };

    loadLogs();

    return () => {
      isMounted = false;
    };
  }, []);

  // expose a safe refetch function for children
  const refetchLogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/logs`);
      const data = await res.json();
      setLogs(data.reverse());
    } catch (err) {
      console.error("Failed to fetch logs", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <CreateMock onTest={refetchLogs} />
      <LogsTable logs={logs} />
    </div>
  );
}
