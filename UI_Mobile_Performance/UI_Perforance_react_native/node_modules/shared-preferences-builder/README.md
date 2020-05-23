# shared-preferences-builder [![Build Status](https://travis-ci.org/vrunoa/shared-preferences-builder.svg?branch=master)](https://travis-ci.org/vrunoa/shared-preferences-builder)
Android Shared Preferences builder

# Usage
```javascript
let builder = new SharedPrefsBuilder()
builder.build([
  {'type': 'string', name: 'str', value: 'im a string'},
  {'type': 'int', name: 'number', value: 1},
  {'type': 'float', name: 'f', value: 1.3},
  {'type': 'set', name: 'set', value: ['ha', 'hb']},
  {'type': 'long', name: 'long', value: 1239812738},
  {'type': 'boolean', name: 'flag', value: true}
])
console.log(builder.toString())
/**
<?xml version="1.0" encoding="utf-8" standalone="yes" ?>
<map>
  <string name="str">im a string</string>
  <int name="number" value="1"/>
  <float name="f" value="1.3"/>
  <set name="set">
    <string>ha</string>
    <string>hb</string>
  </set>
  <long name="long" value="1239812738"/>
  <boolean name="flag" value="true"/>
</map>
**/
builder.toFile('com.my.package.shared.prefs.xml')
```
