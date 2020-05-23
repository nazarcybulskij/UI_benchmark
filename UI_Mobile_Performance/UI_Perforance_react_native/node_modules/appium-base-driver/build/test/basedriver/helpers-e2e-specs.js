"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("source-map-support/register");

var _chai = _interopRequireDefault(require("chai"));

var _path = _interopRequireDefault(require("path"));

var _url = _interopRequireDefault(require("url"));

var _chaiAsPromised = _interopRequireDefault(require("chai-as-promised"));

var _appiumSupport = require("appium-support");

var _helpers = require("../../lib/basedriver/helpers");

var _http = _interopRequireDefault(require("http"));

var _finalhandler = _interopRequireDefault(require("finalhandler"));

var _serveStatic = _interopRequireDefault(require("serve-static"));

var _contentDisposition = _interopRequireDefault(require("content-disposition"));

var _bluebird = _interopRequireDefault(require("bluebird"));

_chai.default.should();

_chai.default.use(_chaiAsPromised.default);

function getFixture(file) {
  return _path.default.resolve(__dirname, '..', '..', '..', 'test', 'basedriver', 'fixtures', file);
}

describe('app download and configuration', function () {
  describe('configureApp', function () {
    it('should get the path for a local .app', async function () {
      let newAppPath = await (0, _helpers.configureApp)(getFixture('FakeIOSApp.app'), '.app');
      newAppPath.should.contain('FakeIOSApp.app');
      let contents = await _appiumSupport.fs.readFile(newAppPath, 'utf8');
      contents.should.eql('this is not really an app\n');
    });
    it('should get the path for a local .apk', async function () {
      let newAppPath = await (0, _helpers.configureApp)(getFixture('FakeAndroidApp.apk'), '.apk');
      newAppPath.should.contain('FakeAndroidApp.apk');
      let contents = await _appiumSupport.fs.readFile(newAppPath, 'utf8');
      contents.should.eql('this is not really an apk\n');
    });
    it('should unzip and get the path for a local .app.zip', async function () {
      let newAppPath = await (0, _helpers.configureApp)(getFixture('FakeIOSApp.app.zip'), '.app');
      newAppPath.should.contain('FakeIOSApp.app');
      let contents = await _appiumSupport.fs.readFile(newAppPath, 'utf8');
      contents.should.eql('this is not really an app\n');
    });
    it('should unzip and get the path for a local .ipa', async function () {
      let newAppPath = await (0, _helpers.configureApp)(getFixture('FakeIOSApp.ipa'), '.app');
      newAppPath.should.contain('FakeIOSApp.app');
      let contents = await _appiumSupport.fs.readFile(newAppPath, 'utf8');
      contents.should.eql('this is not really an app\n');
    });
    it('should fail for a bad zip file', async function () {
      await (0, _helpers.configureApp)(getFixture('BadZippedApp.zip'), '.app').should.be.rejectedWith(/PK/);
    });
    it('should fail if extensions do not match', async function () {
      await (0, _helpers.configureApp)(getFixture('FakeIOSApp.app'), '.wrong').should.be.rejectedWith(/did not have extension/);
    });
    it('should fail if zip file does not contain an app whose extension matches', async function () {
      await (0, _helpers.configureApp)(getFixture('FakeIOSApp.app.zip'), '.wrong').should.be.rejectedWith(/did not have extension/);
    });
    describe('should download an app from the web', function () {
      const port = 8000;
      const serverUrl = `http://localhost:${port}`;
      describe('server not available', function () {
        it('should handle server not available', async function () {
          await (0, _helpers.configureApp)(`${serverUrl}/FakeIOSApp.app.zip`, '.app').should.eventually.be.rejectedWith(/ECONNREFUSED/);
        });
      });
      describe('server available', function () {
        let server;
        before(function () {
          const dir = _path.default.resolve(__dirname, '..', '..', '..', 'test', 'basedriver', 'fixtures');

          const serve = (0, _serveStatic.default)(dir, {
            index: false,
            setHeaders: (res, path) => {
              res.setHeader('Content-Disposition', (0, _contentDisposition.default)(path));
            }
          });
          server = _http.default.createServer(function (req, res) {
            if (req.url.indexOf('missing') !== -1) {
              res.writeHead(404);
              res.end();
              return;
            }

            const contentType = new URLSearchParams(_url.default.parse(req.url).search).get('content-type');

            if (contentType !== null) {
              res.setHeader('content-type', contentType);
            }

            serve(req, res, (0, _finalhandler.default)(req, res));
          });
          const close = server.close.bind(server);

          server.close = async function () {
            await _bluebird.default.delay(1000);
            return await new _bluebird.default((resolve, reject) => {
              server.on('close', resolve);
              close(err => {
                if (err) reject(err);
              });
            });
          };

          server.listen(port);
        });
        after(async function () {
          await server.close();
        });
        it('should download zip file', async function () {
          let newAppPath = await (0, _helpers.configureApp)(`${serverUrl}/FakeIOSApp.app.zip`, '.app');
          newAppPath.should.contain('FakeIOSApp.app');
          let contents = await _appiumSupport.fs.readFile(newAppPath, 'utf8');
          contents.should.eql('this is not really an app\n');
        });
        it('should download zip file with query string', async function () {
          let newAppPath = await (0, _helpers.configureApp)(`${serverUrl}/FakeIOSApp.app.zip?sv=abc&sr=def`, '.app');
          newAppPath.should.contain('.app');
          let contents = await _appiumSupport.fs.readFile(newAppPath, 'utf8');
          contents.should.eql('this is not really an app\n');
        });
        it('should download an app file', async function () {
          let newAppPath = await (0, _helpers.configureApp)(`${serverUrl}/FakeIOSApp.app`, '.app');
          newAppPath.should.contain('.app');
          let contents = await _appiumSupport.fs.readFile(newAppPath, 'utf8');
          contents.should.eql('this is not really an app\n');
        });
        it('should accept multiple extensions', async function () {
          let newAppPath = await (0, _helpers.configureApp)(`${serverUrl}/FakeIOSApp.app.zip`, ['.app', '.aab']);
          newAppPath.should.contain('FakeIOSApp.app');
          let contents = await _appiumSupport.fs.readFile(newAppPath, 'utf8');
          contents.should.eql('this is not really an app\n');
        });
        it('should download an apk file', async function () {
          let newAppPath = await (0, _helpers.configureApp)(`${serverUrl}/FakeAndroidApp.apk`, '.apk');
          newAppPath.should.contain('.apk');
          let contents = await _appiumSupport.fs.readFile(newAppPath, 'utf8');
          contents.should.eql('this is not really an apk\n');
        });
        it('should handle zip file that cannot be downloaded', async function () {
          await (0, _helpers.configureApp)(`${serverUrl}/missing/FakeIOSApp.app.zip`, '.app').should.eventually.be.rejectedWith(/Problem downloading app from url/);
        });
        it('should handle invalid protocol', async function () {
          await (0, _helpers.configureApp)('file://C:/missing/FakeIOSApp.app.zip', '.app').should.eventually.be.rejectedWith(/is not supported/);
          await (0, _helpers.configureApp)('ftp://localhost:8000/missing/FakeIOSApp.app.zip', '.app').should.eventually.be.rejectedWith(/is not supported/);
        });
        it('should handle missing file in Windows path format', async function () {
          await (0, _helpers.configureApp)('C:\\missing\\FakeIOSApp.app.zip', '.app').should.eventually.be.rejectedWith(/does not exist or is not accessible/);
        });
        it('should recognize zip mime types and unzip the downloaded file', async function () {
          let newAppPath = await (0, _helpers.configureApp)(`${serverUrl}/FakeAndroidApp.asd?content-type=${encodeURIComponent('application/zip')}`, '.apk');
          newAppPath.should.contain('FakeAndroidApp.apk');
          newAppPath.should.not.contain('.asd');
          let contents = await _appiumSupport.fs.readFile(newAppPath, 'utf8');
          contents.should.eql('this is not really an apk\n');
        });
        it('should recognize zip mime types with parameter and unzip the downloaded file', async function () {
          let newAppPath = await (0, _helpers.configureApp)(`${serverUrl}/FakeAndroidApp.asd?content-type=${encodeURIComponent('application/zip; parameter=value')}`, '.apk');
          newAppPath.should.contain('FakeAndroidApp.apk');
          newAppPath.should.not.contain('.asd');
          let contents = await _appiumSupport.fs.readFile(newAppPath, 'utf8');
          contents.should.eql('this is not really an apk\n');
        });
        it('should recognize zip mime types and unzip the downloaded file with query string', async function () {
          let newAppPath = await (0, _helpers.configureApp)(`${serverUrl}/FakeAndroidApp.asd?content-type=${encodeURIComponent('application/zip')}&sv=abc&sr=def`, '.apk');
          newAppPath.should.contain('FakeAndroidApp.apk');
          newAppPath.should.not.contain('.asd');
          let contents = await _appiumSupport.fs.readFile(newAppPath, 'utf8');
          contents.should.eql('this is not really an apk\n');
        });
        it('should treat an unknown mime type as an app', async function () {
          let newAppPath = await (0, _helpers.configureApp)(`${serverUrl}/FakeAndroidApp.apk?content-type=${encodeURIComponent('application/bip')}`, '.apk');
          newAppPath.should.contain('.apk');
          let contents = await _appiumSupport.fs.readFile(newAppPath, 'utf8');
          contents.should.eql('this is not really an apk\n');
        });
      });
    });
  });
});require('source-map-support').install();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvYmFzZWRyaXZlci9oZWxwZXJzLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6WyJjaGFpIiwic2hvdWxkIiwidXNlIiwiY2hhaUFzUHJvbWlzZWQiLCJnZXRGaXh0dXJlIiwiZmlsZSIsInBhdGgiLCJyZXNvbHZlIiwiX19kaXJuYW1lIiwiZGVzY3JpYmUiLCJpdCIsIm5ld0FwcFBhdGgiLCJjb250YWluIiwiY29udGVudHMiLCJmcyIsInJlYWRGaWxlIiwiZXFsIiwiYmUiLCJyZWplY3RlZFdpdGgiLCJwb3J0Iiwic2VydmVyVXJsIiwiZXZlbnR1YWxseSIsInNlcnZlciIsImJlZm9yZSIsImRpciIsInNlcnZlIiwiaW5kZXgiLCJzZXRIZWFkZXJzIiwicmVzIiwic2V0SGVhZGVyIiwiaHR0cCIsImNyZWF0ZVNlcnZlciIsInJlcSIsInVybCIsImluZGV4T2YiLCJ3cml0ZUhlYWQiLCJlbmQiLCJjb250ZW50VHlwZSIsIlVSTFNlYXJjaFBhcmFtcyIsInBhcnNlIiwic2VhcmNoIiwiZ2V0IiwiY2xvc2UiLCJiaW5kIiwiQiIsImRlbGF5IiwicmVqZWN0Iiwib24iLCJlcnIiLCJsaXN0ZW4iLCJhZnRlciIsImVuY29kZVVSSUNvbXBvbmVudCIsIm5vdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0FBLGNBQUtDLE1BQUw7O0FBQ0FELGNBQUtFLEdBQUwsQ0FBU0MsdUJBQVQ7O0FBRUEsU0FBU0MsVUFBVCxDQUFxQkMsSUFBckIsRUFBMkI7QUFDekIsU0FBT0MsY0FBS0MsT0FBTCxDQUFhQyxTQUFiLEVBQXdCLElBQXhCLEVBQThCLElBQTlCLEVBQW9DLElBQXBDLEVBQTBDLE1BQTFDLEVBQWtELFlBQWxELEVBQWdFLFVBQWhFLEVBQTRFSCxJQUE1RSxDQUFQO0FBQ0Q7O0FBRURJLFFBQVEsQ0FBQyxnQ0FBRCxFQUFtQyxZQUFZO0FBQ3JE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TyxDQUFSO0FBa0hELEtBNUhPLENBQVI7QUE2SEQsR0FsS08sQ0FBUjtBQW1LRCxDQXBLTyxDQUFSIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB1cmwgZnJvbSAndXJsJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCB7IGZzIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IHsgY29uZmlndXJlQXBwIH0gZnJvbSAnLi4vLi4vbGliL2Jhc2Vkcml2ZXIvaGVscGVycyc7XG5pbXBvcnQgaHR0cCBmcm9tICdodHRwJztcbmltcG9ydCBmaW5hbGhhbmRsZXIgZnJvbSAnZmluYWxoYW5kbGVyJztcbmltcG9ydCBzZXJ2ZVN0YXRpYyBmcm9tICdzZXJ2ZS1zdGF0aWMnO1xuaW1wb3J0IGNvbnRlbnREaXNwb3NpdGlvbiBmcm9tICdjb250ZW50LWRpc3Bvc2l0aW9uJztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5mdW5jdGlvbiBnZXRGaXh0dXJlIChmaWxlKSB7XG4gIHJldHVybiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4nLCAnLi4nLCAnLi4nLCAndGVzdCcsICdiYXNlZHJpdmVyJywgJ2ZpeHR1cmVzJywgZmlsZSk7XG59XG5cbmRlc2NyaWJlKCdhcHAgZG93bmxvYWQgYW5kIGNvbmZpZ3VyYXRpb24nLCBmdW5jdGlvbiAoKSB7XG4gIGRlc2NyaWJlKCdjb25maWd1cmVBcHAnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBnZXQgdGhlIHBhdGggZm9yIGEgbG9jYWwgLmFwcCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBuZXdBcHBQYXRoID0gYXdhaXQgY29uZmlndXJlQXBwKGdldEZpeHR1cmUoJ0Zha2VJT1NBcHAuYXBwJyksICcuYXBwJyk7XG4gICAgICBuZXdBcHBQYXRoLnNob3VsZC5jb250YWluKCdGYWtlSU9TQXBwLmFwcCcpO1xuICAgICAgbGV0IGNvbnRlbnRzID0gYXdhaXQgZnMucmVhZEZpbGUobmV3QXBwUGF0aCwgJ3V0ZjgnKTtcbiAgICAgIGNvbnRlbnRzLnNob3VsZC5lcWwoJ3RoaXMgaXMgbm90IHJlYWxseSBhbiBhcHBcXG4nKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGdldCB0aGUgcGF0aCBmb3IgYSBsb2NhbCAuYXBrJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IG5ld0FwcFBhdGggPSBhd2FpdCBjb25maWd1cmVBcHAoZ2V0Rml4dHVyZSgnRmFrZUFuZHJvaWRBcHAuYXBrJyksICcuYXBrJyk7XG4gICAgICBuZXdBcHBQYXRoLnNob3VsZC5jb250YWluKCdGYWtlQW5kcm9pZEFwcC5hcGsnKTtcbiAgICAgIGxldCBjb250ZW50cyA9IGF3YWl0IGZzLnJlYWRGaWxlKG5ld0FwcFBhdGgsICd1dGY4Jyk7XG4gICAgICBjb250ZW50cy5zaG91bGQuZXFsKCd0aGlzIGlzIG5vdCByZWFsbHkgYW4gYXBrXFxuJyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB1bnppcCBhbmQgZ2V0IHRoZSBwYXRoIGZvciBhIGxvY2FsIC5hcHAuemlwJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IG5ld0FwcFBhdGggPSBhd2FpdCBjb25maWd1cmVBcHAoZ2V0Rml4dHVyZSgnRmFrZUlPU0FwcC5hcHAuemlwJyksICcuYXBwJyk7XG4gICAgICBuZXdBcHBQYXRoLnNob3VsZC5jb250YWluKCdGYWtlSU9TQXBwLmFwcCcpO1xuICAgICAgbGV0IGNvbnRlbnRzID0gYXdhaXQgZnMucmVhZEZpbGUobmV3QXBwUGF0aCwgJ3V0ZjgnKTtcbiAgICAgIGNvbnRlbnRzLnNob3VsZC5lcWwoJ3RoaXMgaXMgbm90IHJlYWxseSBhbiBhcHBcXG4nKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHVuemlwIGFuZCBnZXQgdGhlIHBhdGggZm9yIGEgbG9jYWwgLmlwYScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBuZXdBcHBQYXRoID0gYXdhaXQgY29uZmlndXJlQXBwKGdldEZpeHR1cmUoJ0Zha2VJT1NBcHAuaXBhJyksICcuYXBwJyk7XG4gICAgICBuZXdBcHBQYXRoLnNob3VsZC5jb250YWluKCdGYWtlSU9TQXBwLmFwcCcpO1xuICAgICAgbGV0IGNvbnRlbnRzID0gYXdhaXQgZnMucmVhZEZpbGUobmV3QXBwUGF0aCwgJ3V0ZjgnKTtcbiAgICAgIGNvbnRlbnRzLnNob3VsZC5lcWwoJ3RoaXMgaXMgbm90IHJlYWxseSBhbiBhcHBcXG4nKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGZhaWwgZm9yIGEgYmFkIHppcCBmaWxlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgY29uZmlndXJlQXBwKGdldEZpeHR1cmUoJ0JhZFppcHBlZEFwcC56aXAnKSwgJy5hcHAnKVxuICAgICAgICAuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvUEsvKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGZhaWwgaWYgZXh0ZW5zaW9ucyBkbyBub3QgbWF0Y2gnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBhd2FpdCBjb25maWd1cmVBcHAoZ2V0Rml4dHVyZSgnRmFrZUlPU0FwcC5hcHAnKSwgJy53cm9uZycpXG4gICAgICAgIC5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKC9kaWQgbm90IGhhdmUgZXh0ZW5zaW9uLyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHppcCBmaWxlIGRvZXMgbm90IGNvbnRhaW4gYW4gYXBwIHdob3NlIGV4dGVuc2lvbiBtYXRjaGVzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgYXdhaXQgY29uZmlndXJlQXBwKGdldEZpeHR1cmUoJ0Zha2VJT1NBcHAuYXBwLnppcCcpLCAnLndyb25nJylcbiAgICAgICAgLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL2RpZCBub3QgaGF2ZSBleHRlbnNpb24vKTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnc2hvdWxkIGRvd25sb2FkIGFuIGFwcCBmcm9tIHRoZSB3ZWInLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBwb3J0ID0gODAwMDtcbiAgICAgIGNvbnN0IHNlcnZlclVybCA9IGBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH1gO1xuXG4gICAgICBkZXNjcmliZSgnc2VydmVyIG5vdCBhdmFpbGFibGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0KCdzaG91bGQgaGFuZGxlIHNlcnZlciBub3QgYXZhaWxhYmxlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGF3YWl0IGNvbmZpZ3VyZUFwcChgJHtzZXJ2ZXJVcmx9L0Zha2VJT1NBcHAuYXBwLnppcGAsICcuYXBwJylcbiAgICAgICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL0VDT05OUkVGVVNFRC8pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgZGVzY3JpYmUoJ3NlcnZlciBhdmFpbGFibGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHVzZSBhIGxvY2FsIHNlcnZlciBzbyB0aGVyZSBpcyBubyBkZXBlbmRlbmN5IG9uIHRoZSBpbnRlcm5ldFxuICAgICAgICBsZXQgc2VydmVyO1xuICAgICAgICBiZWZvcmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnN0IGRpciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICcuLicsICcuLicsICd0ZXN0JywgJ2Jhc2Vkcml2ZXInLCAnZml4dHVyZXMnKTtcbiAgICAgICAgICBjb25zdCBzZXJ2ZSA9IHNlcnZlU3RhdGljKGRpciwge1xuICAgICAgICAgICAgaW5kZXg6IGZhbHNlLFxuICAgICAgICAgICAgc2V0SGVhZGVyczogKHJlcywgcGF0aCkgPT4ge1xuICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LURpc3Bvc2l0aW9uJywgY29udGVudERpc3Bvc2l0aW9uKHBhdGgpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcihmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICAgICAgICAgIGlmIChyZXEudXJsLmluZGV4T2YoJ21pc3NpbmcnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgcmVzLndyaXRlSGVhZCg0MDQpO1xuICAgICAgICAgICAgICByZXMuZW5kKCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGZvciB0ZXN0aW5nIHppcCBmaWxlIGNvbnRlbnQgdHlwZXNcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh1cmwucGFyc2UocmVxLnVybCkuc2VhcmNoKS5nZXQoJ2NvbnRlbnQtdHlwZScpO1xuICAgICAgICAgICAgaWYgKGNvbnRlbnRUeXBlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ2NvbnRlbnQtdHlwZScsIGNvbnRlbnRUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlcnZlKHJlcSwgcmVzLCBmaW5hbGhhbmRsZXIocmVxLCByZXMpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjb25zdCBjbG9zZSA9IHNlcnZlci5jbG9zZS5iaW5kKHNlcnZlcik7XG4gICAgICAgICAgc2VydmVyLmNsb3NlID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gcGF1c2UgYSBtb21lbnQgb3Igd2UgZ2V0IEVDT05SRVNFVCBlcnJvcnNcbiAgICAgICAgICAgIGF3YWl0IEIuZGVsYXkoMTAwMCk7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgbmV3IEIoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICBzZXJ2ZXIub24oJ2Nsb3NlJywgcmVzb2x2ZSk7XG4gICAgICAgICAgICAgIGNsb3NlKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSByZWplY3QoZXJyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjdXJseVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgICAgc2VydmVyLmxpc3Rlbihwb3J0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFmdGVyKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBhd2FpdCBzZXJ2ZXIuY2xvc2UoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBkb3dubG9hZCB6aXAgZmlsZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBsZXQgbmV3QXBwUGF0aCA9IGF3YWl0IGNvbmZpZ3VyZUFwcChgJHtzZXJ2ZXJVcmx9L0Zha2VJT1NBcHAuYXBwLnppcGAsICcuYXBwJyk7XG4gICAgICAgICAgbmV3QXBwUGF0aC5zaG91bGQuY29udGFpbignRmFrZUlPU0FwcC5hcHAnKTtcbiAgICAgICAgICBsZXQgY29udGVudHMgPSBhd2FpdCBmcy5yZWFkRmlsZShuZXdBcHBQYXRoLCAndXRmOCcpO1xuICAgICAgICAgIGNvbnRlbnRzLnNob3VsZC5lcWwoJ3RoaXMgaXMgbm90IHJlYWxseSBhbiBhcHBcXG4nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZG93bmxvYWQgemlwIGZpbGUgd2l0aCBxdWVyeSBzdHJpbmcnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbGV0IG5ld0FwcFBhdGggPSBhd2FpdCBjb25maWd1cmVBcHAoYCR7c2VydmVyVXJsfS9GYWtlSU9TQXBwLmFwcC56aXA/c3Y9YWJjJnNyPWRlZmAsICcuYXBwJyk7XG4gICAgICAgICAgbmV3QXBwUGF0aC5zaG91bGQuY29udGFpbignLmFwcCcpO1xuICAgICAgICAgIGxldCBjb250ZW50cyA9IGF3YWl0IGZzLnJlYWRGaWxlKG5ld0FwcFBhdGgsICd1dGY4Jyk7XG4gICAgICAgICAgY29udGVudHMuc2hvdWxkLmVxbCgndGhpcyBpcyBub3QgcmVhbGx5IGFuIGFwcFxcbicpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBkb3dubG9hZCBhbiBhcHAgZmlsZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBsZXQgbmV3QXBwUGF0aCA9IGF3YWl0IGNvbmZpZ3VyZUFwcChgJHtzZXJ2ZXJVcmx9L0Zha2VJT1NBcHAuYXBwYCwgJy5hcHAnKTtcbiAgICAgICAgICBuZXdBcHBQYXRoLnNob3VsZC5jb250YWluKCcuYXBwJyk7XG4gICAgICAgICAgbGV0IGNvbnRlbnRzID0gYXdhaXQgZnMucmVhZEZpbGUobmV3QXBwUGF0aCwgJ3V0ZjgnKTtcbiAgICAgICAgICBjb250ZW50cy5zaG91bGQuZXFsKCd0aGlzIGlzIG5vdCByZWFsbHkgYW4gYXBwXFxuJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGFjY2VwdCBtdWx0aXBsZSBleHRlbnNpb25zJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGxldCBuZXdBcHBQYXRoID0gYXdhaXQgY29uZmlndXJlQXBwKGAke3NlcnZlclVybH0vRmFrZUlPU0FwcC5hcHAuemlwYCwgWycuYXBwJywgJy5hYWInXSk7XG4gICAgICAgICAgbmV3QXBwUGF0aC5zaG91bGQuY29udGFpbignRmFrZUlPU0FwcC5hcHAnKTtcbiAgICAgICAgICBsZXQgY29udGVudHMgPSBhd2FpdCBmcy5yZWFkRmlsZShuZXdBcHBQYXRoLCAndXRmOCcpO1xuICAgICAgICAgIGNvbnRlbnRzLnNob3VsZC5lcWwoJ3RoaXMgaXMgbm90IHJlYWxseSBhbiBhcHBcXG4nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgZG93bmxvYWQgYW4gYXBrIGZpbGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbGV0IG5ld0FwcFBhdGggPSBhd2FpdCBjb25maWd1cmVBcHAoYCR7c2VydmVyVXJsfS9GYWtlQW5kcm9pZEFwcC5hcGtgLCAnLmFwaycpO1xuICAgICAgICAgIG5ld0FwcFBhdGguc2hvdWxkLmNvbnRhaW4oJy5hcGsnKTtcbiAgICAgICAgICBsZXQgY29udGVudHMgPSBhd2FpdCBmcy5yZWFkRmlsZShuZXdBcHBQYXRoLCAndXRmOCcpO1xuICAgICAgICAgIGNvbnRlbnRzLnNob3VsZC5lcWwoJ3RoaXMgaXMgbm90IHJlYWxseSBhbiBhcGtcXG4nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgaGFuZGxlIHppcCBmaWxlIHRoYXQgY2Fubm90IGJlIGRvd25sb2FkZWQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgYXdhaXQgY29uZmlndXJlQXBwKGAke3NlcnZlclVybH0vbWlzc2luZy9GYWtlSU9TQXBwLmFwcC56aXBgLCAnLmFwcCcpXG4gICAgICAgICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9Qcm9ibGVtIGRvd25sb2FkaW5nIGFwcCBmcm9tIHVybC8pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBoYW5kbGUgaW52YWxpZCBwcm90b2NvbCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBhd2FpdCBjb25maWd1cmVBcHAoJ2ZpbGU6Ly9DOi9taXNzaW5nL0Zha2VJT1NBcHAuYXBwLnppcCcsICcuYXBwJylcbiAgICAgICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL2lzIG5vdCBzdXBwb3J0ZWQvKTtcbiAgICAgICAgICBhd2FpdCBjb25maWd1cmVBcHAoJ2Z0cDovL2xvY2FsaG9zdDo4MDAwL21pc3NpbmcvRmFrZUlPU0FwcC5hcHAuemlwJywgJy5hcHAnKVxuICAgICAgICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvaXMgbm90IHN1cHBvcnRlZC8pO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCBoYW5kbGUgbWlzc2luZyBmaWxlIGluIFdpbmRvd3MgcGF0aCBmb3JtYXQnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgYXdhaXQgY29uZmlndXJlQXBwKCdDOlxcXFxtaXNzaW5nXFxcXEZha2VJT1NBcHAuYXBwLnppcCcsICcuYXBwJylcbiAgICAgICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL2RvZXMgbm90IGV4aXN0IG9yIGlzIG5vdCBhY2Nlc3NpYmxlLyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJlY29nbml6ZSB6aXAgbWltZSB0eXBlcyBhbmQgdW56aXAgdGhlIGRvd25sb2FkZWQgZmlsZScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBsZXQgbmV3QXBwUGF0aCA9IGF3YWl0IGNvbmZpZ3VyZUFwcChgJHtzZXJ2ZXJVcmx9L0Zha2VBbmRyb2lkQXBwLmFzZD9jb250ZW50LXR5cGU9JHtlbmNvZGVVUklDb21wb25lbnQoJ2FwcGxpY2F0aW9uL3ppcCcpfWAsICcuYXBrJyk7XG4gICAgICAgICAgbmV3QXBwUGF0aC5zaG91bGQuY29udGFpbignRmFrZUFuZHJvaWRBcHAuYXBrJyk7XG4gICAgICAgICAgbmV3QXBwUGF0aC5zaG91bGQubm90LmNvbnRhaW4oJy5hc2QnKTtcbiAgICAgICAgICBsZXQgY29udGVudHMgPSBhd2FpdCBmcy5yZWFkRmlsZShuZXdBcHBQYXRoLCAndXRmOCcpO1xuICAgICAgICAgIGNvbnRlbnRzLnNob3VsZC5lcWwoJ3RoaXMgaXMgbm90IHJlYWxseSBhbiBhcGtcXG4nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgcmVjb2duaXplIHppcCBtaW1lIHR5cGVzIHdpdGggcGFyYW1ldGVyIGFuZCB1bnppcCB0aGUgZG93bmxvYWRlZCBmaWxlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGxldCBuZXdBcHBQYXRoID0gYXdhaXQgY29uZmlndXJlQXBwKGAke3NlcnZlclVybH0vRmFrZUFuZHJvaWRBcHAuYXNkP2NvbnRlbnQtdHlwZT0ke2VuY29kZVVSSUNvbXBvbmVudCgnYXBwbGljYXRpb24vemlwOyBwYXJhbWV0ZXI9dmFsdWUnKX1gLCAnLmFwaycpO1xuICAgICAgICAgIG5ld0FwcFBhdGguc2hvdWxkLmNvbnRhaW4oJ0Zha2VBbmRyb2lkQXBwLmFwaycpO1xuICAgICAgICAgIG5ld0FwcFBhdGguc2hvdWxkLm5vdC5jb250YWluKCcuYXNkJyk7XG4gICAgICAgICAgbGV0IGNvbnRlbnRzID0gYXdhaXQgZnMucmVhZEZpbGUobmV3QXBwUGF0aCwgJ3V0ZjgnKTtcbiAgICAgICAgICBjb250ZW50cy5zaG91bGQuZXFsKCd0aGlzIGlzIG5vdCByZWFsbHkgYW4gYXBrXFxuJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnc2hvdWxkIHJlY29nbml6ZSB6aXAgbWltZSB0eXBlcyBhbmQgdW56aXAgdGhlIGRvd25sb2FkZWQgZmlsZSB3aXRoIHF1ZXJ5IHN0cmluZycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBsZXQgbmV3QXBwUGF0aCA9IGF3YWl0IGNvbmZpZ3VyZUFwcChgJHtzZXJ2ZXJVcmx9L0Zha2VBbmRyb2lkQXBwLmFzZD9jb250ZW50LXR5cGU9JHtlbmNvZGVVUklDb21wb25lbnQoJ2FwcGxpY2F0aW9uL3ppcCcpfSZzdj1hYmMmc3I9ZGVmYCwgJy5hcGsnKTtcbiAgICAgICAgICBuZXdBcHBQYXRoLnNob3VsZC5jb250YWluKCdGYWtlQW5kcm9pZEFwcC5hcGsnKTtcbiAgICAgICAgICBuZXdBcHBQYXRoLnNob3VsZC5ub3QuY29udGFpbignLmFzZCcpO1xuICAgICAgICAgIGxldCBjb250ZW50cyA9IGF3YWl0IGZzLnJlYWRGaWxlKG5ld0FwcFBhdGgsICd1dGY4Jyk7XG4gICAgICAgICAgY29udGVudHMuc2hvdWxkLmVxbCgndGhpcyBpcyBub3QgcmVhbGx5IGFuIGFwa1xcbicpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoJ3Nob3VsZCB0cmVhdCBhbiB1bmtub3duIG1pbWUgdHlwZSBhcyBhbiBhcHAnLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbGV0IG5ld0FwcFBhdGggPSBhd2FpdCBjb25maWd1cmVBcHAoYCR7c2VydmVyVXJsfS9GYWtlQW5kcm9pZEFwcC5hcGs/Y29udGVudC10eXBlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KCdhcHBsaWNhdGlvbi9iaXAnKX1gLCAnLmFwaycpO1xuICAgICAgICAgIG5ld0FwcFBhdGguc2hvdWxkLmNvbnRhaW4oJy5hcGsnKTtcbiAgICAgICAgICBsZXQgY29udGVudHMgPSBhd2FpdCBmcy5yZWFkRmlsZShuZXdBcHBQYXRoLCAndXRmOCcpO1xuICAgICAgICAgIGNvbnRlbnRzLnNob3VsZC5lcWwoJ3RoaXMgaXMgbm90IHJlYWxseSBhbiBhcGtcXG4nKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLCJmaWxlIjoidGVzdC9iYXNlZHJpdmVyL2hlbHBlcnMtZTJlLXNwZWNzLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uIn0=
