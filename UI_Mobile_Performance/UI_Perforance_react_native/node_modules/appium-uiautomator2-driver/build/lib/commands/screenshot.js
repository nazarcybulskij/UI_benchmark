"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("source-map-support/register");

var _logger = _interopRequireDefault(require("../logger"));

let commands = {};

commands.getScreenshot = async function () {
  if (this.mjpegStream) {
    const data = await this.mjpegStream.lastChunkPNGBase64();

    if (data) {
      return data;
    }

    _logger.default.warn('Tried to get screenshot from active MJPEG stream, but there ' + 'was no data yet. Falling back to regular screenshot methods.');
  }

  return await this.uiautomator2.jwproxy.command('/screenshot', 'GET');
};

var _default = commands;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9zY3JlZW5zaG90LmpzIl0sIm5hbWVzIjpbImNvbW1hbmRzIiwiZ2V0U2NyZWVuc2hvdCIsIm1qcGVnU3RyZWFtIiwiZGF0YSIsImxhc3RDaHVua1BOR0Jhc2U2NCIsImxvZ2dlciIsIndhcm4iLCJ1aWF1dG9tYXRvcjIiLCJqd3Byb3h5IiwiY29tbWFuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQSxJQUFJQSxRQUFRLEdBQUcsRUFBZjs7QUFFQUEsUUFBUSxDQUFDQyxhQUFULEdBQXlCLGtCQUFrQjtBQUN6QyxNQUFJLEtBQUtDLFdBQVQsRUFBc0I7QUFDcEIsVUFBTUMsSUFBSSxHQUFHLE1BQU0sS0FBS0QsV0FBTCxDQUFpQkUsa0JBQWpCLEVBQW5COztBQUNBLFFBQUlELElBQUosRUFBVTtBQUNSLGFBQU9BLElBQVA7QUFDRDs7QUFDREUsb0JBQU9DLElBQVAsQ0FBWSxpRUFDQSw4REFEWjtBQUVEOztBQUNELFNBQU8sTUFBTSxLQUFLQyxZQUFMLENBQWtCQyxPQUFsQixDQUEwQkMsT0FBMUIsQ0FBa0MsYUFBbEMsRUFBaUQsS0FBakQsQ0FBYjtBQUNELENBVkQ7O2VBWWVULFEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbG9nZ2VyIGZyb20gJy4uL2xvZ2dlcic7XG5cbmxldCBjb21tYW5kcyA9IHt9O1xuXG5jb21tYW5kcy5nZXRTY3JlZW5zaG90ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5tanBlZ1N0cmVhbSkge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLm1qcGVnU3RyZWFtLmxhc3RDaHVua1BOR0Jhc2U2NCgpO1xuICAgIGlmIChkYXRhKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgbG9nZ2VyLndhcm4oJ1RyaWVkIHRvIGdldCBzY3JlZW5zaG90IGZyb20gYWN0aXZlIE1KUEVHIHN0cmVhbSwgYnV0IHRoZXJlICcgK1xuICAgICAgICAgICAgICAgICd3YXMgbm8gZGF0YSB5ZXQuIEZhbGxpbmcgYmFjayB0byByZWd1bGFyIHNjcmVlbnNob3QgbWV0aG9kcy4nKTtcbiAgfVxuICByZXR1cm4gYXdhaXQgdGhpcy51aWF1dG9tYXRvcjIuandwcm94eS5jb21tYW5kKCcvc2NyZWVuc2hvdCcsICdHRVQnKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbW1hbmRzO1xuIl0sImZpbGUiOiJsaWIvY29tbWFuZHMvc2NyZWVuc2hvdC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
