"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("source-map-support/register");

var _session = _interopRequireDefault(require("./session"));

var _settings = _interopRequireDefault(require("./settings"));

var _timeout = _interopRequireDefault(require("./timeout"));

var _find = _interopRequireDefault(require("./find"));

var _log = _interopRequireDefault(require("./log"));

var _images = _interopRequireDefault(require("./images"));

var _execute = _interopRequireDefault(require("./execute"));

var _event = _interopRequireDefault(require("./event"));

let commands = {};
Object.assign(commands, _session.default, _settings.default, _timeout.default, _find.default, _log.default, _images.default, _execute.default, _event.default);
var _default = commands;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9iYXNlZHJpdmVyL2NvbW1hbmRzL2luZGV4LmpzIl0sIm5hbWVzIjpbImNvbW1hbmRzIiwiT2JqZWN0IiwiYXNzaWduIiwic2Vzc2lvbkNtZHMiLCJzZXR0aW5nc0NtZHMiLCJ0aW1lb3V0Q21kcyIsImZpbmRDbWRzIiwibG9nQ21kcyIsImltYWdlc0NtZHMiLCJleGVjdXRlQ21kcyIsImV2ZW50Q21kcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQSxJQUFJQSxRQUFRLEdBQUcsRUFBZjtBQUVBQyxNQUFNLENBQUNDLE1BQVAsQ0FDRUYsUUFERixFQUVFRyxnQkFGRixFQUdFQyxpQkFIRixFQUlFQyxnQkFKRixFQUtFQyxhQUxGLEVBTUVDLFlBTkYsRUFPRUMsZUFQRixFQVFFQyxnQkFSRixFQVNFQyxjQVRGO2VBYWVWLFEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2Vzc2lvbkNtZHMgZnJvbSAnLi9zZXNzaW9uJztcbmltcG9ydCBzZXR0aW5nc0NtZHMgZnJvbSAnLi9zZXR0aW5ncyc7XG5pbXBvcnQgdGltZW91dENtZHMgZnJvbSAnLi90aW1lb3V0JztcbmltcG9ydCBmaW5kQ21kcyBmcm9tICcuL2ZpbmQnO1xuaW1wb3J0IGxvZ0NtZHMgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IGltYWdlc0NtZHMgZnJvbSAnLi9pbWFnZXMnO1xuaW1wb3J0IGV4ZWN1dGVDbWRzIGZyb20gJy4vZXhlY3V0ZSc7XG5pbXBvcnQgZXZlbnRDbWRzIGZyb20gJy4vZXZlbnQnO1xuXG5cbmxldCBjb21tYW5kcyA9IHt9O1xuXG5PYmplY3QuYXNzaWduKFxuICBjb21tYW5kcyxcbiAgc2Vzc2lvbkNtZHMsXG4gIHNldHRpbmdzQ21kcyxcbiAgdGltZW91dENtZHMsXG4gIGZpbmRDbWRzLFxuICBsb2dDbWRzLFxuICBpbWFnZXNDbWRzLFxuICBleGVjdXRlQ21kcyxcbiAgZXZlbnRDbWRzLFxuICAvLyBhZGQgb3RoZXIgY29tbWFuZCB0eXBlcyBoZXJlXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBjb21tYW5kcztcbiJdLCJmaWxlIjoibGliL2Jhc2Vkcml2ZXIvY29tbWFuZHMvaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4ifQ==
