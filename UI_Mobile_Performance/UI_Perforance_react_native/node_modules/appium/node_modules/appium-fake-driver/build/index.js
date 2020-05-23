#!/usr/bin/env node
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startServer = exports.FakeDriver = void 0;

require("source-map-support/register");

var _yargs = _interopRequireDefault(require("yargs"));

var _asyncbox = require("asyncbox");

var driver = _interopRequireWildcard(require("./lib/driver"));

var server = _interopRequireWildcard(require("./lib/server"));

const {
  FakeDriver
} = driver;
exports.FakeDriver = FakeDriver;
const {
  startServer
} = server;
exports.startServer = startServer;
const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 4774;

async function main() {
  let port = _yargs.default.argv.port || DEFAULT_PORT;
  let host = _yargs.default.argv.host || DEFAULT_HOST;
  return await startServer(port, host);
}

if (require.main === module) {
  (0, _asyncbox.asyncify)(main);
}require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkZha2VEcml2ZXIiLCJkcml2ZXIiLCJzdGFydFNlcnZlciIsInNlcnZlciIsIkRFRkFVTFRfSE9TVCIsIkRFRkFVTFRfUE9SVCIsIm1haW4iLCJwb3J0IiwieWFyZ3MiLCJhcmd2IiwiaG9zdCIsInJlcXVpcmUiLCJtb2R1bGUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztBQUdBOztBQUNBOztBQUNBOztBQUNBOztBQUdBLE1BQU07QUFBRUEsRUFBQUE7QUFBRixJQUFpQkMsTUFBdkI7O0FBQ0EsTUFBTTtBQUFFQyxFQUFBQTtBQUFGLElBQWtCQyxNQUF4Qjs7QUFFQSxNQUFNQyxZQUFZLEdBQUcsV0FBckI7QUFDQSxNQUFNQyxZQUFZLEdBQUcsSUFBckI7O0FBRUEsZUFBZUMsSUFBZixHQUF1QjtBQUNyQixNQUFJQyxJQUFJLEdBQUdDLGVBQU1DLElBQU4sQ0FBV0YsSUFBWCxJQUFtQkYsWUFBOUI7QUFDQSxNQUFJSyxJQUFJLEdBQUdGLGVBQU1DLElBQU4sQ0FBV0MsSUFBWCxJQUFtQk4sWUFBOUI7QUFDQSxTQUFPLE1BQU1GLFdBQVcsQ0FBQ0ssSUFBRCxFQUFPRyxJQUFQLENBQXhCO0FBQ0Q7O0FBRUQsSUFBSUMsT0FBTyxDQUFDTCxJQUFSLEtBQWlCTSxNQUFyQixFQUE2QjtBQUMzQiwwQkFBU04sSUFBVDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuLy8gdHJhbnNwaWxlOm1haW5cblxuaW1wb3J0IHlhcmdzIGZyb20gJ3lhcmdzJztcbmltcG9ydCB7IGFzeW5jaWZ5IH0gZnJvbSAnYXN5bmNib3gnO1xuaW1wb3J0ICogYXMgZHJpdmVyIGZyb20gJy4vbGliL2RyaXZlcic7XG5pbXBvcnQgKiBhcyBzZXJ2ZXIgZnJvbSAnLi9saWIvc2VydmVyJztcblxuXG5jb25zdCB7IEZha2VEcml2ZXIgfSA9IGRyaXZlcjtcbmNvbnN0IHsgc3RhcnRTZXJ2ZXIgfSA9IHNlcnZlcjtcblxuY29uc3QgREVGQVVMVF9IT1NUID0gJ2xvY2FsaG9zdCc7XG5jb25zdCBERUZBVUxUX1BPUlQgPSA0Nzc0O1xuXG5hc3luYyBmdW5jdGlvbiBtYWluICgpIHtcbiAgbGV0IHBvcnQgPSB5YXJncy5hcmd2LnBvcnQgfHwgREVGQVVMVF9QT1JUO1xuICBsZXQgaG9zdCA9IHlhcmdzLmFyZ3YuaG9zdCB8fCBERUZBVUxUX0hPU1Q7XG4gIHJldHVybiBhd2FpdCBzdGFydFNlcnZlcihwb3J0LCBob3N0KTtcbn1cblxuaWYgKHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlKSB7XG4gIGFzeW5jaWZ5KG1haW4pO1xufVxuXG5leHBvcnQgeyBGYWtlRHJpdmVyLCBzdGFydFNlcnZlciB9O1xuIl0sImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZVJvb3QiOiIuLiJ9
