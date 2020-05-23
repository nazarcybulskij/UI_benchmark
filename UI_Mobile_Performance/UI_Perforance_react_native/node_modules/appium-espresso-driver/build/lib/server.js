"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startServer = startServer;
exports.default = void 0;

require("source-map-support/register");

var _logger = _interopRequireDefault(require("./logger"));

var _appiumBaseDriver = require("appium-base-driver");

var _driver = _interopRequireDefault(require("./driver"));

async function startServer(port, host) {
  const d = new _driver.default({
    port,
    host
  });
  const server = (0, _appiumBaseDriver.server)({
    routeConfiguringFunction: (0, _appiumBaseDriver.routeConfiguringFunction)(d),
    port,
    hostname: host
  });

  _logger.default.info(`Android Espresso Driver listening on http://${host}:${port}`);

  return await server;
}

var _default = startServer;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9zZXJ2ZXIuanMiXSwibmFtZXMiOlsic3RhcnRTZXJ2ZXIiLCJwb3J0IiwiaG9zdCIsImQiLCJFc3ByZXNzb0RyaXZlciIsInNlcnZlciIsInJvdXRlQ29uZmlndXJpbmdGdW5jdGlvbiIsImhvc3RuYW1lIiwibG9nIiwiaW5mbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBR0EsZUFBZUEsV0FBZixDQUE0QkMsSUFBNUIsRUFBa0NDLElBQWxDLEVBQXdDO0FBQ3RDLFFBQU1DLENBQUMsR0FBRyxJQUFJQyxlQUFKLENBQW1CO0FBQUNILElBQUFBLElBQUQ7QUFBT0MsSUFBQUE7QUFBUCxHQUFuQixDQUFWO0FBQ0EsUUFBTUcsTUFBTSxHQUFHLDhCQUFXO0FBQ3hCQyxJQUFBQSx3QkFBd0IsRUFBRSxnREFBeUJILENBQXpCLENBREY7QUFFeEJGLElBQUFBLElBRndCO0FBR3hCTSxJQUFBQSxRQUFRLEVBQUVMO0FBSGMsR0FBWCxDQUFmOztBQUtBTSxrQkFBSUMsSUFBSixDQUFVLCtDQUE4Q1AsSUFBSyxJQUFHRCxJQUFLLEVBQXJFOztBQUNBLFNBQU8sTUFBTUksTUFBYjtBQUNEOztlQUdjTCxXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyBzZXJ2ZXIgYXMgYmFzZVNlcnZlciwgcm91dGVDb25maWd1cmluZ0Z1bmN0aW9uIH0gZnJvbSAnYXBwaXVtLWJhc2UtZHJpdmVyJztcbmltcG9ydCBFc3ByZXNzb0RyaXZlciBmcm9tICcuL2RyaXZlcic7XG5cblxuYXN5bmMgZnVuY3Rpb24gc3RhcnRTZXJ2ZXIgKHBvcnQsIGhvc3QpIHtcbiAgY29uc3QgZCA9IG5ldyBFc3ByZXNzb0RyaXZlcih7cG9ydCwgaG9zdH0pO1xuICBjb25zdCBzZXJ2ZXIgPSBiYXNlU2VydmVyKHtcbiAgICByb3V0ZUNvbmZpZ3VyaW5nRnVuY3Rpb246IHJvdXRlQ29uZmlndXJpbmdGdW5jdGlvbihkKSxcbiAgICBwb3J0LFxuICAgIGhvc3RuYW1lOiBob3N0LFxuICB9KTtcbiAgbG9nLmluZm8oYEFuZHJvaWQgRXNwcmVzc28gRHJpdmVyIGxpc3RlbmluZyBvbiBodHRwOi8vJHtob3N0fToke3BvcnR9YCk7XG4gIHJldHVybiBhd2FpdCBzZXJ2ZXI7XG59XG5cbmV4cG9ydCB7IHN0YXJ0U2VydmVyIH07XG5leHBvcnQgZGVmYXVsdCBzdGFydFNlcnZlcjtcbiJdLCJmaWxlIjoibGliL3NlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLiJ9
