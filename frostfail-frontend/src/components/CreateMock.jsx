import { useState } from "react";
import { createMock } from "../api/frostfail";
export default function CreateMock({ onTest }) {
  // ===== CORE STATE =====
  const [path, setPath] = useState("/api/test");
  const [errorProbability, setErrorProbability] = useState(0.5);
  const [minDelay, setMinDelay] = useState(500);
  const [maxDelay, setMaxDelay] = useState(2000);
  const [endpoint, setEndpoint] = useState("");

  // ===== POLISH STATE =====
  const [lastTested, setLastTested] = useState(null);
  const [testCount, setTestCount] = useState(0);
  const [justCreated, setJustCreated] = useState(false);

  // ===== CREATE / UPDATE CHAOS API =====
  const handleCreate = async () => {
    const payload = {
      path,
      method: "GET",
      response: { message: "FrostFail chaos working" },
      errorProbability: Number(errorProbability),
      minDelay: Number(minDelay),
      maxDelay: Number(maxDelay),
    };

    const res = await createMock(payload);

    // Reset UI state to reflect new deployment
    setEndpoint(`${API_BASE}${res.data.endpoint}`);
    setLastTested(null);
    setTestCount(0);
    setJustCreated(true);

    // Remove "Updated" indicator after 1.5s
    setTimeout(() => setJustCreated(false), 1500);
  };

  // ===== TEST CHAOS API =====
  const testEndpoint = async () => {
    if (!endpoint) return;

    try {
      await fetch(endpoint);
    } catch (err) {
      // chaos failures expected
    } finally {
      setLastTested(new Date());
      setTestCount((prev) => prev + 1);
      onTest && onTest(); // 🔥 fetch logs again
    }
  };


  return (
    <div className="bg-white rounded-xl border p-6 shadow space-y-6">
      {/* HEADER */}
      <h2 className="text-xl font-bold flex items-center gap-2">
        ⚡ Create Mock API
      </h2>

      {/* API PATH */}
      <div className="space-y-1">
        <label className="font-medium">API Path</label>
        <input
          className="w-full border rounded p-3 font-mono"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
      </div>

      {/* ERROR PROBABILITY */}
      <div className="space-y-2 bg-gray-50 p-4 rounded border">
        <div className="flex justify-between">
          <label className="font-medium">Error Probability</label>
          <span className="text-sm text-blue-600">
            {Number(errorProbability).toFixed(2)}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={errorProbability}
          onChange={(e) => setErrorProbability(e.target.value)}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-gray-500">
          <span>Stable (0.0)</span>
          <span>Chaos (1.0)</span>
        </div>

        <p className="text-xs text-gray-500">
          Higher values increase failure frequency
        </p>
      </div>

      {/* LATENCY */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-medium">Min Latency (ms)</label>
          <input
            type="number"
            className="w-full border rounded p-3 font-mono"
            value={minDelay}
            onChange={(e) => setMinDelay(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Max Latency (ms)</label>
          <input
            type="number"
            className="w-full border rounded p-3 font-mono"
            value={maxDelay}
            onChange={(e) => setMaxDelay(e.target.value)}
          />
        </div>
      </div>

      {/* CREATE BUTTON */}
      <button
        onClick={handleCreate}
        className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white py-3 rounded font-semibold transition"
      >
        ⚡ Create Chaos API
      </button>

      {/* ACTIVE ENDPOINT */}
      {endpoint && (
        <div className="pt-4 border-t space-y-3">
          <p className="text-xs font-bold text-gray-500 flex items-center gap-2">
            ACTIVE ENDPOINT
            {justCreated && (
              <span className="text-green-600 font-semibold">
                • Updated
              </span>
            )}
          </p>

          <div className="flex items-center gap-2 bg-black rounded p-3">
            <code className="flex-1 text-xs text-blue-400 truncate">
              {endpoint}
            </code>
            <button
              onClick={() => navigator.clipboard.writeText(endpoint)}
              className="text-white hover:opacity-80"
              title="Copy"
            >
              📋
            </button>
          </div>

          {/* STATUS INFO */}
          <div className="flex justify-between text-xs text-gray-600">
            <span>
              Last tested:{" "}
              {lastTested
                ? lastTested.toLocaleTimeString()
                : "Not tested yet"}
            </span>
            <span>Tests run: {testCount}</span>
          </div>

          {/* TEST BUTTON */}
          <button
            onClick={testEndpoint}
            disabled={!endpoint}
            className={`w-full py-2 rounded font-semibold transition ${endpoint
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            ▶ Test API
          </button>
        </div>
      )}
    </div>
  );
}
