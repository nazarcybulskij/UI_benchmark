'use strict'
let builder = require('xmlbuilder')
let _ = require('lodash')
let fs = require('fs')

const TYPES = {
  INT: 'int',
  FLOAT: 'float',
  LONG: 'long',
  BOOLEAN: 'boolean',
  SET: 'set',
  STRING: 'string'
}

class SharedPrefsBuilder {
  constructor (opts) {
    this.xml = builder.create('map').dec('1.0', 'UTF-8', true)
    this.debufg = !_.isUndefined(opts) &&
      opts.debug === true ? true : false // eslint-disable-line
  }

  createElement (name, value, type) {
    type = this.getType(type)
    value = this.fixValue(value, type)
    if (type !== TYPES.SET) {
      if (type !== TYPES.STRING) {
        return this.xml.ele(type, {name: name, value: value})
      } else {
        return this.xml.ele(type, {name: name}, value)
      }
    } else {
      let el = this.xml.ele(type, {name: name})
      for (let v in value) {
        el.ele(TYPES.STRING, value[v])
      }
      if (this.debug) {
        console.log('createElement', el.toString())
      }
      return el
    }
  }

  fixValue (value, type) {
    switch (type) {
      case TYPES.INT:
      case TYPES.LONG:
        return parseInt(value, 10)
      case TYPES.FLOAT: return parseFloat(value)
      case TYPES.BOOLEAN:
        return value ? true : false // eslint-disable-line
      case TYPES.SET: return value
    }
    if (_.isArray(value) || _.isPlainObject(value)) {
      return JSON.stringify(value)
    }
    return value.toString()
  }

  getType (type) {
    switch (type) {
      case TYPES.INT: return TYPES.INT
      case TYPES.FLOAT: return TYPES.FLOAT
      case TYPES.LONG: return TYPES.LONG
      case TYPES.BOOLEAN: return TYPES.BOOLEAN
      case TYPES.SET: return TYPES.SET
      default: return TYPES.STRING
    }
  }

  build (prefs) {
    for (let sp in prefs) {
      let pref = prefs[sp]
      if (_.isUndefined(pref.name)) {
        console.log('Undefined preference name, we\'ll skip this preference', pref)
      }
      this.createElement(pref.name, pref.value, pref.type)
    }
    this.xml.end({ pretty: true })
    if (this.debug) {
      console.log('createElement', this.xml.toString())
    }
    return this.xml
  }

  toString () {
    let str = this.xml.toString({
      pretty: true,
      indent: '  ',
      offset: 0,
      newline: '\n'
    })
    return `<?xml version="1.0" encoding="utf-8" standalone="yes" ?>\n${str}`
  }

  toFile (filename) {
    fs.writeFileSync(filename, this.toString())
  }
}

module.exports = { TYPES, SharedPrefsBuilder }
