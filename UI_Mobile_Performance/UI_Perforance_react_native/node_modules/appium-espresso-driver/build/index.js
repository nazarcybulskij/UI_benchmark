"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.startServer = exports.EspressoDriver = void 0;

require("source-map-support/register");

var _yargs = _interopRequireDefault(require("yargs"));

var _asyncbox = require("asyncbox");

var driver = _interopRequireWildcard(require("./lib/driver"));

var server = _interopRequireWildcard(require("./lib/server"));

const {
  EspressoDriver
} = driver;
exports.EspressoDriver = EspressoDriver;
const {
  startServer
} = server;
exports.startServer = startServer;
const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 4884;

async function main() {
  let port = _yargs.default.argv.port || DEFAULT_PORT;
  let host = _yargs.default.argv.host || DEFAULT_HOST;
  return await startServer(port, host);
}

if (require.main === module) {
  (0, _asyncbox.asyncify)(main);
}

var _default = EspressoDriver;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkVzcHJlc3NvRHJpdmVyIiwiZHJpdmVyIiwic3RhcnRTZXJ2ZXIiLCJzZXJ2ZXIiLCJERUZBVUxUX0hPU1QiLCJERUZBVUxUX1BPUlQiLCJtYWluIiwicG9ydCIsInlhcmdzIiwiYXJndiIsImhvc3QiLCJyZXF1aXJlIiwibW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0EsTUFBTTtBQUFFQSxFQUFBQTtBQUFGLElBQXFCQyxNQUEzQjs7QUFDQSxNQUFNO0FBQUVDLEVBQUFBO0FBQUYsSUFBa0JDLE1BQXhCOztBQUVBLE1BQU1DLFlBQVksR0FBRyxXQUFyQjtBQUNBLE1BQU1DLFlBQVksR0FBRyxJQUFyQjs7QUFFQSxlQUFlQyxJQUFmLEdBQXVCO0FBQ3JCLE1BQUlDLElBQUksR0FBR0MsZUFBTUMsSUFBTixDQUFXRixJQUFYLElBQW1CRixZQUE5QjtBQUNBLE1BQUlLLElBQUksR0FBR0YsZUFBTUMsSUFBTixDQUFXQyxJQUFYLElBQW1CTixZQUE5QjtBQUNBLFNBQU8sTUFBTUYsV0FBVyxDQUFDSyxJQUFELEVBQU9HLElBQVAsQ0FBeEI7QUFDRDs7QUFFRCxJQUFJQyxPQUFPLENBQUNMLElBQVIsS0FBaUJNLE1BQXJCLEVBQTZCO0FBQzNCLDBCQUFTTixJQUFUO0FBQ0Q7O2VBR2NOLGMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0cmFuc3BpbGU6bWFpblxuXG5pbXBvcnQgeWFyZ3MgZnJvbSAneWFyZ3MnO1xuaW1wb3J0IHsgYXN5bmNpZnkgfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgKiBhcyBkcml2ZXIgZnJvbSAnLi9saWIvZHJpdmVyJztcbmltcG9ydCAqIGFzIHNlcnZlciBmcm9tICcuL2xpYi9zZXJ2ZXInO1xuXG5cbmNvbnN0IHsgRXNwcmVzc29Ecml2ZXIgfSA9IGRyaXZlcjtcbmNvbnN0IHsgc3RhcnRTZXJ2ZXIgfSA9IHNlcnZlcjtcblxuY29uc3QgREVGQVVMVF9IT1NUID0gJ2xvY2FsaG9zdCc7XG5jb25zdCBERUZBVUxUX1BPUlQgPSA0ODg0O1xuXG5hc3luYyBmdW5jdGlvbiBtYWluICgpIHtcbiAgbGV0IHBvcnQgPSB5YXJncy5hcmd2LnBvcnQgfHwgREVGQVVMVF9QT1JUO1xuICBsZXQgaG9zdCA9IHlhcmdzLmFyZ3YuaG9zdCB8fCBERUZBVUxUX0hPU1Q7XG4gIHJldHVybiBhd2FpdCBzdGFydFNlcnZlcihwb3J0LCBob3N0KTtcbn1cblxuaWYgKHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlKSB7XG4gIGFzeW5jaWZ5KG1haW4pO1xufVxuXG5leHBvcnQgeyBFc3ByZXNzb0RyaXZlciwgc3RhcnRTZXJ2ZXIgfTtcbmV4cG9ydCBkZWZhdWx0IEVzcHJlc3NvRHJpdmVyO1xuIl0sImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZVJvb3QiOiIuLiJ9
