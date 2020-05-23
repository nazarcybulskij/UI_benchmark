"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.commands = void 0;

require("source-map-support/register");

var _logger = _interopRequireDefault(require("../logger"));

var _lodash = _interopRequireDefault(require("lodash"));

var _teen_process = require("teen_process");

var _shellQuote = require("shell-quote");

const ADB_SHELL_FEATURE = 'adb_shell';
let commands = {};
exports.commands = commands;

commands.mobileShell = async function mobileShell(opts = {}) {
  this.ensureFeatureEnabled(ADB_SHELL_FEATURE);
  const {
    command,
    args = [],
    timeout = 20000,
    includeStderr
  } = opts;

  if (!_lodash.default.isString(command)) {
    _logger.default.errorAndThrow(`The 'command' argument is mandatory'`);
  }

  const adbArgs = [...this.adb.executable.defaultArgs, 'shell', command, ...(_lodash.default.isArray(args) ? args : [args])];

  _logger.default.debug(`Running '${this.adb.executable.path} ${(0, _shellQuote.quote)(adbArgs)}'`);

  try {
    const {
      stdout,
      stderr
    } = await (0, _teen_process.exec)(this.adb.executable.path, adbArgs, {
      timeout
    });

    if (includeStderr) {
      return {
        stdout,
        stderr
      };
    }

    return stdout;
  } catch (err) {
    _logger.default.errorAndThrow(`Cannot execute the '${command}' shell command. ` + `Original error: ${err.message}. ` + `StdOut: ${err.stdout}. StdErr: ${err.stderr}`);
  }
};

var _default = commands;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9zaGVsbC5qcyJdLCJuYW1lcyI6WyJBREJfU0hFTExfRkVBVFVSRSIsImNvbW1hbmRzIiwibW9iaWxlU2hlbGwiLCJvcHRzIiwiZW5zdXJlRmVhdHVyZUVuYWJsZWQiLCJjb21tYW5kIiwiYXJncyIsInRpbWVvdXQiLCJpbmNsdWRlU3RkZXJyIiwiXyIsImlzU3RyaW5nIiwibG9nIiwiZXJyb3JBbmRUaHJvdyIsImFkYkFyZ3MiLCJhZGIiLCJleGVjdXRhYmxlIiwiZGVmYXVsdEFyZ3MiLCJpc0FycmF5IiwiZGVidWciLCJwYXRoIiwic3Rkb3V0Iiwic3RkZXJyIiwiZXJyIiwibWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSxNQUFNQSxpQkFBaUIsR0FBRyxXQUExQjtBQUVBLElBQUlDLFFBQVEsR0FBRyxFQUFmOzs7QUFFQUEsUUFBUSxDQUFDQyxXQUFULEdBQXVCLGVBQWVBLFdBQWYsQ0FBNEJDLElBQUksR0FBRyxFQUFuQyxFQUF1QztBQUM1RCxPQUFLQyxvQkFBTCxDQUEwQkosaUJBQTFCO0FBRUEsUUFBTTtBQUNKSyxJQUFBQSxPQURJO0FBRUpDLElBQUFBLElBQUksR0FBRyxFQUZIO0FBR0pDLElBQUFBLE9BQU8sR0FBRyxLQUhOO0FBSUpDLElBQUFBO0FBSkksTUFLRkwsSUFMSjs7QUFPQSxNQUFJLENBQUNNLGdCQUFFQyxRQUFGLENBQVdMLE9BQVgsQ0FBTCxFQUEwQjtBQUN4Qk0sb0JBQUlDLGFBQUosQ0FBbUIsc0NBQW5CO0FBQ0Q7O0FBRUQsUUFBTUMsT0FBTyxHQUFHLENBQ2QsR0FBRyxLQUFLQyxHQUFMLENBQVNDLFVBQVQsQ0FBb0JDLFdBRFQsRUFFZCxPQUZjLEVBR2RYLE9BSGMsRUFJZCxJQUFJSSxnQkFBRVEsT0FBRixDQUFVWCxJQUFWLElBQWtCQSxJQUFsQixHQUF5QixDQUFDQSxJQUFELENBQTdCLENBSmMsQ0FBaEI7O0FBTUFLLGtCQUFJTyxLQUFKLENBQVcsWUFBVyxLQUFLSixHQUFMLENBQVNDLFVBQVQsQ0FBb0JJLElBQUssSUFBRyx1QkFBTU4sT0FBTixDQUFlLEdBQWpFOztBQUNBLE1BQUk7QUFDRixVQUFNO0FBQUNPLE1BQUFBLE1BQUQ7QUFBU0MsTUFBQUE7QUFBVCxRQUFtQixNQUFNLHdCQUFLLEtBQUtQLEdBQUwsQ0FBU0MsVUFBVCxDQUFvQkksSUFBekIsRUFBK0JOLE9BQS9CLEVBQXdDO0FBQUNOLE1BQUFBO0FBQUQsS0FBeEMsQ0FBL0I7O0FBQ0EsUUFBSUMsYUFBSixFQUFtQjtBQUNqQixhQUFPO0FBQ0xZLFFBQUFBLE1BREs7QUFFTEMsUUFBQUE7QUFGSyxPQUFQO0FBSUQ7O0FBQ0QsV0FBT0QsTUFBUDtBQUNELEdBVEQsQ0FTRSxPQUFPRSxHQUFQLEVBQVk7QUFDWlgsb0JBQUlDLGFBQUosQ0FBbUIsdUJBQXNCUCxPQUFRLG1CQUEvQixHQUNDLG1CQUFrQmlCLEdBQUcsQ0FBQ0MsT0FBUSxJQUQvQixHQUVDLFdBQVVELEdBQUcsQ0FBQ0YsTUFBTyxhQUFZRSxHQUFHLENBQUNELE1BQU8sRUFGL0Q7QUFHRDtBQUNGLENBbkNEOztlQXNDZXBCLFEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbG9nIGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5pbXBvcnQgeyBxdW90ZSB9IGZyb20gJ3NoZWxsLXF1b3RlJztcblxuY29uc3QgQURCX1NIRUxMX0ZFQVRVUkUgPSAnYWRiX3NoZWxsJztcblxubGV0IGNvbW1hbmRzID0ge307XG5cbmNvbW1hbmRzLm1vYmlsZVNoZWxsID0gYXN5bmMgZnVuY3Rpb24gbW9iaWxlU2hlbGwgKG9wdHMgPSB7fSkge1xuICB0aGlzLmVuc3VyZUZlYXR1cmVFbmFibGVkKEFEQl9TSEVMTF9GRUFUVVJFKTtcblxuICBjb25zdCB7XG4gICAgY29tbWFuZCxcbiAgICBhcmdzID0gW10sXG4gICAgdGltZW91dCA9IDIwMDAwLFxuICAgIGluY2x1ZGVTdGRlcnIsXG4gIH0gPSBvcHRzO1xuXG4gIGlmICghXy5pc1N0cmluZyhjb21tYW5kKSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBUaGUgJ2NvbW1hbmQnIGFyZ3VtZW50IGlzIG1hbmRhdG9yeSdgKTtcbiAgfVxuXG4gIGNvbnN0IGFkYkFyZ3MgPSBbXG4gICAgLi4udGhpcy5hZGIuZXhlY3V0YWJsZS5kZWZhdWx0QXJncyxcbiAgICAnc2hlbGwnLFxuICAgIGNvbW1hbmQsXG4gICAgLi4uKF8uaXNBcnJheShhcmdzKSA/IGFyZ3MgOiBbYXJnc10pXG4gIF07XG4gIGxvZy5kZWJ1ZyhgUnVubmluZyAnJHt0aGlzLmFkYi5leGVjdXRhYmxlLnBhdGh9ICR7cXVvdGUoYWRiQXJncyl9J2ApO1xuICB0cnkge1xuICAgIGNvbnN0IHtzdGRvdXQsIHN0ZGVycn0gPSBhd2FpdCBleGVjKHRoaXMuYWRiLmV4ZWN1dGFibGUucGF0aCwgYWRiQXJncywge3RpbWVvdXR9KTtcbiAgICBpZiAoaW5jbHVkZVN0ZGVycikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3Rkb3V0LFxuICAgICAgICBzdGRlcnJcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBzdGRvdXQ7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBDYW5ub3QgZXhlY3V0ZSB0aGUgJyR7Y29tbWFuZH0nIHNoZWxsIGNvbW1hbmQuIGAgK1xuICAgICAgICAgICAgICAgICAgICAgIGBPcmlnaW5hbCBlcnJvcjogJHtlcnIubWVzc2FnZX0uIGAgK1xuICAgICAgICAgICAgICAgICAgICAgIGBTdGRPdXQ6ICR7ZXJyLnN0ZG91dH0uIFN0ZEVycjogJHtlcnIuc3RkZXJyfWApO1xuICB9XG59O1xuXG5leHBvcnQgeyBjb21tYW5kcyB9O1xuZXhwb3J0IGRlZmF1bHQgY29tbWFuZHM7XG4iXSwiZmlsZSI6ImxpYi9jb21tYW5kcy9zaGVsbC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
