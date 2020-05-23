let lib = require('../lib/')
const TYPES = lib.TYPES
let SharedPrefsBuilder = lib.SharedPrefsBuilder
let chai = require('chai')
let fs = require('fs')
let path = require('path')

chai.should()

describe('SharedPrefsBuilder', _ => {
  let prefs
  beforeEach(() => {
    prefs = new SharedPrefsBuilder()
  })
  it('getType', (done) => {
    prefs.getType().should.equal(TYPES.STRING)
    prefs.getType('set').should.equal(TYPES.SET)
    prefs.getType('int').should.equal(TYPES.INT)
    prefs.getType('long').should.equal(TYPES.LONG)
    prefs.getType('float').should.equal(TYPES.FLOAT)
    prefs.getType('boolean').should.equal(TYPES.BOOLEAN)
    prefs.getType('string').should.equal(TYPES.STRING)
    done()
  })
  it('fixValue', (done) => {
    prefs.fixValue('10', 'int').should.equal(10)
    prefs.fixValue('10', 'long').should.equal(10)
    prefs.fixValue('10.3', 'float').should.equal(10.3)
    prefs.fixValue('10', 'string').should.equal('10')
    prefs.fixValue(1, 'boolean').should.equal(true)
    prefs.fixValue(0, 'boolean').should.equal(false)
    prefs.fixValue(true, 'boolean').should.equal(true)
    prefs.fixValue(false, 'boolean').should.equal(false)
    prefs.fixValue('something', 'boolean').should.equal(true)
    prefs.fixValue([1, 2, 3], 'string').should.equal('[1,2,3]')
    prefs.fixValue({name: 'appium'}, 'string').should.equal('{"name":"appium"}')
    done()
  })
  describe('createElement', _ => {
    it('int', (done) => {
      (prefs.createElement('number', 1, 'int')).toString().should.equal('<int name="number" value="1"/>')
      done()
    })
    it('long', (done) => {
      (prefs.createElement('long', 123456789, 'long')).toString().should.equal('<long name="long" value="123456789"/>')
      done()
    })
    it('float', (done) => {
      (prefs.createElement('f', 10.3, 'float')).toString().should.equal('<float name="f" value="10.3"/>')
      done()
    })
    it('boolean', (done) => {
      (prefs.createElement('flag', 1, 'boolean')).toString().should.equal('<boolean name="flag" value="true"/>')
      done()
    })
    it('string', (done) => {
      (prefs.createElement('str', 'im a string')).toString().should.equal('<string name="str">im a string</string>')
      done()
    })
    it('set', (done) => {
      (prefs.createElement('set', ['ha', 'hb'], 'set')).toString().should.equal('<set name="set"><string>ha</string><string>hb</string></set>')
      done()
    })
  })
  it('build', (done) => {
    prefs.build([
      {'type': 'string', name: 'str', value: 'im a string'},
      {'type': 'int', name: 'number', value: 1},
      {'type': 'float', name: 'f', value: 1.3},
      {'type': 'set', name: 'set', value: ['ha', 'hb']},
      {'type': 'long', name: 'long', value: 1239812738},
      {'type': 'boolean', name: 'flag', value: true}
    ])
    let sp = prefs.toString()
    let sharedPrefs = (fs.readFileSync(path.join(__dirname, 'shared_prefs.xml'))).toString()
    sp.should.equal(sharedPrefs)
    done()
  })
  it('toFile', (done) => {
    let filename = path.join('/tmp', 'temp.xml')
    prefs.build([{'type': 'string', name: 'str', value: 'im a string'}])
    prefs.toFile(filename)
    let stat = fs.statSync(filename)
    stat.isFile().should.equal(true)
    done()
  })
})
