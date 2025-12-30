const express = require("express");
const router = express.Router();
const logs = require("../store/logs");

router.get("/", (req, res) => {
  res.json(logs.slice(-50).reverse()); // latest first
});

module.exports = router;
