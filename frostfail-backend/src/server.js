const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); // MUST be before routes

// 🔥 IMPORTANT: mock.routes is now a FUNCTION
require("./routes/mock.routes")(app);

// logs route is still a normal router
app.use("/logs", require("./routes/logs.routes"));

app.get("/", (req, res) => {
  res.send("🔥 FrostFail Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
