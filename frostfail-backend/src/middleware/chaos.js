const delay = require("../utils/delay");
const logs = require("../store/logs");

const chaosMiddleware = (config) => {
  return async (req, res) => {
    const start = Date.now();
    const randomFail = Math.random() < config.errorProbability;

    if (randomFail) {
      const latency = Math.floor(
        Math.random() * (config.maxDelay - config.minDelay) +
        config.minDelay
      );

      await delay(latency);

      logs.push({
        endpoint: config.path,
        status: 500,
        latency,
        time: new Date().toISOString(),
      });

      return res.status(500).json({ error: "Injected Chaos Failure" });
    }

    const latency = Math.floor(
      Math.random() * (config.maxDelay - config.minDelay) +
      config.minDelay
    );

    await delay(latency);

    logs.push({
      endpoint: config.path,
      status: 200,
      latency,
      time: new Date().toISOString(),
    });

    return res.json(config.response);
  };
};

module.exports = chaosMiddleware;
