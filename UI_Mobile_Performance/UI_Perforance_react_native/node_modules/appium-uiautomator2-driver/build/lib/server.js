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

async function startServer(port = 4884, host = 'localhost') {
  let d = new _driver.default({
    port,
    host
  });
  let routeConfiguringFunction = (0, _appiumBaseDriver.routeConfiguringFunction)(d);
  let server = (0, _appiumBaseDriver.server)({
    routeConfiguringFunction,
    port,
    hostname: host
  });

  _logger.default.info(`Android Uiautomator2 server listening on http://${host}:${port}`);

  d.server = server;
  return await server;
}

var _default = startServer;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9zZXJ2ZXIuanMiXSwibmFtZXMiOlsic3RhcnRTZXJ2ZXIiLCJwb3J0IiwiaG9zdCIsImQiLCJBbmRyb2lkVWlhdXRvbWF0b3IyRHJpdmVyIiwicm91dGVDb25maWd1cmluZ0Z1bmN0aW9uIiwic2VydmVyIiwiaG9zdG5hbWUiLCJsb2ciLCJpbmZvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFHQSxlQUFlQSxXQUFmLENBQTRCQyxJQUFJLEdBQUcsSUFBbkMsRUFBeUNDLElBQUksR0FBRyxXQUFoRCxFQUE2RDtBQUMzRCxNQUFJQyxDQUFDLEdBQUcsSUFBSUMsZUFBSixDQUE4QjtBQUFDSCxJQUFBQSxJQUFEO0FBQU9DLElBQUFBO0FBQVAsR0FBOUIsQ0FBUjtBQUNBLE1BQUlHLHdCQUF3QixHQUFHLGdEQUFXRixDQUFYLENBQS9CO0FBQ0EsTUFBSUcsTUFBTSxHQUFHLDhCQUFXO0FBQUNELElBQUFBLHdCQUFEO0FBQTJCSixJQUFBQSxJQUEzQjtBQUFpQ00sSUFBQUEsUUFBUSxFQUFFTDtBQUEzQyxHQUFYLENBQWI7O0FBQ0FNLGtCQUFJQyxJQUFKLENBQVUsbURBQWtEUCxJQUFLLElBQUdELElBQUssRUFBekU7O0FBQ0FFLEVBQUFBLENBQUMsQ0FBQ0csTUFBRixHQUFXQSxNQUFYO0FBQ0EsU0FBTyxNQUFNQSxNQUFiO0FBQ0Q7O2VBR2NOLFciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IHNlcnZlciBhcyBiYXNlU2VydmVyLCByb3V0ZUNvbmZpZ3VyaW5nRnVuY3Rpb24gYXMgbWFrZVJvdXRlciB9IGZyb20gJ2FwcGl1bS1iYXNlLWRyaXZlcic7XG5pbXBvcnQgQW5kcm9pZFVpYXV0b21hdG9yMkRyaXZlciBmcm9tICcuL2RyaXZlcic7XG5cblxuYXN5bmMgZnVuY3Rpb24gc3RhcnRTZXJ2ZXIgKHBvcnQgPSA0ODg0LCBob3N0ID0gJ2xvY2FsaG9zdCcpIHtcbiAgbGV0IGQgPSBuZXcgQW5kcm9pZFVpYXV0b21hdG9yMkRyaXZlcih7cG9ydCwgaG9zdH0pO1xuICBsZXQgcm91dGVDb25maWd1cmluZ0Z1bmN0aW9uID0gbWFrZVJvdXRlcihkKTtcbiAgbGV0IHNlcnZlciA9IGJhc2VTZXJ2ZXIoe3JvdXRlQ29uZmlndXJpbmdGdW5jdGlvbiwgcG9ydCwgaG9zdG5hbWU6IGhvc3R9KTtcbiAgbG9nLmluZm8oYEFuZHJvaWQgVWlhdXRvbWF0b3IyIHNlcnZlciBsaXN0ZW5pbmcgb24gaHR0cDovLyR7aG9zdH06JHtwb3J0fWApO1xuICBkLnNlcnZlciA9IHNlcnZlcjtcbiAgcmV0dXJuIGF3YWl0IHNlcnZlcjtcbn1cblxuZXhwb3J0IHsgc3RhcnRTZXJ2ZXIgfTtcbmV4cG9ydCBkZWZhdWx0IHN0YXJ0U2VydmVyO1xuIl0sImZpbGUiOiJsaWIvc2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uIn0=
