//
// just test
//

var expect = require('expect.js');
var Emitter = require('../dist/emitter');

describe('Emitter Test', function () {
    it('should emit', function () {
        var count = 0;

        Emitter.on('hello', function () {
            count ++;
        });
        Emitter.emit('hello'); // count increase once
        Emitter.emit('hello'); // count increase twice

        expect(count).to.equal(2);

        count = 0;
        Emitter.emit('hello hello'); // count increase twice
        expect(count).to.equal(2);
    });

    it('should emit with data', function () {
        var hello;

        Emitter.on('world', function (data) {
            hello = data;
        });
        Emitter.emit('world', 'Hello World');

        expect(hello).to.equal('Hello World');
    });

    it('should emit once', function () {
        var count = 0;

        Emitter.once('hello', function () {
            count ++;
        });

        Emitter.emit('hello'); // count increase once
        Emitter.emit('hello'); // count increase twice

        expect(count).to.equal(1);

        count = 0;

        Emitter.once('hello', function () {
            count ++;
        });
        Emitter.emit('hello hello'); // count increase twice

        expect(count).to.equal(1);
    });

    it('should off', function () {
        var count = 0,
            hello = () => {
                count ++;
            };

        Emitter.on('hello', hello);
        Emitter.off('hello', hello);
        Emitter.emit('hello');

        expect(count).to.equal(0);
    });
});
