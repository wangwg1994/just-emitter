(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('Emitter', factory) :
    (global.Emitter = factory());
}(this, function () { 'use strict';

    function bind(eventName, callback) {
        if (!eventName || !callback) return this;

        var i = void 0,
            len = void 0,
            base = void 0,
            name = void 0,
            events = void 0;

        events = eventName.split(' ');
        len = events.length;

        if (!this.hasOwnProperty('_callbacks')) {
            this._callbacks || (this._callbacks = {});
        }

        for (i = 0; i < len; i++) {
            name = events[i];
            (base = this._callbacks)[name] || (base[name] = []);
            this._callbacks[name].push(callback);
        }

        return this;
    }

    function unbind(eventName, callback) {
        var i = void 0,
            j = void 0,
            cb = void 0,
            len = void 0,
            list = void 0,
            name = void 0,
            events = void 0;

        if (arguments.length === 0) {
            this._callbacks = {};

            return this;
        }

        if (!eventName) return this;

        events = eventName.split(' ');

        for (i = 0, len = events.length; i < len; i++) {
            name = events[i];
            list = this._callbacks !== null ? this._callbacks[name] : void 0;

            if (!list) continue;

            if (!callback) {
                delete this._callbacks[name];
                continue;
            }

            for (j = 0; j < list.length; j++) {
                cb = list[j];

                if (!(cb === callback)) continue;

                list = list.slice();
                list.splice(j, 1);
                this._callbacks[name] = list;
                break;
            }
        }

        return this;
    }

    function once(eventName, callback) {
        var _handler = void 0;

        return this.bind(eventName, _handler = function handler() {
            this.unbind(eventName, _handler);

            return callback.apply(this, arguments);
        });
    }

    function emit() {
        var i = void 0,
            j = void 0,
            list = void 0,
            events = void 0,
            callback = void 0,
            eventName = void 0;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        eventName = args.shift();
        events = eventName.split(' ');

        for (i = 0; i < events.length; i++) {

            list = this._callbacks !== null ? this._callbacks[events[i]] : void 0;

            if (!list) continue;

            for (j = 0; j < list.length; j++) {
                callback = list[j];
                if (callback.apply(this, args) === false) break;
            }
        }
    }

    var Emitter = {
        bind: bind,
        on: bind,
        unbind: unbind,
        off: unbind,
        once: once,
        emit: emit
    };

    return Emitter;

}));
//# sourceMappingURL=emitter.js.map
