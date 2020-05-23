"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startServer = startServer;

require("source-map-support/register");

var _logger = _interopRequireDefault(require("./logger"));

var _appiumBaseDriver = require("appium-base-driver");

var _driver = require("./driver");

async function startServer(port, hostname) {
  const d = new _driver.FakeDriver();
  const server = await (0, _appiumBaseDriver.server)({
    routeConfiguringFunction: (0, _appiumBaseDriver.routeConfiguringFunction)(d),
    port,
    hostname
  });

  _logger.default.info(`FakeDriver server listening on http://${hostname}:${port}`);

  return server;
}require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9zZXJ2ZXIuanMiXSwibmFtZXMiOlsic3RhcnRTZXJ2ZXIiLCJwb3J0IiwiaG9zdG5hbWUiLCJkIiwiRmFrZURyaXZlciIsInNlcnZlciIsInJvdXRlQ29uZmlndXJpbmdGdW5jdGlvbiIsImxvZyIsImluZm8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBR0EsZUFBZUEsV0FBZixDQUE0QkMsSUFBNUIsRUFBa0NDLFFBQWxDLEVBQTRDO0FBQzFDLFFBQU1DLENBQUMsR0FBRyxJQUFJQyxrQkFBSixFQUFWO0FBQ0EsUUFBTUMsTUFBTSxHQUFHLE1BQU0sOEJBQVc7QUFDOUJDLElBQUFBLHdCQUF3QixFQUFFLGdEQUF5QkgsQ0FBekIsQ0FESTtBQUU5QkYsSUFBQUEsSUFGOEI7QUFHOUJDLElBQUFBO0FBSDhCLEdBQVgsQ0FBckI7O0FBS0FLLGtCQUFJQyxJQUFKLENBQVUseUNBQXdDTixRQUFTLElBQUdELElBQUssRUFBbkU7O0FBQ0EsU0FBT0ksTUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgeyBzZXJ2ZXIgYXMgYmFzZVNlcnZlciwgcm91dGVDb25maWd1cmluZ0Z1bmN0aW9uIH0gZnJvbSAnYXBwaXVtLWJhc2UtZHJpdmVyJztcbmltcG9ydCB7IEZha2VEcml2ZXIgfSBmcm9tICcuL2RyaXZlcic7XG5cblxuYXN5bmMgZnVuY3Rpb24gc3RhcnRTZXJ2ZXIgKHBvcnQsIGhvc3RuYW1lKSB7XG4gIGNvbnN0IGQgPSBuZXcgRmFrZURyaXZlcigpO1xuICBjb25zdCBzZXJ2ZXIgPSBhd2FpdCBiYXNlU2VydmVyKHtcbiAgICByb3V0ZUNvbmZpZ3VyaW5nRnVuY3Rpb246IHJvdXRlQ29uZmlndXJpbmdGdW5jdGlvbihkKSxcbiAgICBwb3J0LFxuICAgIGhvc3RuYW1lLFxuICB9KTtcbiAgbG9nLmluZm8oYEZha2VEcml2ZXIgc2VydmVyIGxpc3RlbmluZyBvbiBodHRwOi8vJHtob3N0bmFtZX06JHtwb3J0fWApO1xuICByZXR1cm4gc2VydmVyO1xufVxuXG5leHBvcnQgeyBzdGFydFNlcnZlciB9O1xuIl0sImZpbGUiOiJsaWIvc2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uIn0=
