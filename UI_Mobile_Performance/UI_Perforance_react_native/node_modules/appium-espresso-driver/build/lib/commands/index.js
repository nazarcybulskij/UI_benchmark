"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("source-map-support/register");

var _execute = _interopRequireDefault(require("./execute"));

var _general = _interopRequireDefault(require("./general"));

let commands = {};
Object.assign(commands, _general.default, _execute.default);
var _default = commands;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjb21tYW5kcyIsIk9iamVjdCIsImFzc2lnbiIsImdlbmVyYWxDbWRzIiwiZXhlY3V0ZUNtZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUEsSUFBSUEsUUFBUSxHQUFHLEVBQWY7QUFDQUMsTUFBTSxDQUFDQyxNQUFQLENBQ0VGLFFBREYsRUFFRUcsZ0JBRkYsRUFHRUMsZ0JBSEY7ZUFPZUosUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleGVjdXRlQ21kcyBmcm9tICcuL2V4ZWN1dGUnO1xuaW1wb3J0IGdlbmVyYWxDbWRzIGZyb20gJy4vZ2VuZXJhbCc7XG5cbmxldCBjb21tYW5kcyA9IHt9O1xuT2JqZWN0LmFzc2lnbihcbiAgY29tbWFuZHMsXG4gIGdlbmVyYWxDbWRzLFxuICBleGVjdXRlQ21kcyxcbiAgLy8gYWRkIG90aGVyIGNvbW1hbmQgdHlwZXMgaGVyZVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY29tbWFuZHM7XG4iXSwiZmlsZSI6ImxpYi9jb21tYW5kcy9pbmRleC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
