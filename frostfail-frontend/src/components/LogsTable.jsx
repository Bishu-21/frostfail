import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function LogsTable({ logs = [] }) {
  // ✅ EMPTY STATE (PREVENT CRASH)
  if (!logs.length) {
    return (
      <div className="rounded-xl border p-6 bg-white shadow">
        <h2 className="text-xl font-bold mb-4">Live Logs</h2>
        <p className="text-sm text-gray-500">
          No logs yet. Create a Chaos API and click{" "}
          <b>Test API</b>.
        </p>
      </div>
    );
  }

  // ===== DATA PREP =====
  const successCount = logs.filter((l) => l.status === 200).length;
  const failureCount = logs.filter((l) => l.status !== 200).length;

  const data = {
    labels: ["Success (200)", "Failure (500)"],
    datasets: [
      {
        label: "API Responses",
        data: [successCount, failureCount],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderRadius: 6,
        barThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  };

  return (
    <div className="rounded-xl border p-6 bg-white shadow space-y-6">
      <h2 className="text-xl font-bold">Live Logs</h2>

      {/* 📊 VISUALIZATION */}
      <div className="h-48">
        <Bar data={data} options={options} />
      </div>

      {/* 📋 LOG TABLE */}
      <table className="w-full text-sm">
        <thead className="border-b">
          <tr className="text-left">
            <th className="py-2">Endpoint</th>
            <th>Status</th>
            <th>Latency (ms)</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr
              key={idx}
              className={`border-b ${
                log.status === 200
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              <td className="py-2 font-mono">{log.endpoint}</td>
              <td>{log.status}</td>
              <td>{log.latency}</td>
              <td>{log.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
