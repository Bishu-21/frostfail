const chaosMiddleware = require("../middleware/chaos");
const mockStore = require("../store/mocks");

module.exports = function (app) {
  app.post("/mock/create", (req, res) => {
    const {
      path,
      method,
      response,
      errorProbability,
      minDelay,
      maxDelay,
    } = req.body;

    if (!path || !method) {
      return res.status(400).json({ error: "Invalid config" });
    }

    const config = {
      path,
      method: method.toUpperCase(),
      response,
      errorProbability,
      minDelay,
      maxDelay,
    };

    // Save / overwrite config
    mockStore[path] = config;

    // ✅ SAFE route cleanup
    if (app._router && app._router.stack) {
      app._router.stack = app._router.stack.filter(
        (layer) =>
          !(
            layer.route &&
            layer.route.path === path &&
            layer.route.methods[method.toLowerCase()]
          )
      );
    }

    // Register new route with updated chaos config
    app[method.toLowerCase()](path, chaosMiddleware(config));

    res.json({
      message: "Chaos API created / updated",
      endpoint: path,
    });
  });
};
