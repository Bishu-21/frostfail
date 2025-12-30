# ⚡ FrostFail  
### Visual API Chaos Testing Platform

FrostFail is a **developer-focused chaos engineering tool** that helps teams simulate real-world API failures **before production**.  
It allows you to inject latency, errors, and instability into mock API endpoints and **observe system behavior in real time**.

Built for **developers, testers, and reliability engineers**.

---

## 🚀 Features

- 🔧 **Create Chaos APIs**
  - Define API paths
  - Control error probability
  - Inject configurable latency ranges

- 📊 **Live Request Logs**
  - Real-time visibility into API behavior
  - Status, latency, and timestamps
  - Color-coded success and failure states

- 📉 **FrostFail Status Bar**
  - Visual success vs failure indicator
  - Instant system health snapshot

- ▶ **Test API Instantly**
  - Trigger requests directly from the dashboard
  - Observe chaos effects immediately

- 📎 **Copy & cURL Support**
  - Use endpoints directly in client apps
  - Generate cURL commands instantly

---

## 🧠 Why FrostFail?

In real production environments:
- APIs fail
- Latency spikes
- Downstream services break

**FrostFail lets you simulate these failures safely** — so you can:
- Test retries
- Validate fallbacks
- Improve system resilience
- Avoid surprises in production

---

## 🏗️ Architecture Overview

```

Frontend (React + Vite + Tailwind)
↓
Backend (Node.js + Express)
↓
In-Memory Chaos Engine

```

- Frontend handles configuration & visualization  
- Backend dynamically injects chaos  
- Logs are captured and streamed in real time  

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Chart.js (v4)

### Backend
- Node.js
- Express.js
- In-memory datastore (lightweight & fast)

---

## 📂 Project Structure

```

frostfail/
├── frostfail-backend/
│   ├── routes/
│   ├── store/
│   └── server.js
│
├── frostfail-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateMock.jsx
│   │   │   ├── LogsTable.jsx
│   │   │   └── FrostFailBar.jsx
│   │   ├── api/
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md

````

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/frostfail.git
cd frostfail
````

---

### 2️⃣ Start the Backend

```bash
cd frostfail-backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

### 3️⃣ Start the Frontend

```bash
cd ../frostfail-frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🧪 How to Use

1. Enter an API path (e.g. `/api/test`)
2. Set error probability (Stable → Chaos)
3. Configure min & max latency
4. Click **Create Chaos API**
5. Click **Test API**
6. Observe:

   * Live logs
   * Latency
   * Success/failure ratio

---

## 📈 Example Use Cases

* Test retry logic
* Validate circuit breakers
* Simulate flaky downstream services
* Stress test frontend error handling
* Teach chaos engineering concepts

---

## 🎯 Design Philosophy

* Logs are the **source of truth**
* Visualizations are **subtle guidance**
* Calm UI, even under failure
* Built like a real internal developer tool

Inspired by:

* Datadog
* Postman
* GitHub Actions
* AWS Console

---

## 🚧 Current Limitations

* In-memory data (resets on restart)
* Single endpoint focus
* No authentication (by design)

---

## 🛣️ Future Enhancements

* Persistent storage (Redis / DB)
* Multi-endpoint chaos profiles
* Latency trend charts
* Auth & team workspaces
* Deployment integrations

---

## 👨‍💻 Author

Built with focus, iteration, and resilience by **Bishal and Sriny**.

---

## 📜 License

MIT License
Free to use, modify, and build upon.

```
```
