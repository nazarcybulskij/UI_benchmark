"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("source-map-support/register");

var _alert = _interopRequireDefault(require("./alert"));

var _find = _interopRequireDefault(require("./find"));

var _general = _interopRequireDefault(require("./general"));

var _touch = _interopRequireDefault(require("./touch"));

var _element = _interopRequireDefault(require("./element"));

var _actions = _interopRequireDefault(require("./actions"));

var _viewport = _interopRequireDefault(require("./viewport"));

var _screenshot = _interopRequireDefault(require("./screenshot"));

var _battery = _interopRequireDefault(require("./battery"));

let commands = {};
Object.assign(commands, _alert.default, _find.default, _general.default, _touch.default, _actions.default, _element.default, _viewport.default, _screenshot.default, _battery.default);
var _default = commands;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjb21tYW5kcyIsIk9iamVjdCIsImFzc2lnbiIsImFsZXJ0Q21kcyIsImZpbmRDbWRzIiwiZ2VuZXJhbENtZHMiLCJ0b3VjaENtZHMiLCJhY3Rpb25zQ21kcyIsImVsZW1lbnRDbWRzIiwidmlld3BvcnRDbWRzIiwic2NyZWVuc2hvdENtZHMiLCJiYXR0ZXJ5Q21kcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSxJQUFJQSxRQUFRLEdBQUcsRUFBZjtBQUNBQyxNQUFNLENBQUNDLE1BQVAsQ0FDRUYsUUFERixFQUVFRyxjQUZGLEVBR0VDLGFBSEYsRUFJRUMsZ0JBSkYsRUFLRUMsY0FMRixFQU1FQyxnQkFORixFQU9FQyxnQkFQRixFQVFFQyxpQkFSRixFQVNFQyxtQkFURixFQVVFQyxnQkFWRjtlQWNlWCxRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFsZXJ0Q21kcyBmcm9tICcuL2FsZXJ0JztcbmltcG9ydCBmaW5kQ21kcyBmcm9tICcuL2ZpbmQnO1xuaW1wb3J0IGdlbmVyYWxDbWRzIGZyb20gJy4vZ2VuZXJhbCc7XG5pbXBvcnQgdG91Y2hDbWRzIGZyb20gJy4vdG91Y2gnO1xuaW1wb3J0IGVsZW1lbnRDbWRzIGZyb20gJy4vZWxlbWVudCc7XG5pbXBvcnQgYWN0aW9uc0NtZHMgZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCB2aWV3cG9ydENtZHMgZnJvbSAnLi92aWV3cG9ydCc7XG5pbXBvcnQgc2NyZWVuc2hvdENtZHMgZnJvbSAnLi9zY3JlZW5zaG90JztcbmltcG9ydCBiYXR0ZXJ5Q21kcyBmcm9tICcuL2JhdHRlcnknO1xuXG5sZXQgY29tbWFuZHMgPSB7fTtcbk9iamVjdC5hc3NpZ24oXG4gIGNvbW1hbmRzLFxuICBhbGVydENtZHMsXG4gIGZpbmRDbWRzLFxuICBnZW5lcmFsQ21kcyxcbiAgdG91Y2hDbWRzLFxuICBhY3Rpb25zQ21kcyxcbiAgZWxlbWVudENtZHMsXG4gIHZpZXdwb3J0Q21kcyxcbiAgc2NyZWVuc2hvdENtZHMsXG4gIGJhdHRlcnlDbWRzLFxuICAvLyBhZGQgb3RoZXIgY29tbWFuZCB0eXBlcyBoZXJlXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBjb21tYW5kcztcblxuIl0sImZpbGUiOiJsaWIvY29tbWFuZHMvaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4ifQ==
