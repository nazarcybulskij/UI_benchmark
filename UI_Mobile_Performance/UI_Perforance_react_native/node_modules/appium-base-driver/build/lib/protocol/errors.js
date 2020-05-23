"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isErrorType = isErrorType;
exports.isUnknownError = isUnknownError;
exports.errorFromMJSONWPStatusCode = errorFromMJSONWPStatusCode;
exports.errorFromW3CJsonCode = errorFromW3CJsonCode;
exports.getResponseForW3CError = getResponseForW3CError;
exports.getResponseForJsonwpError = getResponseForJsonwpError;
exports.errors = exports.ProtocolError = void 0;

require("source-map-support/register");

var _es6Error = _interopRequireDefault(require("es6-error"));

var _lodash = _interopRequireDefault(require("lodash"));

var _appiumSupport = require("appium-support");

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

const mjsonwpLog = _appiumSupport.logger.getLogger('MJSONWP');

const w3cLog = _appiumSupport.logger.getLogger('W3C');

const W3C_UNKNOWN_ERROR = 'unknown error';

class ProtocolError extends _es6Error.default {
  constructor(msg, jsonwpCode, w3cStatus, error) {
    super(msg);
    this.jsonwpCode = jsonwpCode;
    this.error = error || W3C_UNKNOWN_ERROR;

    if (this.jsonwpCode === null) {
      this.jsonwpCode = 13;
    }

    this.w3cStatus = w3cStatus || _httpStatusCodes.default.BAD_REQUEST;
    this._stacktrace = null;
  }

  get stacktrace() {
    return this._stacktrace || this.stack;
  }

  set stacktrace(value) {
    this._stacktrace = value;
  }

}

exports.ProtocolError = ProtocolError;

class NoSuchDriverError extends ProtocolError {
  static code() {
    return 6;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.NOT_FOUND;
  }

  static error() {
    return 'invalid session id';
  }

  constructor(err) {
    super(err || 'A session is either terminated or not started', NoSuchDriverError.code(), NoSuchDriverError.w3cStatus(), NoSuchDriverError.error());
  }

}

class NoSuchElementError extends ProtocolError {
  static code() {
    return 7;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.NOT_FOUND;
  }

  static error() {
    return 'no such element';
  }

  constructor(err) {
    super(err || 'An element could not be located on the page using the given ' + 'search parameters.', NoSuchElementError.code(), NoSuchElementError.w3cStatus(), NoSuchElementError.error());
  }

}

class NoSuchFrameError extends ProtocolError {
  static code() {
    return 8;
  }

  static error() {
    return 'no such frame';
  }

  static w3cStatus() {
    return _httpStatusCodes.default.NOT_FOUND;
  }

  constructor(err) {
    super(err || 'A request to switch to a frame could not be satisfied because ' + 'the frame could not be found.', NoSuchFrameError.code(), NoSuchFrameError.w3cStatus(), NoSuchFrameError.error());
  }

}

class UnknownCommandError extends ProtocolError {
  static code() {
    return 9;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.NOT_FOUND;
  }

  static error() {
    return 'unknown command';
  }

  constructor(err) {
    super(err || 'The requested resource could not be found, or a request was ' + 'received using an HTTP method that is not supported by the mapped ' + 'resource.', UnknownCommandError.code(), UnknownCommandError.w3cStatus(), UnknownCommandError.error());
  }

}

class StaleElementReferenceError extends ProtocolError {
  static code() {
    return 10;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.NOT_FOUND;
  }

  static error() {
    return 'stale element reference';
  }

  constructor(err) {
    super(err || 'An element command failed because the referenced element is no ' + 'longer attached to the DOM.', StaleElementReferenceError.code(), StaleElementReferenceError.w3cStatus(), StaleElementReferenceError.error());
  }

}

class ElementNotVisibleError extends ProtocolError {
  static code() {
    return 11;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.BAD_REQUEST;
  }

  static error() {
    return 'element not visible';
  }

  constructor(err) {
    super(err || 'An element command could not be completed because the element is ' + 'not visible on the page.', ElementNotVisibleError.code(), ElementNotVisibleError.w3cStatus(), ElementNotVisibleError.error());
  }

}

class InvalidElementStateError extends ProtocolError {
  static code() {
    return 12;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.BAD_REQUEST;
  }

  static error() {
    return 'invalid element state';
  }

  constructor(err) {
    super(err || 'An element command could not be completed because the element is ' + 'in an invalid state (e.g. attempting to click a disabled element).', InvalidElementStateError.code(), InvalidElementStateError.w3cStatus(), InvalidElementStateError.error());
  }

}

class UnknownError extends ProtocolError {
  static code() {
    return 13;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return W3C_UNKNOWN_ERROR;
  }

  constructor(errorOrMessage) {
    const origMessage = _lodash.default.isString((errorOrMessage || {}).message) ? errorOrMessage.message : errorOrMessage;
    const message = 'An unknown server-side error occurred while processing the command.' + (origMessage ? ` Original error: ${origMessage}` : '');
    super(message, UnknownError.code(), UnknownError.w3cStatus(), UnknownError.error());
  }

}

class UnknownMethodError extends ProtocolError {
  static code() {
    return 405;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.METHOD_NOT_ALLOWED;
  }

  static error() {
    return 'unknown method';
  }

  constructor(err) {
    super(err || 'The requested command matched a known URL but did not match an method for that URL', UnknownMethodError.code(), UnknownMethodError.w3cStatus(), UnknownMethodError.error());
  }

}

class UnsupportedOperationError extends ProtocolError {
  static code() {
    return 405;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return 'unsupported operation';
  }

  constructor(err) {
    super(err || 'A server-side error occurred. Command cannot be supported.', UnsupportedOperationError.code(), UnsupportedOperationError.w3cStatus(), UnsupportedOperationError.error());
  }

}

class ElementIsNotSelectableError extends ProtocolError {
  static code() {
    return 15;
  }

  static error() {
    return 'element not selectable';
  }

  static w3cStatus() {
    return _httpStatusCodes.default.BAD_REQUEST;
  }

  constructor(err) {
    super(err || 'An attempt was made to select an element that cannot be selected.', ElementIsNotSelectableError.code(), ElementIsNotSelectableError.w3cStatus(), ElementIsNotSelectableError.error());
  }

}

class ElementClickInterceptedError extends ProtocolError {
  static code() {
    return 64;
  }

  static error() {
    return 'element click intercepted';
  }

  static w3cStatus() {
    return _httpStatusCodes.default.BAD_REQUEST;
  }

  constructor(err) {
    super(err || 'The Element Click command could not be completed because the element receiving ' + 'the events is obscuring the element that was requested clicked', ElementClickInterceptedError.code(), ElementClickInterceptedError.w3cStatus(), ElementClickInterceptedError.error());
  }

}

class ElementNotInteractableError extends ProtocolError {
  static code() {
    return 60;
  }

  static error() {
    return 'element not interactable';
  }

  static w3cStatus() {
    return _httpStatusCodes.default.BAD_REQUEST;
  }

  constructor(err) {
    super(err || 'A command could not be completed because the element is not pointer- or keyboard interactable', ElementNotInteractableError.code(), ElementNotInteractableError.w3cStatus(), ElementNotInteractableError.error());
  }

}

class InsecureCertificateError extends ProtocolError {
  static error() {
    return 'insecure certificate';
  }

  constructor(err) {
    super(err || 'Navigation caused the user agent to hit a certificate warning, which is usually the result of an expired or invalid TLS certificate', ElementIsNotSelectableError.code(), null, InsecureCertificateError.error());
  }

}

class JavaScriptError extends ProtocolError {
  static code() {
    return 17;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return 'javascript error';
  }

  constructor(err) {
    super(err || 'An error occurred while executing user supplied JavaScript.', JavaScriptError.code(), JavaScriptError.w3cStatus(), JavaScriptError.error());
  }

}

class XPathLookupError extends ProtocolError {
  static code() {
    return 19;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.BAD_REQUEST;
  }

  static error() {
    return 'invalid selector';
  }

  constructor(err) {
    super(err || 'An error occurred while searching for an element by XPath.', XPathLookupError.code(), XPathLookupError.w3cStatus(), XPathLookupError.error());
  }

}

class TimeoutError extends ProtocolError {
  static code() {
    return 21;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.REQUEST_TIMEOUT;
  }

  static error() {
    return 'timeout';
  }

  constructor(err) {
    super(err || 'An operation did not complete before its timeout expired.', TimeoutError.code(), TimeoutError.w3cStatus(), TimeoutError.error());
  }

}

class NoSuchWindowError extends ProtocolError {
  static code() {
    return 23;
  }

  static error() {
    return 'no such window';
  }

  static w3cStatus() {
    return _httpStatusCodes.default.NOT_FOUND;
  }

  constructor(err) {
    super(err || 'A request to switch to a different window could not be satisfied ' + 'because the window could not be found.', NoSuchWindowError.code(), NoSuchWindowError.w3cStatus(), NoSuchWindowError.error());
  }

}

class InvalidArgumentError extends ProtocolError {
  static code() {
    return 61;
  }

  static error() {
    return 'invalid argument';
  }

  static w3cStatus() {
    return _httpStatusCodes.default.BAD_REQUEST;
  }

  constructor(err) {
    super(err || 'The arguments passed to the command are either invalid or malformed', InvalidArgumentError.code(), InvalidArgumentError.w3cStatus(), InvalidArgumentError.error());
  }

}

class InvalidCookieDomainError extends ProtocolError {
  static code() {
    return 24;
  }

  static error() {
    return 'invalid cookie domain';
  }

  static w3cStatus() {
    return _httpStatusCodes.default.BAD_REQUEST;
  }

  constructor(err) {
    super(err || 'An illegal attempt was made to set a cookie under a different ' + 'domain than the current page.', InvalidCookieDomainError.code(), InvalidCookieDomainError.w3cStatus(), InvalidCookieDomainError.error());
  }

}

class NoSuchCookieError extends ProtocolError {
  static code() {
    return 62;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.NOT_FOUND;
  }

  static error() {
    return 'no such cookie';
  }

  constructor(err) {
    super(err || 'No cookie matching the given path name was found amongst the associated cookies of the current browsing context’s active document', NoSuchCookieError.code(), NoSuchCookieError.w3cStatus(), NoSuchCookieError.error());
  }

}

class UnableToSetCookieError extends ProtocolError {
  static code() {
    return 25;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return 'unable to set cookie';
  }

  constructor(err) {
    super(err || 'A request to set a cookie\'s value could not be satisfied.', UnableToSetCookieError.code(), UnableToSetCookieError.w3cStatus(), UnableToSetCookieError.error());
  }

}

class UnexpectedAlertOpenError extends ProtocolError {
  static code() {
    return 26;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return 'unexpected alert open';
  }

  constructor(err) {
    super(err || 'A modal dialog was open, blocking this operation', UnexpectedAlertOpenError.code(), UnexpectedAlertOpenError.w3cStatus(), UnexpectedAlertOpenError.error());
  }

}

class NoAlertOpenError extends ProtocolError {
  static code() {
    return 27;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.NOT_FOUND;
  }

  static error() {
    return 'no such alert';
  }

  constructor(err) {
    super(err || 'An attempt was made to operate on a modal dialog when one ' + 'was not open.', NoAlertOpenError.code(), NoAlertOpenError.w3cStatus(), NoAlertOpenError.error());
  }

}

class NoSuchAlertError extends NoAlertOpenError {}

class ScriptTimeoutError extends ProtocolError {
  static code() {
    return 28;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.REQUEST_TIMEOUT;
  }

  static error() {
    return 'script timeout';
  }

  constructor(err) {
    super(err || 'A script did not complete before its timeout expired.', ScriptTimeoutError.code(), ScriptTimeoutError.w3cStatus(), ScriptTimeoutError.error());
  }

}

class InvalidElementCoordinatesError extends ProtocolError {
  static code() {
    return 29;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.BAD_REQUEST;
  }

  static error() {
    return 'invalid coordinates';
  }

  constructor(err) {
    super(err || 'The coordinates provided to an interactions operation are invalid.', InvalidElementCoordinatesError.code(), InvalidElementCoordinatesError.w3cStatus(), InvalidElementCoordinatesError.error());
  }

}

class InvalidCoordinatesError extends InvalidElementCoordinatesError {}

class IMENotAvailableError extends ProtocolError {
  static code() {
    return 30;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return 'unsupported operation';
  }

  constructor(err) {
    super(err || 'IME was not available.', IMENotAvailableError.code(), IMENotAvailableError.w3cStatus(), IMENotAvailableError.error());
  }

}

class IMEEngineActivationFailedError extends ProtocolError {
  static code() {
    return 31;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return 'unsupported operation';
  }

  constructor(err) {
    super(err || 'An IME engine could not be started.', IMEEngineActivationFailedError.code(), IMEEngineActivationFailedError.w3cStatus(), IMEEngineActivationFailedError.error());
  }

}

class InvalidSelectorError extends ProtocolError {
  static code() {
    return 32;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.BAD_REQUEST;
  }

  static error() {
    return 'invalid selector';
  }

  constructor(err) {
    super(err || 'Argument was an invalid selector (e.g. XPath/CSS).', InvalidSelectorError.code(), InvalidSelectorError.w3cStatus(), InvalidSelectorError.error());
  }

}

class SessionNotCreatedError extends ProtocolError {
  static code() {
    return 33;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return 'session not created';
  }

  constructor(details) {
    let message = 'A new session could not be created.';

    if (details) {
      message += ` Details: ${details}`;
    }

    super(message, SessionNotCreatedError.code(), SessionNotCreatedError.w3cStatus(), SessionNotCreatedError.error());
  }

}

class MoveTargetOutOfBoundsError extends ProtocolError {
  static code() {
    return 34;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return 'move target out of bounds';
  }

  constructor(err) {
    super(err || 'Target provided for a move action is out of bounds.', MoveTargetOutOfBoundsError.code(), MoveTargetOutOfBoundsError.w3cStatus(), MoveTargetOutOfBoundsError.error());
  }

}

class NoSuchContextError extends ProtocolError {
  static code() {
    return 35;
  }

  constructor(err) {
    super(err || 'No such context found.', NoSuchContextError.code());
  }

}

class InvalidContextError extends ProtocolError {
  static code() {
    return 36;
  }

  constructor(err) {
    super(err || 'That command could not be executed in the current context.', InvalidContextError.code());
  }

}

class NotYetImplementedError extends UnknownMethodError {
  constructor(err) {
    super(err || 'Method has not yet been implemented');
  }

}

class NotImplementedError extends UnknownMethodError {
  constructor(err) {
    super(err || 'Method is not implemented');
  }

}

class UnableToCaptureScreen extends ProtocolError {
  static code() {
    return 63;
  }

  static w3cStatus() {
    return _httpStatusCodes.default.INTERNAL_SERVER_ERROR;
  }

  static error() {
    return 'unable to capture screen';
  }

  constructor(err) {
    super(err || 'A screen capture was made impossible', UnableToCaptureScreen.code(), UnableToCaptureScreen.w3cStatus(), UnableToCaptureScreen.error());
  }

}

class BadParametersError extends _es6Error.default {
  static error() {
    return 'invalid argument';
  }

  constructor(requiredParams, actualParams, errMessage) {
    let message;

    if (!errMessage) {
      message = `Parameters were incorrect. We wanted ` + `${JSON.stringify(requiredParams)} and you ` + `sent ${JSON.stringify(actualParams)}`;
    } else {
      message = `Parameters were incorrect. You sent ${JSON.stringify(actualParams)}, ${errMessage}`;
    }

    super(message);
    this.w3cStatus = _httpStatusCodes.default.BAD_REQUEST;
  }

}

class ProxyRequestError extends _es6Error.default {
  constructor(err, responseError, httpStatus) {
    let responseErrorObj = _appiumSupport.util.safeJsonParse(responseError);

    if (!_lodash.default.isPlainObject(responseErrorObj)) {
      responseErrorObj = {};
    }

    let origMessage = _lodash.default.isString(responseError) ? responseError : '';

    if (!_lodash.default.isEmpty(responseErrorObj)) {
      if (_lodash.default.isString(responseErrorObj.value)) {
        origMessage = responseErrorObj.value;
      } else if (_lodash.default.isPlainObject(responseErrorObj.value) && _lodash.default.isString(responseErrorObj.value.message)) {
        origMessage = responseErrorObj.value.message;
      }
    }

    super(_lodash.default.isEmpty(err) ? `Proxy request unsuccessful. ${origMessage}` : err);
    this.w3cStatus = _httpStatusCodes.default.BAD_REQUEST;

    if (_lodash.default.isPlainObject(responseErrorObj.value) && _lodash.default.has(responseErrorObj.value, 'error')) {
      this.w3c = responseErrorObj.value;
      this.w3cStatus = httpStatus || _httpStatusCodes.default.BAD_REQUEST;
    } else {
      this.jsonwp = responseErrorObj;
    }
  }

  getActualError() {
    if (_appiumSupport.util.hasValue(this.jsonwp) && _appiumSupport.util.hasValue(this.jsonwp.status) && _appiumSupport.util.hasValue(this.jsonwp.value)) {
      return errorFromMJSONWPStatusCode(this.jsonwp.status, this.jsonwp.value);
    } else if (_appiumSupport.util.hasValue(this.w3c) && _lodash.default.isNumber(this.w3cStatus) && this.w3cStatus >= 300) {
      return errorFromW3CJsonCode(this.w3c.error, this.w3c.message || this.message, this.w3c.stacktrace);
    }

    return new UnknownError(this.message);
  }

}

const errors = {
  NotYetImplementedError,
  NotImplementedError,
  BadParametersError,
  InvalidArgumentError,
  NoSuchDriverError,
  NoSuchElementError,
  UnknownCommandError,
  StaleElementReferenceError,
  ElementNotVisibleError,
  InvalidElementStateError,
  UnknownError,
  ElementIsNotSelectableError,
  ElementClickInterceptedError,
  ElementNotInteractableError,
  InsecureCertificateError,
  JavaScriptError,
  XPathLookupError,
  TimeoutError,
  NoSuchWindowError,
  NoSuchCookieError,
  InvalidCookieDomainError,
  InvalidCoordinatesError,
  UnableToSetCookieError,
  UnexpectedAlertOpenError,
  NoAlertOpenError,
  ScriptTimeoutError,
  InvalidElementCoordinatesError,
  IMENotAvailableError,
  IMEEngineActivationFailedError,
  InvalidSelectorError,
  SessionNotCreatedError,
  MoveTargetOutOfBoundsError,
  NoSuchAlertError,
  NoSuchContextError,
  InvalidContextError,
  NoSuchFrameError,
  UnableToCaptureScreen,
  UnknownMethodError,
  UnsupportedOperationError,
  ProxyRequestError
};
exports.errors = errors;
const jsonwpErrorCodeMap = {};

for (let ErrorClass of _lodash.default.values(errors)) {
  if (ErrorClass.code) {
    jsonwpErrorCodeMap[ErrorClass.code()] = ErrorClass;
  }
}

const w3cErrorCodeMap = {};

for (let ErrorClass of _lodash.default.values(errors)) {
  if (ErrorClass.error) {
    w3cErrorCodeMap[ErrorClass.error()] = ErrorClass;
  }
}

function isUnknownError(err) {
  return !err.constructor.name || !_lodash.default.values(errors).find(function equalNames(error) {
    return error.name === err.constructor.name;
  });
}

function isErrorType(err, type) {
  if (type.name === ProtocolError.name) {
    return !!err.jsonwpCode;
  } else if (type.name === ProxyRequestError.name) {
    if (err.jsonwp) {
      return !!err.jsonwp.status;
    }

    if (_lodash.default.isPlainObject(err.w3c)) {
      return _lodash.default.isNumber(err.w3cStatus) && err.w3cStatus >= 300;
    }

    return false;
  }

  return err.constructor.name === type.name;
}

function errorFromMJSONWPStatusCode(code, value = '') {
  const message = (value || {}).message || value || '';

  if (code !== UnknownError.code() && jsonwpErrorCodeMap[code]) {
    mjsonwpLog.debug(`Matched JSONWP error code ${code} to ${jsonwpErrorCodeMap[code].name}`);
    return new jsonwpErrorCodeMap[code](message);
  }

  mjsonwpLog.debug(`Matched JSONWP error code ${code} to UnknownError`);
  return new UnknownError(message);
}

function errorFromW3CJsonCode(code, message, stacktrace = null) {
  if (code && w3cErrorCodeMap[code.toLowerCase()]) {
    w3cLog.debug(`Matched W3C error code '${code}' to ${w3cErrorCodeMap[code.toLowerCase()].name}`);
    const resultError = new w3cErrorCodeMap[code.toLowerCase()](message);
    resultError.stacktrace = stacktrace;
    return resultError;
  }

  w3cLog.debug(`Matched W3C error code '${code}' to UnknownError`);
  const resultError = new UnknownError(message);
  resultError.stacktrace = stacktrace;
  return resultError;
}

function getResponseForW3CError(err) {
  let httpStatus;
  let w3cErrorString;

  if (!err.w3cStatus) {
    err = _appiumSupport.util.hasValue(err.status) ? errorFromMJSONWPStatusCode(err.status, err.value) : new errors.UnknownError(err.message);
  }

  if (isErrorType(err, errors.BadParametersError)) {
    w3cLog.debug(`Bad parameters: ${err}`);
    w3cErrorString = BadParametersError.error();
  } else {
    w3cErrorString = err.error;
  }

  httpStatus = err.w3cStatus;

  if (!w3cErrorString) {
    w3cErrorString = UnknownError.error();
  }

  let httpResBody = {
    value: {
      error: w3cErrorString,
      message: err.message,
      stacktrace: err.stacktrace || err.stack
    }
  };
  return [httpStatus, httpResBody];
}

function getResponseForJsonwpError(err) {
  if (isUnknownError(err)) {
    err = new errors.UnknownError(err);
  }

  let httpStatus = _httpStatusCodes.default.INTERNAL_SERVER_ERROR;
  let httpResBody = {
    status: err.jsonwpCode,
    value: {
      message: err.message
    }
  };

  if (isErrorType(err, errors.BadParametersError)) {
    mjsonwpLog.debug(`Bad parameters: ${err}`);
    httpStatus = _httpStatusCodes.default.BAD_REQUEST;
    httpResBody = err.message;
  } else if (isErrorType(err, errors.NotYetImplementedError) || isErrorType(err, errors.NotImplementedError)) {
    httpStatus = _httpStatusCodes.default.NOT_IMPLEMENTED;
  } else if (isErrorType(err, errors.NoSuchDriverError)) {
    httpStatus = _httpStatusCodes.default.NOT_FOUND;
  }

  return [httpStatus, httpResBody];
}require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9wcm90b2NvbC9lcnJvcnMuanMiXSwibmFtZXMiOlsibWpzb253cExvZyIsImxvZ2dlciIsImdldExvZ2dlciIsInczY0xvZyIsIlczQ19VTktOT1dOX0VSUk9SIiwiUHJvdG9jb2xFcnJvciIsIkVTNkVycm9yIiwiY29uc3RydWN0b3IiLCJtc2ciLCJqc29ud3BDb2RlIiwidzNjU3RhdHVzIiwiZXJyb3IiLCJIVFRQU3RhdHVzQ29kZXMiLCJCQURfUkVRVUVTVCIsIl9zdGFja3RyYWNlIiwic3RhY2t0cmFjZSIsInN0YWNrIiwidmFsdWUiLCJOb1N1Y2hEcml2ZXJFcnJvciIsImNvZGUiLCJOT1RfRk9VTkQiLCJlcnIiLCJOb1N1Y2hFbGVtZW50RXJyb3IiLCJOb1N1Y2hGcmFtZUVycm9yIiwiVW5rbm93bkNvbW1hbmRFcnJvciIsIlN0YWxlRWxlbWVudFJlZmVyZW5jZUVycm9yIiwiRWxlbWVudE5vdFZpc2libGVFcnJvciIsIkludmFsaWRFbGVtZW50U3RhdGVFcnJvciIsIlVua25vd25FcnJvciIsIklOVEVSTkFMX1NFUlZFUl9FUlJPUiIsImVycm9yT3JNZXNzYWdlIiwib3JpZ01lc3NhZ2UiLCJfIiwiaXNTdHJpbmciLCJtZXNzYWdlIiwiVW5rbm93bk1ldGhvZEVycm9yIiwiTUVUSE9EX05PVF9BTExPV0VEIiwiVW5zdXBwb3J0ZWRPcGVyYXRpb25FcnJvciIsIkVsZW1lbnRJc05vdFNlbGVjdGFibGVFcnJvciIsIkVsZW1lbnRDbGlja0ludGVyY2VwdGVkRXJyb3IiLCJFbGVtZW50Tm90SW50ZXJhY3RhYmxlRXJyb3IiLCJJbnNlY3VyZUNlcnRpZmljYXRlRXJyb3IiLCJKYXZhU2NyaXB0RXJyb3IiLCJYUGF0aExvb2t1cEVycm9yIiwiVGltZW91dEVycm9yIiwiUkVRVUVTVF9USU1FT1VUIiwiTm9TdWNoV2luZG93RXJyb3IiLCJJbnZhbGlkQXJndW1lbnRFcnJvciIsIkludmFsaWRDb29raWVEb21haW5FcnJvciIsIk5vU3VjaENvb2tpZUVycm9yIiwiVW5hYmxlVG9TZXRDb29raWVFcnJvciIsIlVuZXhwZWN0ZWRBbGVydE9wZW5FcnJvciIsIk5vQWxlcnRPcGVuRXJyb3IiLCJOb1N1Y2hBbGVydEVycm9yIiwiU2NyaXB0VGltZW91dEVycm9yIiwiSW52YWxpZEVsZW1lbnRDb29yZGluYXRlc0Vycm9yIiwiSW52YWxpZENvb3JkaW5hdGVzRXJyb3IiLCJJTUVOb3RBdmFpbGFibGVFcnJvciIsIklNRUVuZ2luZUFjdGl2YXRpb25GYWlsZWRFcnJvciIsIkludmFsaWRTZWxlY3RvckVycm9yIiwiU2Vzc2lvbk5vdENyZWF0ZWRFcnJvciIsImRldGFpbHMiLCJNb3ZlVGFyZ2V0T3V0T2ZCb3VuZHNFcnJvciIsIk5vU3VjaENvbnRleHRFcnJvciIsIkludmFsaWRDb250ZXh0RXJyb3IiLCJOb3RZZXRJbXBsZW1lbnRlZEVycm9yIiwiTm90SW1wbGVtZW50ZWRFcnJvciIsIlVuYWJsZVRvQ2FwdHVyZVNjcmVlbiIsIkJhZFBhcmFtZXRlcnNFcnJvciIsInJlcXVpcmVkUGFyYW1zIiwiYWN0dWFsUGFyYW1zIiwiZXJyTWVzc2FnZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJQcm94eVJlcXVlc3RFcnJvciIsInJlc3BvbnNlRXJyb3IiLCJodHRwU3RhdHVzIiwicmVzcG9uc2VFcnJvck9iaiIsInV0aWwiLCJzYWZlSnNvblBhcnNlIiwiaXNQbGFpbk9iamVjdCIsImlzRW1wdHkiLCJoYXMiLCJ3M2MiLCJqc29ud3AiLCJnZXRBY3R1YWxFcnJvciIsImhhc1ZhbHVlIiwic3RhdHVzIiwiZXJyb3JGcm9tTUpTT05XUFN0YXR1c0NvZGUiLCJpc051bWJlciIsImVycm9yRnJvbVczQ0pzb25Db2RlIiwiZXJyb3JzIiwianNvbndwRXJyb3JDb2RlTWFwIiwiRXJyb3JDbGFzcyIsInZhbHVlcyIsInczY0Vycm9yQ29kZU1hcCIsImlzVW5rbm93bkVycm9yIiwibmFtZSIsImZpbmQiLCJlcXVhbE5hbWVzIiwiaXNFcnJvclR5cGUiLCJ0eXBlIiwiZGVidWciLCJ0b0xvd2VyQ2FzZSIsInJlc3VsdEVycm9yIiwiZ2V0UmVzcG9uc2VGb3JXM0NFcnJvciIsInczY0Vycm9yU3RyaW5nIiwiaHR0cFJlc0JvZHkiLCJnZXRSZXNwb25zZUZvckpzb253cEVycm9yIiwiTk9UX0lNUExFTUVOVEVEIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUVBLE1BQU1BLFVBQVUsR0FBR0Msc0JBQU9DLFNBQVAsQ0FBaUIsU0FBakIsQ0FBbkI7O0FBQ0EsTUFBTUMsTUFBTSxHQUFHRixzQkFBT0MsU0FBUCxDQUFpQixLQUFqQixDQUFmOztBQUVBLE1BQU1FLGlCQUFpQixHQUFHLGVBQTFCOztBQUdBLE1BQU1DLGFBQU4sU0FBNEJDLGlCQUE1QixDQUFxQztBQUNuQ0MsRUFBQUEsV0FBVyxDQUFFQyxHQUFGLEVBQU9DLFVBQVAsRUFBbUJDLFNBQW5CLEVBQThCQyxLQUE5QixFQUFxQztBQUM5QyxVQUFNSCxHQUFOO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxTQUFLRSxLQUFMLEdBQWFBLEtBQUssSUFBSVAsaUJBQXRCOztBQUNBLFFBQUksS0FBS0ssVUFBTCxLQUFvQixJQUF4QixFQUE4QjtBQUM1QixXQUFLQSxVQUFMLEdBQWtCLEVBQWxCO0FBQ0Q7O0FBQ0QsU0FBS0MsU0FBTCxHQUFpQkEsU0FBUyxJQUFJRSx5QkFBZ0JDLFdBQTlDO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixJQUFuQjtBQUNEOztBQUVELE1BQUlDLFVBQUosR0FBa0I7QUFDaEIsV0FBTyxLQUFLRCxXQUFMLElBQW9CLEtBQUtFLEtBQWhDO0FBQ0Q7O0FBRUQsTUFBSUQsVUFBSixDQUFnQkUsS0FBaEIsRUFBdUI7QUFDckIsU0FBS0gsV0FBTCxHQUFtQkcsS0FBbkI7QUFDRDs7QUFsQmtDOzs7O0FBeUJyQyxNQUFNQyxpQkFBTixTQUFnQ2IsYUFBaEMsQ0FBOEM7QUFDNUMsU0FBT2MsSUFBUCxHQUFlO0FBQ2IsV0FBTyxDQUFQO0FBQ0Q7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QyxXQUFXLENBQUMvRSxHQUFELEVBQU1zRSxNQUFNLENBQUN6QixtQkFBYixDQURmLEVBQ2tEO0FBRXZEVSxJQUFBQSxVQUFVLEdBQUdoRSx5QkFBZ0JpRyxlQUE3QjtBQUNELEdBSk0sTUFJQSxJQUFJVCxXQUFXLENBQUMvRSxHQUFELEVBQU1zRSxNQUFNLENBQUN6RSxpQkFBYixDQUFmLEVBQWdEO0FBRXJEMEQsSUFBQUEsVUFBVSxHQUFHaEUseUJBQWdCUSxTQUE3QjtBQUNEOztBQUdELFNBQU8sQ0FBQ3dELFVBQUQsRUFBYStCLFdBQWIsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVTNkVycm9yIGZyb20gJ2VzNi1lcnJvcic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdXRpbCwgbG9nZ2VyIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IEhUVFBTdGF0dXNDb2RlcyBmcm9tICdodHRwLXN0YXR1cy1jb2Rlcyc7XG5cbmNvbnN0IG1qc29ud3BMb2cgPSBsb2dnZXIuZ2V0TG9nZ2VyKCdNSlNPTldQJyk7XG5jb25zdCB3M2NMb2cgPSBsb2dnZXIuZ2V0TG9nZ2VyKCdXM0MnKTtcblxuY29uc3QgVzNDX1VOS05PV05fRVJST1IgPSAndW5rbm93biBlcnJvcic7XG5cbi8vIGJhc2UgZXJyb3IgY2xhc3MgZm9yIGFsbCBvZiBvdXIgZXJyb3JzXG5jbGFzcyBQcm90b2NvbEVycm9yIGV4dGVuZHMgRVM2RXJyb3Ige1xuICBjb25zdHJ1Y3RvciAobXNnLCBqc29ud3BDb2RlLCB3M2NTdGF0dXMsIGVycm9yKSB7XG4gICAgc3VwZXIobXNnKTtcbiAgICB0aGlzLmpzb253cENvZGUgPSBqc29ud3BDb2RlO1xuICAgIHRoaXMuZXJyb3IgPSBlcnJvciB8fCBXM0NfVU5LTk9XTl9FUlJPUjtcbiAgICBpZiAodGhpcy5qc29ud3BDb2RlID09PSBudWxsKSB7XG4gICAgICB0aGlzLmpzb253cENvZGUgPSAxMztcbiAgICB9XG4gICAgdGhpcy53M2NTdGF0dXMgPSB3M2NTdGF0dXMgfHwgSFRUUFN0YXR1c0NvZGVzLkJBRF9SRVFVRVNUO1xuICAgIHRoaXMuX3N0YWNrdHJhY2UgPSBudWxsO1xuICB9XG5cbiAgZ2V0IHN0YWNrdHJhY2UgKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGFja3RyYWNlIHx8IHRoaXMuc3RhY2s7XG4gIH1cblxuICBzZXQgc3RhY2t0cmFjZSAodmFsdWUpIHtcbiAgICB0aGlzLl9zdGFja3RyYWNlID0gdmFsdWU7XG4gIH1cbn1cblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL1NlbGVuaXVtSFEvc2VsZW5pdW0vYmxvYi8xNzZiNGE5ZTMwODJhYzE5MjZmMmE0MzZlYjM0Njc2MGMzN2E1OTk4L2phdmEvY2xpZW50L3NyYy9vcmcvb3BlbnFhL3NlbGVuaXVtL3JlbW90ZS9FcnJvckNvZGVzLmphdmEjTDIxNVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL1NlbGVuaXVtSFEvc2VsZW5pdW0vaXNzdWVzLzU1NjIjaXNzdWVjb21tZW50LTM3MDM3OTQ3MFxuLy8gaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYmRyaXZlci93ZWJkcml2ZXItc3BlYy5odG1sI2Rmbi1lcnJvci1jb2RlXG5cbmNsYXNzIE5vU3VjaERyaXZlckVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gNjtcbiAgfVxuICAvLyBXM0MgRXJyb3IgaXMgY2FsbGVkIEludmFsaWRTZXNzaW9uSURcbiAgc3RhdGljIHczY1N0YXR1cyAoKSB7XG4gICAgcmV0dXJuIEhUVFBTdGF0dXNDb2Rlcy5OT1RfRk9VTkQ7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ2ludmFsaWQgc2Vzc2lvbiBpZCc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQSBzZXNzaW9uIGlzIGVpdGhlciB0ZXJtaW5hdGVkIG9yIG5vdCBzdGFydGVkJywgTm9TdWNoRHJpdmVyRXJyb3IuY29kZSgpLFxuICAgICAgICAgIE5vU3VjaERyaXZlckVycm9yLnczY1N0YXR1cygpLCBOb1N1Y2hEcml2ZXJFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBOb1N1Y2hFbGVtZW50RXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiA3O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuTk9UX0ZPVU5EO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdubyBzdWNoIGVsZW1lbnQnO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FuIGVsZW1lbnQgY291bGQgbm90IGJlIGxvY2F0ZWQgb24gdGhlIHBhZ2UgdXNpbmcgdGhlIGdpdmVuICcgK1xuICAgICAgICAgICdzZWFyY2ggcGFyYW1ldGVycy4nLCBOb1N1Y2hFbGVtZW50RXJyb3IuY29kZSgpLCBOb1N1Y2hFbGVtZW50RXJyb3IudzNjU3RhdHVzKCksXG4gICAgICAgICAgTm9TdWNoRWxlbWVudEVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIE5vU3VjaEZyYW1lRXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiA4O1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdubyBzdWNoIGZyYW1lJztcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLk5PVF9GT1VORDtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBIHJlcXVlc3QgdG8gc3dpdGNoIHRvIGEgZnJhbWUgY291bGQgbm90IGJlIHNhdGlzZmllZCBiZWNhdXNlICcgK1xuICAgICAgICAgICd0aGUgZnJhbWUgY291bGQgbm90IGJlIGZvdW5kLicsIE5vU3VjaEZyYW1lRXJyb3IuY29kZSgpLFxuICAgICAgICAgIE5vU3VjaEZyYW1lRXJyb3IudzNjU3RhdHVzKCksIE5vU3VjaEZyYW1lRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgVW5rbm93bkNvbW1hbmRFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDk7XG4gIH1cbiAgc3RhdGljIHczY1N0YXR1cyAoKSB7XG4gICAgcmV0dXJuIEhUVFBTdGF0dXNDb2Rlcy5OT1RfRk9VTkQ7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ3Vua25vd24gY29tbWFuZCc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnVGhlIHJlcXVlc3RlZCByZXNvdXJjZSBjb3VsZCBub3QgYmUgZm91bmQsIG9yIGEgcmVxdWVzdCB3YXMgJyArXG4gICAgICAgICAgJ3JlY2VpdmVkIHVzaW5nIGFuIEhUVFAgbWV0aG9kIHRoYXQgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgbWFwcGVkICcgK1xuICAgICAgICAgICdyZXNvdXJjZS4nLCBVbmtub3duQ29tbWFuZEVycm9yLmNvZGUoKSwgVW5rbm93bkNvbW1hbmRFcnJvci53M2NTdGF0dXMoKSwgVW5rbm93bkNvbW1hbmRFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBTdGFsZUVsZW1lbnRSZWZlcmVuY2VFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDEwO1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuTk9UX0ZPVU5EO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdzdGFsZSBlbGVtZW50IHJlZmVyZW5jZSc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQW4gZWxlbWVudCBjb21tYW5kIGZhaWxlZCBiZWNhdXNlIHRoZSByZWZlcmVuY2VkIGVsZW1lbnQgaXMgbm8gJyArXG4gICAgICAgICAgJ2xvbmdlciBhdHRhY2hlZCB0byB0aGUgRE9NLicsIFN0YWxlRWxlbWVudFJlZmVyZW5jZUVycm9yLmNvZGUoKSxcbiAgICAgICAgICBTdGFsZUVsZW1lbnRSZWZlcmVuY2VFcnJvci53M2NTdGF0dXMoKSwgU3RhbGVFbGVtZW50UmVmZXJlbmNlRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgRWxlbWVudE5vdFZpc2libGVFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDExO1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuQkFEX1JFUVVFU1Q7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ2VsZW1lbnQgbm90IHZpc2libGUnO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FuIGVsZW1lbnQgY29tbWFuZCBjb3VsZCBub3QgYmUgY29tcGxldGVkIGJlY2F1c2UgdGhlIGVsZW1lbnQgaXMgJyArXG4gICAgICAgICAgJ25vdCB2aXNpYmxlIG9uIHRoZSBwYWdlLicsIEVsZW1lbnROb3RWaXNpYmxlRXJyb3IuY29kZSgpLFxuICAgICAgICAgIEVsZW1lbnROb3RWaXNpYmxlRXJyb3IudzNjU3RhdHVzKCksIEVsZW1lbnROb3RWaXNpYmxlRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgSW52YWxpZEVsZW1lbnRTdGF0ZUVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMTI7XG4gIH1cbiAgc3RhdGljIHczY1N0YXR1cyAoKSB7XG4gICAgcmV0dXJuIEhUVFBTdGF0dXNDb2Rlcy5CQURfUkVRVUVTVDtcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAnaW52YWxpZCBlbGVtZW50IHN0YXRlJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBlbGVtZW50IGNvbW1hbmQgY291bGQgbm90IGJlIGNvbXBsZXRlZCBiZWNhdXNlIHRoZSBlbGVtZW50IGlzICcgK1xuICAgICAgICAgICdpbiBhbiBpbnZhbGlkIHN0YXRlIChlLmcuIGF0dGVtcHRpbmcgdG8gY2xpY2sgYSBkaXNhYmxlZCBlbGVtZW50KS4nLFxuICAgICAgICAgIEludmFsaWRFbGVtZW50U3RhdGVFcnJvci5jb2RlKCksIEludmFsaWRFbGVtZW50U3RhdGVFcnJvci53M2NTdGF0dXMoKSxcbiAgICAgICAgICBJbnZhbGlkRWxlbWVudFN0YXRlRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgVW5rbm93bkVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMTM7XG4gIH1cbiAgc3RhdGljIHczY1N0YXR1cyAoKSB7XG4gICAgcmV0dXJuIEhUVFBTdGF0dXNDb2Rlcy5JTlRFUk5BTF9TRVJWRVJfRVJST1I7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gVzNDX1VOS05PV05fRVJST1I7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycm9yT3JNZXNzYWdlKSB7XG4gICAgY29uc3Qgb3JpZ01lc3NhZ2UgPSBfLmlzU3RyaW5nKChlcnJvck9yTWVzc2FnZSB8fCB7fSkubWVzc2FnZSlcbiAgICAgID8gZXJyb3JPck1lc3NhZ2UubWVzc2FnZVxuICAgICAgOiBlcnJvck9yTWVzc2FnZTtcbiAgICBjb25zdCBtZXNzYWdlID0gJ0FuIHVua25vd24gc2VydmVyLXNpZGUgZXJyb3Igb2NjdXJyZWQgd2hpbGUgcHJvY2Vzc2luZyB0aGUgY29tbWFuZC4nICtcbiAgICAgIChvcmlnTWVzc2FnZSA/IGAgT3JpZ2luYWwgZXJyb3I6ICR7b3JpZ01lc3NhZ2V9YCA6ICcnKTtcbiAgICBzdXBlcihtZXNzYWdlLCBVbmtub3duRXJyb3IuY29kZSgpLCBVbmtub3duRXJyb3IudzNjU3RhdHVzKCksIFVua25vd25FcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBVbmtub3duTWV0aG9kRXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiA0MDU7XG4gIH1cbiAgc3RhdGljIHczY1N0YXR1cyAoKSB7XG4gICAgcmV0dXJuIEhUVFBTdGF0dXNDb2Rlcy5NRVRIT0RfTk9UX0FMTE9XRUQ7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ3Vua25vd24gbWV0aG9kJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdUaGUgcmVxdWVzdGVkIGNvbW1hbmQgbWF0Y2hlZCBhIGtub3duIFVSTCBidXQgZGlkIG5vdCBtYXRjaCBhbiBtZXRob2QgZm9yIHRoYXQgVVJMJyxcbiAgICAgICAgICBVbmtub3duTWV0aG9kRXJyb3IuY29kZSgpLCBVbmtub3duTWV0aG9kRXJyb3IudzNjU3RhdHVzKCksIFVua25vd25NZXRob2RFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBVbnN1cHBvcnRlZE9wZXJhdGlvbkVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gNDA1O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICd1bnN1cHBvcnRlZCBvcGVyYXRpb24nO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0Egc2VydmVyLXNpZGUgZXJyb3Igb2NjdXJyZWQuIENvbW1hbmQgY2Fubm90IGJlIHN1cHBvcnRlZC4nLFxuICAgICAgICAgIFVuc3VwcG9ydGVkT3BlcmF0aW9uRXJyb3IuY29kZSgpLCBVbnN1cHBvcnRlZE9wZXJhdGlvbkVycm9yLnczY1N0YXR1cygpLFxuICAgICAgICAgIFVuc3VwcG9ydGVkT3BlcmF0aW9uRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgRWxlbWVudElzTm90U2VsZWN0YWJsZUVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMTU7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ2VsZW1lbnQgbm90IHNlbGVjdGFibGUnO1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuQkFEX1JFUVVFU1Q7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQW4gYXR0ZW1wdCB3YXMgbWFkZSB0byBzZWxlY3QgYW4gZWxlbWVudCB0aGF0IGNhbm5vdCBiZSBzZWxlY3RlZC4nLFxuICAgICAgICAgIEVsZW1lbnRJc05vdFNlbGVjdGFibGVFcnJvci5jb2RlKCksIEVsZW1lbnRJc05vdFNlbGVjdGFibGVFcnJvci53M2NTdGF0dXMoKSxcbiAgICAgICAgICBFbGVtZW50SXNOb3RTZWxlY3RhYmxlRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgRWxlbWVudENsaWNrSW50ZXJjZXB0ZWRFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDY0O1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdlbGVtZW50IGNsaWNrIGludGVyY2VwdGVkJztcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLkJBRF9SRVFVRVNUO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ1RoZSBFbGVtZW50IENsaWNrIGNvbW1hbmQgY291bGQgbm90IGJlIGNvbXBsZXRlZCBiZWNhdXNlIHRoZSBlbGVtZW50IHJlY2VpdmluZyAnICtcbiAgICAgICAgICAndGhlIGV2ZW50cyBpcyBvYnNjdXJpbmcgdGhlIGVsZW1lbnQgdGhhdCB3YXMgcmVxdWVzdGVkIGNsaWNrZWQnLFxuICAgICAgICAgIEVsZW1lbnRDbGlja0ludGVyY2VwdGVkRXJyb3IuY29kZSgpLCBFbGVtZW50Q2xpY2tJbnRlcmNlcHRlZEVycm9yLnczY1N0YXR1cygpLFxuICAgICAgICAgIEVsZW1lbnRDbGlja0ludGVyY2VwdGVkRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgRWxlbWVudE5vdEludGVyYWN0YWJsZUVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gNjA7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ2VsZW1lbnQgbm90IGludGVyYWN0YWJsZSc7XG4gIH1cbiAgc3RhdGljIHczY1N0YXR1cyAoKSB7XG4gICAgcmV0dXJuIEhUVFBTdGF0dXNDb2Rlcy5CQURfUkVRVUVTVDtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBIGNvbW1hbmQgY291bGQgbm90IGJlIGNvbXBsZXRlZCBiZWNhdXNlIHRoZSBlbGVtZW50IGlzIG5vdCBwb2ludGVyLSBvciBrZXlib2FyZCBpbnRlcmFjdGFibGUnLFxuICAgICAgICAgIEVsZW1lbnROb3RJbnRlcmFjdGFibGVFcnJvci5jb2RlKCksIEVsZW1lbnROb3RJbnRlcmFjdGFibGVFcnJvci53M2NTdGF0dXMoKSxcbiAgICAgICAgICBFbGVtZW50Tm90SW50ZXJhY3RhYmxlRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgSW5zZWN1cmVDZXJ0aWZpY2F0ZUVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdpbnNlY3VyZSBjZXJ0aWZpY2F0ZSc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnTmF2aWdhdGlvbiBjYXVzZWQgdGhlIHVzZXIgYWdlbnQgdG8gaGl0IGEgY2VydGlmaWNhdGUgd2FybmluZywgd2hpY2ggaXMgdXN1YWxseSB0aGUgcmVzdWx0IG9mIGFuIGV4cGlyZWQgb3IgaW52YWxpZCBUTFMgY2VydGlmaWNhdGUnLFxuICAgICAgRWxlbWVudElzTm90U2VsZWN0YWJsZUVycm9yLmNvZGUoKSwgbnVsbCwgSW5zZWN1cmVDZXJ0aWZpY2F0ZUVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIEphdmFTY3JpcHRFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDE3O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdqYXZhc2NyaXB0IGVycm9yJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBleGVjdXRpbmcgdXNlciBzdXBwbGllZCBKYXZhU2NyaXB0LicsXG4gICAgICAgICAgSmF2YVNjcmlwdEVycm9yLmNvZGUoKSwgSmF2YVNjcmlwdEVycm9yLnczY1N0YXR1cygpLCBKYXZhU2NyaXB0RXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgWFBhdGhMb29rdXBFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDE5O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuQkFEX1JFUVVFU1Q7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ2ludmFsaWQgc2VsZWN0b3InO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHNlYXJjaGluZyBmb3IgYW4gZWxlbWVudCBieSBYUGF0aC4nLFxuICAgICAgICAgIFhQYXRoTG9va3VwRXJyb3IuY29kZSgpLCBYUGF0aExvb2t1cEVycm9yLnczY1N0YXR1cygpLCBYUGF0aExvb2t1cEVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIFRpbWVvdXRFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDIxO1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuUkVRVUVTVF9USU1FT1VUO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICd0aW1lb3V0JztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBvcGVyYXRpb24gZGlkIG5vdCBjb21wbGV0ZSBiZWZvcmUgaXRzIHRpbWVvdXQgZXhwaXJlZC4nLFxuICAgICAgICAgIFRpbWVvdXRFcnJvci5jb2RlKCksIFRpbWVvdXRFcnJvci53M2NTdGF0dXMoKSwgVGltZW91dEVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIE5vU3VjaFdpbmRvd0Vycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMjM7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ25vIHN1Y2ggd2luZG93JztcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLk5PVF9GT1VORDtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBIHJlcXVlc3QgdG8gc3dpdGNoIHRvIGEgZGlmZmVyZW50IHdpbmRvdyBjb3VsZCBub3QgYmUgc2F0aXNmaWVkICcgK1xuICAgICAgICAgICdiZWNhdXNlIHRoZSB3aW5kb3cgY291bGQgbm90IGJlIGZvdW5kLicsIE5vU3VjaFdpbmRvd0Vycm9yLmNvZGUoKSxcbiAgICAgICAgICBOb1N1Y2hXaW5kb3dFcnJvci53M2NTdGF0dXMoKSwgTm9TdWNoV2luZG93RXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgSW52YWxpZEFyZ3VtZW50RXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiA2MTtcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAnaW52YWxpZCBhcmd1bWVudCc7XG4gIH1cbiAgc3RhdGljIHczY1N0YXR1cyAoKSB7XG4gICAgcmV0dXJuIEhUVFBTdGF0dXNDb2Rlcy5CQURfUkVRVUVTVDtcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdUaGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgY29tbWFuZCBhcmUgZWl0aGVyIGludmFsaWQgb3IgbWFsZm9ybWVkJyxcbiAgICAgICAgICBJbnZhbGlkQXJndW1lbnRFcnJvci5jb2RlKCksIEludmFsaWRBcmd1bWVudEVycm9yLnczY1N0YXR1cygpLFxuICAgICAgICAgIEludmFsaWRBcmd1bWVudEVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIEludmFsaWRDb29raWVEb21haW5FcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDI0O1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdpbnZhbGlkIGNvb2tpZSBkb21haW4nO1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuQkFEX1JFUVVFU1Q7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQW4gaWxsZWdhbCBhdHRlbXB0IHdhcyBtYWRlIHRvIHNldCBhIGNvb2tpZSB1bmRlciBhIGRpZmZlcmVudCAnICtcbiAgICAgICAgICAnZG9tYWluIHRoYW4gdGhlIGN1cnJlbnQgcGFnZS4nLCBJbnZhbGlkQ29va2llRG9tYWluRXJyb3IuY29kZSgpLFxuICAgICAgICAgIEludmFsaWRDb29raWVEb21haW5FcnJvci53M2NTdGF0dXMoKSwgSW52YWxpZENvb2tpZURvbWFpbkVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIE5vU3VjaENvb2tpZUVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gNjI7XG4gIH1cbiAgc3RhdGljIHczY1N0YXR1cyAoKSB7XG4gICAgcmV0dXJuIEhUVFBTdGF0dXNDb2Rlcy5OT1RfRk9VTkQ7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ25vIHN1Y2ggY29va2llJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdObyBjb29raWUgbWF0Y2hpbmcgdGhlIGdpdmVuIHBhdGggbmFtZSB3YXMgZm91bmQgYW1vbmdzdCB0aGUgYXNzb2NpYXRlZCBjb29raWVzIG9mIHRoZSBjdXJyZW50IGJyb3dzaW5nIGNvbnRleHTigJlzIGFjdGl2ZSBkb2N1bWVudCcsXG4gICAgICAgICAgTm9TdWNoQ29va2llRXJyb3IuY29kZSgpLCBOb1N1Y2hDb29raWVFcnJvci53M2NTdGF0dXMoKSwgTm9TdWNoQ29va2llRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgVW5hYmxlVG9TZXRDb29raWVFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDI1O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICd1bmFibGUgdG8gc2V0IGNvb2tpZSc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnQSByZXF1ZXN0IHRvIHNldCBhIGNvb2tpZVxcJ3MgdmFsdWUgY291bGQgbm90IGJlIHNhdGlzZmllZC4nLFxuICAgICAgICAgIFVuYWJsZVRvU2V0Q29va2llRXJyb3IuY29kZSgpLCBVbmFibGVUb1NldENvb2tpZUVycm9yLnczY1N0YXR1cygpLCBVbmFibGVUb1NldENvb2tpZUVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIFVuZXhwZWN0ZWRBbGVydE9wZW5FcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDI2O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICd1bmV4cGVjdGVkIGFsZXJ0IG9wZW4nO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0EgbW9kYWwgZGlhbG9nIHdhcyBvcGVuLCBibG9ja2luZyB0aGlzIG9wZXJhdGlvbicsXG4gICAgICAgICAgVW5leHBlY3RlZEFsZXJ0T3BlbkVycm9yLmNvZGUoKSwgVW5leHBlY3RlZEFsZXJ0T3BlbkVycm9yLnczY1N0YXR1cygpLCBVbmV4cGVjdGVkQWxlcnRPcGVuRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgTm9BbGVydE9wZW5FcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDI3O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuTk9UX0ZPVU5EO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdubyBzdWNoIGFsZXJ0JztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBhdHRlbXB0IHdhcyBtYWRlIHRvIG9wZXJhdGUgb24gYSBtb2RhbCBkaWFsb2cgd2hlbiBvbmUgJyArXG4gICAgICAgICAgJ3dhcyBub3Qgb3Blbi4nLCBOb0FsZXJ0T3BlbkVycm9yLmNvZGUoKSwgTm9BbGVydE9wZW5FcnJvci53M2NTdGF0dXMoKSwgTm9BbGVydE9wZW5FcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBOb1N1Y2hBbGVydEVycm9yIGV4dGVuZHMgTm9BbGVydE9wZW5FcnJvciB7fVxuXG5jbGFzcyBTY3JpcHRUaW1lb3V0RXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAyODtcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLlJFUVVFU1RfVElNRU9VVDtcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAnc2NyaXB0IHRpbWVvdXQnO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0Egc2NyaXB0IGRpZCBub3QgY29tcGxldGUgYmVmb3JlIGl0cyB0aW1lb3V0IGV4cGlyZWQuJyxcbiAgICAgICAgICBTY3JpcHRUaW1lb3V0RXJyb3IuY29kZSgpLCBTY3JpcHRUaW1lb3V0RXJyb3IudzNjU3RhdHVzKCksIFNjcmlwdFRpbWVvdXRFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBJbnZhbGlkRWxlbWVudENvb3JkaW5hdGVzRXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAyOTtcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLkJBRF9SRVFVRVNUO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdpbnZhbGlkIGNvb3JkaW5hdGVzJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdUaGUgY29vcmRpbmF0ZXMgcHJvdmlkZWQgdG8gYW4gaW50ZXJhY3Rpb25zIG9wZXJhdGlvbiBhcmUgaW52YWxpZC4nLFxuICAgICAgICAgIEludmFsaWRFbGVtZW50Q29vcmRpbmF0ZXNFcnJvci5jb2RlKCksIEludmFsaWRFbGVtZW50Q29vcmRpbmF0ZXNFcnJvci53M2NTdGF0dXMoKSxcbiAgICAgICAgICBJbnZhbGlkRWxlbWVudENvb3JkaW5hdGVzRXJyb3IuZXJyb3IoKSk7XG4gIH1cbn1cblxuY2xhc3MgSW52YWxpZENvb3JkaW5hdGVzRXJyb3IgZXh0ZW5kcyBJbnZhbGlkRWxlbWVudENvb3JkaW5hdGVzRXJyb3Ige31cblxuY2xhc3MgSU1FTm90QXZhaWxhYmxlRXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAzMDtcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUjtcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAndW5zdXBwb3J0ZWQgb3BlcmF0aW9uJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdJTUUgd2FzIG5vdCBhdmFpbGFibGUuJywgSU1FTm90QXZhaWxhYmxlRXJyb3IuY29kZSgpLFxuICAgICAgICAgIElNRU5vdEF2YWlsYWJsZUVycm9yLnczY1N0YXR1cygpLCBJTUVOb3RBdmFpbGFibGVFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBJTUVFbmdpbmVBY3RpdmF0aW9uRmFpbGVkRXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAzMTtcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUjtcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAndW5zdXBwb3J0ZWQgb3BlcmF0aW9uJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdBbiBJTUUgZW5naW5lIGNvdWxkIG5vdCBiZSBzdGFydGVkLicsXG4gICAgICAgICAgSU1FRW5naW5lQWN0aXZhdGlvbkZhaWxlZEVycm9yLmNvZGUoKSwgSU1FRW5naW5lQWN0aXZhdGlvbkZhaWxlZEVycm9yLnczY1N0YXR1cygpLFxuICAgICAgICAgIElNRUVuZ2luZUFjdGl2YXRpb25GYWlsZWRFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBJbnZhbGlkU2VsZWN0b3JFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDMyO1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuQkFEX1JFUVVFU1Q7XG4gIH1cbiAgc3RhdGljIGVycm9yICgpIHtcbiAgICByZXR1cm4gJ2ludmFsaWQgc2VsZWN0b3InO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0FyZ3VtZW50IHdhcyBhbiBpbnZhbGlkIHNlbGVjdG9yIChlLmcuIFhQYXRoL0NTUykuJyxcbiAgICAgICAgICBJbnZhbGlkU2VsZWN0b3JFcnJvci5jb2RlKCksIEludmFsaWRTZWxlY3RvckVycm9yLnczY1N0YXR1cygpLFxuICAgICAgICAgIEludmFsaWRTZWxlY3RvckVycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIFNlc3Npb25Ob3RDcmVhdGVkRXJyb3IgZXh0ZW5kcyBQcm90b2NvbEVycm9yIHtcbiAgc3RhdGljIGNvZGUgKCkge1xuICAgIHJldHVybiAzMztcbiAgfVxuICBzdGF0aWMgdzNjU3RhdHVzICgpIHtcbiAgICByZXR1cm4gSFRUUFN0YXR1c0NvZGVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUjtcbiAgfVxuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAnc2Vzc2lvbiBub3QgY3JlYXRlZCc7XG4gIH1cbiAgY29uc3RydWN0b3IgKGRldGFpbHMpIHtcbiAgICBsZXQgbWVzc2FnZSA9ICdBIG5ldyBzZXNzaW9uIGNvdWxkIG5vdCBiZSBjcmVhdGVkLic7XG4gICAgaWYgKGRldGFpbHMpIHtcbiAgICAgIG1lc3NhZ2UgKz0gYCBEZXRhaWxzOiAke2RldGFpbHN9YDtcbiAgICB9XG5cbiAgICBzdXBlcihtZXNzYWdlLCBTZXNzaW9uTm90Q3JlYXRlZEVycm9yLmNvZGUoKSwgU2Vzc2lvbk5vdENyZWF0ZWRFcnJvci53M2NTdGF0dXMoKSwgU2Vzc2lvbk5vdENyZWF0ZWRFcnJvci5lcnJvcigpKTtcbiAgfVxufVxuXG5jbGFzcyBNb3ZlVGFyZ2V0T3V0T2ZCb3VuZHNFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDM0O1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICdtb3ZlIHRhcmdldCBvdXQgb2YgYm91bmRzJztcbiAgfVxuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdUYXJnZXQgcHJvdmlkZWQgZm9yIGEgbW92ZSBhY3Rpb24gaXMgb3V0IG9mIGJvdW5kcy4nLFxuICAgICAgICAgIE1vdmVUYXJnZXRPdXRPZkJvdW5kc0Vycm9yLmNvZGUoKSwgTW92ZVRhcmdldE91dE9mQm91bmRzRXJyb3IudzNjU3RhdHVzKCksIE1vdmVUYXJnZXRPdXRPZkJvdW5kc0Vycm9yLmVycm9yKCkpO1xuICB9XG59XG5cbmNsYXNzIE5vU3VjaENvbnRleHRFcnJvciBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDM1O1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ05vIHN1Y2ggY29udGV4dCBmb3VuZC4nLCBOb1N1Y2hDb250ZXh0RXJyb3IuY29kZSgpKTtcbiAgfVxufVxuXG5jbGFzcyBJbnZhbGlkQ29udGV4dEVycm9yIGV4dGVuZHMgUHJvdG9jb2xFcnJvciB7XG4gIHN0YXRpYyBjb2RlICgpIHtcbiAgICByZXR1cm4gMzY7XG4gIH1cbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnVGhhdCBjb21tYW5kIGNvdWxkIG5vdCBiZSBleGVjdXRlZCBpbiB0aGUgY3VycmVudCBjb250ZXh0LicsXG4gICAgICAgICAgSW52YWxpZENvbnRleHRFcnJvci5jb2RlKCkpO1xuICB9XG59XG5cbi8vIFRoZXNlIGFyZSBhbGlhc2VzIGZvciBVbmtub3duTWV0aG9kRXJyb3JcbmNsYXNzIE5vdFlldEltcGxlbWVudGVkRXJyb3IgZXh0ZW5kcyBVbmtub3duTWV0aG9kRXJyb3Ige1xuICBjb25zdHJ1Y3RvciAoZXJyKSB7XG4gICAgc3VwZXIoZXJyIHx8ICdNZXRob2QgaGFzIG5vdCB5ZXQgYmVlbiBpbXBsZW1lbnRlZCcpO1xuICB9XG59XG5jbGFzcyBOb3RJbXBsZW1lbnRlZEVycm9yIGV4dGVuZHMgVW5rbm93bk1ldGhvZEVycm9yIHtcbiAgY29uc3RydWN0b3IgKGVycikge1xuICAgIHN1cGVyKGVyciB8fCAnTWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZCcpO1xuICB9XG59XG5cbmNsYXNzIFVuYWJsZVRvQ2FwdHVyZVNjcmVlbiBleHRlbmRzIFByb3RvY29sRXJyb3Ige1xuICBzdGF0aWMgY29kZSAoKSB7XG4gICAgcmV0dXJuIDYzO1xuICB9XG4gIHN0YXRpYyB3M2NTdGF0dXMgKCkge1xuICAgIHJldHVybiBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICB9XG4gIHN0YXRpYyBlcnJvciAoKSB7XG4gICAgcmV0dXJuICd1bmFibGUgdG8gY2FwdHVyZSBzY3JlZW4nO1xuICB9XG4gIGNvbnN0cnVjdG9yIChlcnIpIHtcbiAgICBzdXBlcihlcnIgfHwgJ0Egc2NyZWVuIGNhcHR1cmUgd2FzIG1hZGUgaW1wb3NzaWJsZScsXG4gICAgICAgICAgVW5hYmxlVG9DYXB0dXJlU2NyZWVuLmNvZGUoKSwgVW5hYmxlVG9DYXB0dXJlU2NyZWVuLnczY1N0YXR1cygpLCBVbmFibGVUb0NhcHR1cmVTY3JlZW4uZXJyb3IoKSk7XG4gIH1cbn1cblxuXG4vLyBFcXVpdmFsZW50IHRvIFczQyBJbnZhbGlkQXJndW1lbnRFcnJvclxuY2xhc3MgQmFkUGFyYW1ldGVyc0Vycm9yIGV4dGVuZHMgRVM2RXJyb3Ige1xuICBzdGF0aWMgZXJyb3IgKCkge1xuICAgIHJldHVybiAnaW52YWxpZCBhcmd1bWVudCc7XG4gIH1cbiAgY29uc3RydWN0b3IgKHJlcXVpcmVkUGFyYW1zLCBhY3R1YWxQYXJhbXMsIGVyck1lc3NhZ2UpIHtcbiAgICBsZXQgbWVzc2FnZTtcbiAgICBpZiAoIWVyck1lc3NhZ2UpIHtcbiAgICAgIG1lc3NhZ2UgPSBgUGFyYW1ldGVycyB3ZXJlIGluY29ycmVjdC4gV2Ugd2FudGVkIGAgK1xuICAgICAgICAgIGAke0pTT04uc3RyaW5naWZ5KHJlcXVpcmVkUGFyYW1zKX0gYW5kIHlvdSBgICtcbiAgICAgICAgICBgc2VudCAke0pTT04uc3RyaW5naWZ5KGFjdHVhbFBhcmFtcyl9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZSA9IGBQYXJhbWV0ZXJzIHdlcmUgaW5jb3JyZWN0LiBZb3Ugc2VudCAke0pTT04uc3RyaW5naWZ5KGFjdHVhbFBhcmFtcyl9LCAke2Vyck1lc3NhZ2V9YDtcbiAgICB9XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy53M2NTdGF0dXMgPSBIVFRQU3RhdHVzQ29kZXMuQkFEX1JFUVVFU1Q7XG4gIH1cbn1cblxuLyoqXG4gKiBQcm94eVJlcXVlc3RFcnJvciBpcyBhIGN1c3RvbSBlcnJvciBhbmQgd2lsbCBiZSB0aHJvd24gdXAgb24gdW5zdWNjZXNzZnVsIHByb3h5IHJlcXVlc3QgYW5kXG4gKiB3aWxsIGNvbnRhaW4gaW5mb3JtYXRpb24gYWJvdXQgdGhlIHByb3h5IGZhaWx1cmUuXG4gKiBJbiBjYXNlIG9mIFByb3h5UmVxdWVzdEVycm9yIHNob3VsZCBmZXRjaCB0aGUgYWN0dWFsIGVycm9yIGJ5IGNhbGxpbmcgYGdldEFjdHVhbEVycm9yKClgXG4gKiBmb3IgcHJveHkgZmFpbHVyZSB0byBnZW5lcmF0ZSB0aGUgY2xpZW50IHJlc3BvbnNlLlxuICovXG5jbGFzcyBQcm94eVJlcXVlc3RFcnJvciBleHRlbmRzIEVTNkVycm9yIHtcbiAgY29uc3RydWN0b3IgKGVyciwgcmVzcG9uc2VFcnJvciwgaHR0cFN0YXR1cykge1xuICAgIGxldCByZXNwb25zZUVycm9yT2JqID0gdXRpbC5zYWZlSnNvblBhcnNlKHJlc3BvbnNlRXJyb3IpO1xuICAgIGlmICghXy5pc1BsYWluT2JqZWN0KHJlc3BvbnNlRXJyb3JPYmopKSB7XG4gICAgICByZXNwb25zZUVycm9yT2JqID0ge307XG4gICAgfVxuICAgIGxldCBvcmlnTWVzc2FnZSA9IF8uaXNTdHJpbmcocmVzcG9uc2VFcnJvcikgPyByZXNwb25zZUVycm9yIDogJyc7XG4gICAgaWYgKCFfLmlzRW1wdHkocmVzcG9uc2VFcnJvck9iaikpIHtcbiAgICAgIGlmIChfLmlzU3RyaW5nKHJlc3BvbnNlRXJyb3JPYmoudmFsdWUpKSB7XG4gICAgICAgIG9yaWdNZXNzYWdlID0gcmVzcG9uc2VFcnJvck9iai52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoXy5pc1BsYWluT2JqZWN0KHJlc3BvbnNlRXJyb3JPYmoudmFsdWUpICYmIF8uaXNTdHJpbmcocmVzcG9uc2VFcnJvck9iai52YWx1ZS5tZXNzYWdlKSkge1xuICAgICAgICBvcmlnTWVzc2FnZSA9IHJlc3BvbnNlRXJyb3JPYmoudmFsdWUubWVzc2FnZTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3VwZXIoXy5pc0VtcHR5KGVycikgPyBgUHJveHkgcmVxdWVzdCB1bnN1Y2Nlc3NmdWwuICR7b3JpZ01lc3NhZ2V9YCA6IGVycik7XG5cbiAgICB0aGlzLnczY1N0YXR1cyA9IEhUVFBTdGF0dXNDb2Rlcy5CQURfUkVRVUVTVDtcblxuICAgIC8vIElmIHRoZSByZXNwb25zZSBlcnJvciBpcyBhbiBvYmplY3QgYW5kIHZhbHVlIGlzIGFuIG9iamVjdCwgaXQncyBhIFczQyBlcnJvciAoZm9yIEpTT05XUCB2YWx1ZSBpcyBhIHN0cmluZylcbiAgICBpZiAoXy5pc1BsYWluT2JqZWN0KHJlc3BvbnNlRXJyb3JPYmoudmFsdWUpICYmIF8uaGFzKHJlc3BvbnNlRXJyb3JPYmoudmFsdWUsICdlcnJvcicpKSB7XG4gICAgICB0aGlzLnczYyA9IHJlc3BvbnNlRXJyb3JPYmoudmFsdWU7XG4gICAgICB0aGlzLnczY1N0YXR1cyA9IGh0dHBTdGF0dXMgfHwgSFRUUFN0YXR1c0NvZGVzLkJBRF9SRVFVRVNUO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmpzb253cCA9IHJlc3BvbnNlRXJyb3JPYmo7XG4gICAgfVxuICB9XG5cbiAgZ2V0QWN0dWFsRXJyb3IgKCkge1xuICAgIC8vIElmIGl0J3MgTUpTT05XUCBlcnJvciwgcmV0dXJucyBhY3R1YWwgZXJyb3IgY2F1c2UgZm9yIHJlcXVlc3QgZmFpbHVyZSBiYXNlZCBvbiBganNvbndwLnN0YXR1c2BcbiAgICBpZiAodXRpbC5oYXNWYWx1ZSh0aGlzLmpzb253cCkgJiYgdXRpbC5oYXNWYWx1ZSh0aGlzLmpzb253cC5zdGF0dXMpICYmIHV0aWwuaGFzVmFsdWUodGhpcy5qc29ud3AudmFsdWUpKSB7XG4gICAgICByZXR1cm4gZXJyb3JGcm9tTUpTT05XUFN0YXR1c0NvZGUodGhpcy5qc29ud3Auc3RhdHVzLCB0aGlzLmpzb253cC52YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh1dGlsLmhhc1ZhbHVlKHRoaXMudzNjKSAmJiBfLmlzTnVtYmVyKHRoaXMudzNjU3RhdHVzKSAmJiB0aGlzLnczY1N0YXR1cyA+PSAzMDApIHtcbiAgICAgIHJldHVybiBlcnJvckZyb21XM0NKc29uQ29kZSh0aGlzLnczYy5lcnJvciwgdGhpcy53M2MubWVzc2FnZSB8fCB0aGlzLm1lc3NhZ2UsIHRoaXMudzNjLnN0YWNrdHJhY2UpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFVua25vd25FcnJvcih0aGlzLm1lc3NhZ2UpO1xuICB9XG59XG4vLyBtYXAgb2YgZXJyb3IgY2xhc3MgbmFtZSB0byBlcnJvciBjbGFzc1xuY29uc3QgZXJyb3JzID0ge05vdFlldEltcGxlbWVudGVkRXJyb3IsXG4gICAgICAgICAgICAgICAgTm90SW1wbGVtZW50ZWRFcnJvcixcbiAgICAgICAgICAgICAgICBCYWRQYXJhbWV0ZXJzRXJyb3IsXG4gICAgICAgICAgICAgICAgSW52YWxpZEFyZ3VtZW50RXJyb3IsXG4gICAgICAgICAgICAgICAgTm9TdWNoRHJpdmVyRXJyb3IsXG4gICAgICAgICAgICAgICAgTm9TdWNoRWxlbWVudEVycm9yLFxuICAgICAgICAgICAgICAgIFVua25vd25Db21tYW5kRXJyb3IsXG4gICAgICAgICAgICAgICAgU3RhbGVFbGVtZW50UmVmZXJlbmNlRXJyb3IsXG4gICAgICAgICAgICAgICAgRWxlbWVudE5vdFZpc2libGVFcnJvcixcbiAgICAgICAgICAgICAgICBJbnZhbGlkRWxlbWVudFN0YXRlRXJyb3IsXG4gICAgICAgICAgICAgICAgVW5rbm93bkVycm9yLFxuICAgICAgICAgICAgICAgIEVsZW1lbnRJc05vdFNlbGVjdGFibGVFcnJvcixcbiAgICAgICAgICAgICAgICBFbGVtZW50Q2xpY2tJbnRlcmNlcHRlZEVycm9yLFxuICAgICAgICAgICAgICAgIEVsZW1lbnROb3RJbnRlcmFjdGFibGVFcnJvcixcbiAgICAgICAgICAgICAgICBJbnNlY3VyZUNlcnRpZmljYXRlRXJyb3IsXG4gICAgICAgICAgICAgICAgSmF2YVNjcmlwdEVycm9yLFxuICAgICAgICAgICAgICAgIFhQYXRoTG9va3VwRXJyb3IsXG4gICAgICAgICAgICAgICAgVGltZW91dEVycm9yLFxuICAgICAgICAgICAgICAgIE5vU3VjaFdpbmRvd0Vycm9yLFxuICAgICAgICAgICAgICAgIE5vU3VjaENvb2tpZUVycm9yLFxuICAgICAgICAgICAgICAgIEludmFsaWRDb29raWVEb21haW5FcnJvcixcbiAgICAgICAgICAgICAgICBJbnZhbGlkQ29vcmRpbmF0ZXNFcnJvcixcbiAgICAgICAgICAgICAgICBVbmFibGVUb1NldENvb2tpZUVycm9yLFxuICAgICAgICAgICAgICAgIFVuZXhwZWN0ZWRBbGVydE9wZW5FcnJvcixcbiAgICAgICAgICAgICAgICBOb0FsZXJ0T3BlbkVycm9yLFxuICAgICAgICAgICAgICAgIFNjcmlwdFRpbWVvdXRFcnJvcixcbiAgICAgICAgICAgICAgICBJbnZhbGlkRWxlbWVudENvb3JkaW5hdGVzRXJyb3IsXG4gICAgICAgICAgICAgICAgSU1FTm90QXZhaWxhYmxlRXJyb3IsXG4gICAgICAgICAgICAgICAgSU1FRW5naW5lQWN0aXZhdGlvbkZhaWxlZEVycm9yLFxuICAgICAgICAgICAgICAgIEludmFsaWRTZWxlY3RvckVycm9yLFxuICAgICAgICAgICAgICAgIFNlc3Npb25Ob3RDcmVhdGVkRXJyb3IsXG4gICAgICAgICAgICAgICAgTW92ZVRhcmdldE91dE9mQm91bmRzRXJyb3IsXG4gICAgICAgICAgICAgICAgTm9TdWNoQWxlcnRFcnJvcixcbiAgICAgICAgICAgICAgICBOb1N1Y2hDb250ZXh0RXJyb3IsXG4gICAgICAgICAgICAgICAgSW52YWxpZENvbnRleHRFcnJvcixcbiAgICAgICAgICAgICAgICBOb1N1Y2hGcmFtZUVycm9yLFxuICAgICAgICAgICAgICAgIFVuYWJsZVRvQ2FwdHVyZVNjcmVlbixcbiAgICAgICAgICAgICAgICBVbmtub3duTWV0aG9kRXJyb3IsXG4gICAgICAgICAgICAgICAgVW5zdXBwb3J0ZWRPcGVyYXRpb25FcnJvcixcbiAgICAgICAgICAgICAgICBQcm94eVJlcXVlc3RFcnJvcn07XG5cbi8vIG1hcCBvZiBlcnJvciBjb2RlIHRvIGVycm9yIGNsYXNzXG5jb25zdCBqc29ud3BFcnJvckNvZGVNYXAgPSB7fTtcbmZvciAobGV0IEVycm9yQ2xhc3Mgb2YgXy52YWx1ZXMoZXJyb3JzKSkge1xuICBpZiAoRXJyb3JDbGFzcy5jb2RlKSB7XG4gICAganNvbndwRXJyb3JDb2RlTWFwW0Vycm9yQ2xhc3MuY29kZSgpXSA9IEVycm9yQ2xhc3M7XG4gIH1cbn1cblxuY29uc3QgdzNjRXJyb3JDb2RlTWFwID0ge307XG5mb3IgKGxldCBFcnJvckNsYXNzIG9mIF8udmFsdWVzKGVycm9ycykpIHtcbiAgaWYgKEVycm9yQ2xhc3MuZXJyb3IpIHtcbiAgICB3M2NFcnJvckNvZGVNYXBbRXJyb3JDbGFzcy5lcnJvcigpXSA9IEVycm9yQ2xhc3M7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNVbmtub3duRXJyb3IgKGVycikge1xuICByZXR1cm4gIWVyci5jb25zdHJ1Y3Rvci5uYW1lIHx8XG4gICAgICAgICAhXy52YWx1ZXMoZXJyb3JzKS5maW5kKGZ1bmN0aW9uIGVxdWFsTmFtZXMgKGVycm9yKSB7XG4gICAgICAgICAgIHJldHVybiBlcnJvci5uYW1lID09PSBlcnIuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiBpc0Vycm9yVHlwZSAoZXJyLCB0eXBlKSB7XG4gIC8vIGBuYW1lYCBwcm9wZXJ0eSBpcyB0aGUgY29uc3RydWN0b3IgbmFtZVxuICBpZiAodHlwZS5uYW1lID09PSBQcm90b2NvbEVycm9yLm5hbWUpIHtcbiAgICAvLyBganNvbndwQ29kZWAgaXMgYDBgIG9uIHN1Y2Nlc3NcbiAgICByZXR1cm4gISFlcnIuanNvbndwQ29kZTtcbiAgfSBlbHNlIGlmICh0eXBlLm5hbWUgPT09IFByb3h5UmVxdWVzdEVycm9yLm5hbWUpIHtcbiAgICAvLyBgc3RhdHVzYCBpcyBgMGAgb24gc3VjY2Vzc1xuICAgIGlmIChlcnIuanNvbndwKSB7XG4gICAgICByZXR1cm4gISFlcnIuanNvbndwLnN0YXR1cztcbiAgICB9XG5cbiAgICBpZiAoXy5pc1BsYWluT2JqZWN0KGVyci53M2MpKSB7XG4gICAgICByZXR1cm4gXy5pc051bWJlcihlcnIudzNjU3RhdHVzKSAmJiBlcnIudzNjU3RhdHVzID49IDMwMDtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGVyci5jb25zdHJ1Y3Rvci5uYW1lID09PSB0eXBlLm5hbWU7XG59XG5cbi8qKlxuICogUmV0cmlldmUgYW4gZXJyb3IgZGVyaXZlZCBmcm9tIE1KU09OV1Agc3RhdHVzXG4gKiBAcGFyYW0ge251bWJlcn0gY29kZSBKU09OV1Agc3RhdHVzIGNvZGVcbiAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdH0gdmFsdWUgVGhlIGVycm9yIG1lc3NhZ2UsIG9yIGFuIG9iamVjdCB3aXRoIGEgYG1lc3NhZ2VgIHByb3BlcnR5XG4gKiBAcmV0dXJuIHtQcm90b2NvbEVycm9yfSBUaGUgZXJyb3IgdGhhdCBpcyBhc3NvY2lhdGVkIHdpdGggcHJvdmlkZWQgSlNPTldQIHN0YXR1cyBjb2RlXG4gKi9cbmZ1bmN0aW9uIGVycm9yRnJvbU1KU09OV1BTdGF0dXNDb2RlIChjb2RlLCB2YWx1ZSA9ICcnKSB7XG4gIC8vIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBwdWxsIG1lc3NhZ2UgZnJvbSBpdCwgb3RoZXJ3aXNlIHVzZSB0aGUgcGxhaW5cbiAgLy8gdmFsdWUsIG9yIGRlZmF1bHQgdG8gYW4gZW1wdHkgc3RyaW5nLCBpZiBudWxsXG4gIGNvbnN0IG1lc3NhZ2UgPSAodmFsdWUgfHwge30pLm1lc3NhZ2UgfHwgdmFsdWUgfHwgJyc7XG4gIGlmIChjb2RlICE9PSBVbmtub3duRXJyb3IuY29kZSgpICYmIGpzb253cEVycm9yQ29kZU1hcFtjb2RlXSkge1xuICAgIG1qc29ud3BMb2cuZGVidWcoYE1hdGNoZWQgSlNPTldQIGVycm9yIGNvZGUgJHtjb2RlfSB0byAke2pzb253cEVycm9yQ29kZU1hcFtjb2RlXS5uYW1lfWApO1xuICAgIHJldHVybiBuZXcganNvbndwRXJyb3JDb2RlTWFwW2NvZGVdKG1lc3NhZ2UpO1xuICB9XG4gIG1qc29ud3BMb2cuZGVidWcoYE1hdGNoZWQgSlNPTldQIGVycm9yIGNvZGUgJHtjb2RlfSB0byBVbmtub3duRXJyb3JgKTtcbiAgcmV0dXJuIG5ldyBVbmtub3duRXJyb3IobWVzc2FnZSk7XG59XG5cbi8qKlxuICogUmV0cmlldmUgYW4gZXJyb3IgZGVyaXZlZCBmcm9tIFczQyBKU09OIENvZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIFczQyBlcnJvciBzdHJpbmcgKHNlZSBodHRwczovL3d3dy53My5vcmcvVFIvd2ViZHJpdmVyLyNoYW5kbGluZy1lcnJvcnMgYEpTT04gRXJyb3IgQ29kZWAgY29sdW1uKVxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgdGhlIGVycm9yIG1lc3NhZ2VcbiAqIEBwYXJhbSB7P3N0cmluZ30gc3RhY2t0cmFjZSBhbiBvcHRpb25hbCBlcnJvciBzdGFja3RyYWNlXG4gKiBAcmV0dXJuIHtQcm90b2NvbEVycm9yfSAgVGhlIGVycm9yIHRoYXQgaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBXM0MgZXJyb3Igc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGVycm9yRnJvbVczQ0pzb25Db2RlIChjb2RlLCBtZXNzYWdlLCBzdGFja3RyYWNlID0gbnVsbCkge1xuICBpZiAoY29kZSAmJiB3M2NFcnJvckNvZGVNYXBbY29kZS50b0xvd2VyQ2FzZSgpXSkge1xuICAgIHczY0xvZy5kZWJ1ZyhgTWF0Y2hlZCBXM0MgZXJyb3IgY29kZSAnJHtjb2RlfScgdG8gJHt3M2NFcnJvckNvZGVNYXBbY29kZS50b0xvd2VyQ2FzZSgpXS5uYW1lfWApO1xuICAgIGNvbnN0IHJlc3VsdEVycm9yID0gbmV3IHczY0Vycm9yQ29kZU1hcFtjb2RlLnRvTG93ZXJDYXNlKCldKG1lc3NhZ2UpO1xuICAgIHJlc3VsdEVycm9yLnN0YWNrdHJhY2UgPSBzdGFja3RyYWNlO1xuICAgIHJldHVybiByZXN1bHRFcnJvcjtcbiAgfVxuICB3M2NMb2cuZGVidWcoYE1hdGNoZWQgVzNDIGVycm9yIGNvZGUgJyR7Y29kZX0nIHRvIFVua25vd25FcnJvcmApO1xuICBjb25zdCByZXN1bHRFcnJvciA9IG5ldyBVbmtub3duRXJyb3IobWVzc2FnZSk7XG4gIHJlc3VsdEVycm9yLnN0YWNrdHJhY2UgPSBzdGFja3RyYWNlO1xuICByZXR1cm4gcmVzdWx0RXJyb3I7XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBBcHBpdW0gZXJyb3IgdG8gcHJvcGVyIFczQyBIVFRQIHJlc3BvbnNlXG4gKiBAcGFyYW0ge1Byb3RvY29sRXJyb3J9IGVyciBUaGUgZXJyb3IgdGhhdCBuZWVkcyB0byBiZSB0cmFuc2xhdGVkXG4gKi9cbmZ1bmN0aW9uIGdldFJlc3BvbnNlRm9yVzNDRXJyb3IgKGVycikge1xuICBsZXQgaHR0cFN0YXR1cztcblxuICAvLyBXM0MgZGVmaW5lZCBlcnJvciBtZXNzYWdlIChodHRwczovL3d3dy53My5vcmcvVFIvd2ViZHJpdmVyLyNkZm4tZXJyb3ItY29kZSlcbiAgbGV0IHczY0Vycm9yU3RyaW5nO1xuXG4gIGlmICghZXJyLnczY1N0YXR1cykge1xuICAgIGVyciA9IHV0aWwuaGFzVmFsdWUoZXJyLnN0YXR1cylcbiAgICAgIC8vIElmIGl0J3MgYSBKU09OV1AgZXJyb3IsIGZpbmQgY29ycmVzcG9uZGluZyBlcnJvclxuICAgICAgPyBlcnJvckZyb21NSlNPTldQU3RhdHVzQ29kZShlcnIuc3RhdHVzLCBlcnIudmFsdWUpXG4gICAgICA6IG5ldyBlcnJvcnMuVW5rbm93bkVycm9yKGVyci5tZXNzYWdlKTtcbiAgfVxuXG4gIGlmIChpc0Vycm9yVHlwZShlcnIsIGVycm9ycy5CYWRQYXJhbWV0ZXJzRXJyb3IpKSB7XG4gICAgLy8gcmVzcG9uZCB3aXRoIGEgNDAwIGlmIHdlIGhhdmUgYmFkIHBhcmFtZXRlcnNcbiAgICB3M2NMb2cuZGVidWcoYEJhZCBwYXJhbWV0ZXJzOiAke2Vycn1gKTtcbiAgICB3M2NFcnJvclN0cmluZyA9IEJhZFBhcmFtZXRlcnNFcnJvci5lcnJvcigpO1xuICB9IGVsc2Uge1xuICAgIHczY0Vycm9yU3RyaW5nID0gZXJyLmVycm9yO1xuICB9XG5cbiAgaHR0cFN0YXR1cyA9IGVyci53M2NTdGF0dXM7XG5cbiAgaWYgKCF3M2NFcnJvclN0cmluZykge1xuICAgIHczY0Vycm9yU3RyaW5nID0gVW5rbm93bkVycm9yLmVycm9yKCk7XG4gIH1cblxuICBsZXQgaHR0cFJlc0JvZHkgPSB7XG4gICAgdmFsdWU6IHtcbiAgICAgIGVycm9yOiB3M2NFcnJvclN0cmluZyxcbiAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlLFxuICAgICAgc3RhY2t0cmFjZTogZXJyLnN0YWNrdHJhY2UgfHwgZXJyLnN0YWNrLFxuICAgIH1cbiAgfTtcbiAgcmV0dXJuIFtodHRwU3RhdHVzLCBodHRwUmVzQm9keV07XG59XG5cbi8qKlxuICogQ29udmVydCBhbiBBcHBpdW0gZXJyb3IgdG8gYSBwcm9wZXIgSlNPTldQIHJlc3BvbnNlXG4gKiBAcGFyYW0ge1Byb3RvY29sRXJyb3J9IGVyciBUaGUgZXJyb3IgdG8gYmUgY29udmVydGVkXG4gKi9cbmZ1bmN0aW9uIGdldFJlc3BvbnNlRm9ySnNvbndwRXJyb3IgKGVycikge1xuICBpZiAoaXNVbmtub3duRXJyb3IoZXJyKSkge1xuICAgIGVyciA9IG5ldyBlcnJvcnMuVW5rbm93bkVycm9yKGVycik7XG4gIH1cbiAgLy8gTUpTT05XUCBlcnJvcnMgYXJlIHVzdWFsbHkgNTAwIHN0YXR1cyBjb2RlIHNvIHNldCBpdCB0byB0aGF0IGJ5IGRlZmF1bHRcbiAgbGV0IGh0dHBTdGF0dXMgPSBIVFRQU3RhdHVzQ29kZXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICBsZXQgaHR0cFJlc0JvZHkgPSB7XG4gICAgc3RhdHVzOiBlcnIuanNvbndwQ29kZSxcbiAgICB2YWx1ZToge1xuICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2VcbiAgICB9XG4gIH07XG5cbiAgaWYgKGlzRXJyb3JUeXBlKGVyciwgZXJyb3JzLkJhZFBhcmFtZXRlcnNFcnJvcikpIHtcbiAgICAvLyByZXNwb25kIHdpdGggYSA0MDAgaWYgd2UgaGF2ZSBiYWQgcGFyYW1ldGVyc1xuICAgIG1qc29ud3BMb2cuZGVidWcoYEJhZCBwYXJhbWV0ZXJzOiAke2Vycn1gKTtcbiAgICBodHRwU3RhdHVzID0gSFRUUFN0YXR1c0NvZGVzLkJBRF9SRVFVRVNUO1xuICAgIGh0dHBSZXNCb2R5ID0gZXJyLm1lc3NhZ2U7XG4gIH0gZWxzZSBpZiAoaXNFcnJvclR5cGUoZXJyLCBlcnJvcnMuTm90WWV0SW1wbGVtZW50ZWRFcnJvcikgfHxcbiAgICAgICAgICAgICBpc0Vycm9yVHlwZShlcnIsIGVycm9ycy5Ob3RJbXBsZW1lbnRlZEVycm9yKSkge1xuICAgIC8vIHJlc3BvbmQgd2l0aCBhIDUwMSBpZiB0aGUgbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZFxuICAgIGh0dHBTdGF0dXMgPSBIVFRQU3RhdHVzQ29kZXMuTk9UX0lNUExFTUVOVEVEO1xuICB9IGVsc2UgaWYgKGlzRXJyb3JUeXBlKGVyciwgZXJyb3JzLk5vU3VjaERyaXZlckVycm9yKSkge1xuICAgIC8vIHJlc3BvbmQgd2l0aCBhIDQwNCBpZiB0aGVyZSBpcyBubyBkcml2ZXIgZm9yIHRoZSBzZXNzaW9uXG4gICAgaHR0cFN0YXR1cyA9IEhUVFBTdGF0dXNDb2Rlcy5OT1RfRk9VTkQ7XG4gIH1cblxuXG4gIHJldHVybiBbaHR0cFN0YXR1cywgaHR0cFJlc0JvZHldO1xufVxuXG5leHBvcnQge1xuICBQcm90b2NvbEVycm9yLCBlcnJvcnMsIGlzRXJyb3JUeXBlLCBpc1Vua25vd25FcnJvcixcbiAgZXJyb3JGcm9tTUpTT05XUFN0YXR1c0NvZGUsIGVycm9yRnJvbVczQ0pzb25Db2RlLFxuICBnZXRSZXNwb25zZUZvclczQ0Vycm9yLCBnZXRSZXNwb25zZUZvckpzb253cEVycm9yLFxufTtcbiJdLCJmaWxlIjoibGliL3Byb3RvY29sL2Vycm9ycy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLiJ9
