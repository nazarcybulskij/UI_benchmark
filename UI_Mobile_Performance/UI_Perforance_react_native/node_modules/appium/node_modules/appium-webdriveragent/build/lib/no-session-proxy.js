"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NoSessionProxy = void 0;

require("source-map-support/register");

var _appiumBaseDriver = require("appium-base-driver");

class NoSessionProxy extends _appiumBaseDriver.JWProxy {
  constructor(opts = {}) {
    super(opts);
  }

  getUrlForProxy(url) {
    if (url === '') {
      url = '/';
    }

    const proxyBase = `${this.scheme}://${this.server}:${this.port}${this.base}`;
    let remainingUrl = '';

    if (new RegExp('^/').test(url)) {
      remainingUrl = url;
    } else {
      throw new Error(`Did not know what to do with url '${url}'`);
    }

    remainingUrl = remainingUrl.replace(/\/$/, '');
    return proxyBase + remainingUrl;
  }

}

exports.NoSessionProxy = NoSessionProxy;
var _default = NoSessionProxy;
exports.default = _default;require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9uby1zZXNzaW9uLXByb3h5LmpzIl0sIm5hbWVzIjpbIk5vU2Vzc2lvblByb3h5IiwiSldQcm94eSIsImNvbnN0cnVjdG9yIiwib3B0cyIsImdldFVybEZvclByb3h5IiwidXJsIiwicHJveHlCYXNlIiwic2NoZW1lIiwic2VydmVyIiwicG9ydCIsImJhc2UiLCJyZW1haW5pbmdVcmwiLCJSZWdFeHAiLCJ0ZXN0IiwiRXJyb3IiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFHQSxNQUFNQSxjQUFOLFNBQTZCQyx5QkFBN0IsQ0FBcUM7QUFDbkNDLEVBQUFBLFdBQVcsQ0FBRUMsSUFBSSxHQUFHLEVBQVQsRUFBYTtBQUN0QixVQUFNQSxJQUFOO0FBQ0Q7O0FBRURDLEVBQUFBLGNBQWMsQ0FBRUMsR0FBRixFQUFPO0FBQ25CLFFBQUlBLEdBQUcsS0FBSyxFQUFaLEVBQWdCO0FBQ2RBLE1BQUFBLEdBQUcsR0FBRyxHQUFOO0FBQ0Q7O0FBQ0QsVUFBTUMsU0FBUyxHQUFJLEdBQUUsS0FBS0MsTUFBTyxNQUFLLEtBQUtDLE1BQU8sSUFBRyxLQUFLQyxJQUFLLEdBQUUsS0FBS0MsSUFBSyxFQUEzRTtBQUNBLFFBQUlDLFlBQVksR0FBRyxFQUFuQjs7QUFDQSxRQUFLLElBQUlDLE1BQUosQ0FBVyxJQUFYLENBQUQsQ0FBbUJDLElBQW5CLENBQXdCUixHQUF4QixDQUFKLEVBQWtDO0FBQ2hDTSxNQUFBQSxZQUFZLEdBQUdOLEdBQWY7QUFDRCxLQUZELE1BRU87QUFDTCxZQUFNLElBQUlTLEtBQUosQ0FBVyxxQ0FBb0NULEdBQUksR0FBbkQsQ0FBTjtBQUNEOztBQUNETSxJQUFBQSxZQUFZLEdBQUdBLFlBQVksQ0FBQ0ksT0FBYixDQUFxQixLQUFyQixFQUE0QixFQUE1QixDQUFmO0FBQ0EsV0FBT1QsU0FBUyxHQUFHSyxZQUFuQjtBQUNEOztBQWxCa0M7OztlQXNCdEJYLGMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKV1Byb3h5IH0gZnJvbSAnYXBwaXVtLWJhc2UtZHJpdmVyJztcblxuXG5jbGFzcyBOb1Nlc3Npb25Qcm94eSBleHRlbmRzIEpXUHJveHkge1xuICBjb25zdHJ1Y3RvciAob3B0cyA9IHt9KSB7XG4gICAgc3VwZXIob3B0cyk7XG4gIH1cblxuICBnZXRVcmxGb3JQcm94eSAodXJsKSB7XG4gICAgaWYgKHVybCA9PT0gJycpIHtcbiAgICAgIHVybCA9ICcvJztcbiAgICB9XG4gICAgY29uc3QgcHJveHlCYXNlID0gYCR7dGhpcy5zY2hlbWV9Oi8vJHt0aGlzLnNlcnZlcn06JHt0aGlzLnBvcnR9JHt0aGlzLmJhc2V9YDtcbiAgICBsZXQgcmVtYWluaW5nVXJsID0gJyc7XG4gICAgaWYgKChuZXcgUmVnRXhwKCdeLycpKS50ZXN0KHVybCkpIHtcbiAgICAgIHJlbWFpbmluZ1VybCA9IHVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBEaWQgbm90IGtub3cgd2hhdCB0byBkbyB3aXRoIHVybCAnJHt1cmx9J2ApO1xuICAgIH1cbiAgICByZW1haW5pbmdVcmwgPSByZW1haW5pbmdVcmwucmVwbGFjZSgvXFwvJC8sICcnKTsgLy8gY2FuJ3QgaGF2ZSB0cmFpbGluZyBzbGFzaGVzXG4gICAgcmV0dXJuIHByb3h5QmFzZSArIHJlbWFpbmluZ1VybDtcbiAgfVxufVxuXG5leHBvcnQgeyBOb1Nlc3Npb25Qcm94eSB9O1xuZXhwb3J0IGRlZmF1bHQgTm9TZXNzaW9uUHJveHk7XG4iXSwiZmlsZSI6ImxpYi9uby1zZXNzaW9uLXByb3h5LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uIn0=
