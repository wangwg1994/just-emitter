// @flow

function bind (eventName, callback) {
    if (!eventName || !callback) return this;

    let i,
        len,
        base,
        name,
        events;

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

function unbind (eventName, callback) {
    let i,
        j,
        cb,
        len,
        list,
        name,
        events;

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

function once (eventName, callback) {
    let handler;

    return this.bind(eventName, handler = function() {
        this.unbind(eventName, handler);

        return callback.apply(this, arguments);
    });
}

function emit (...args) {
    let i,
        j,
        list,
        events,
        callback,
        eventName;

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

let Emitter = {
    bind,
    on: bind,
    unbind,
    off: unbind,
    once,
    emit,
};

export default Emitter;
