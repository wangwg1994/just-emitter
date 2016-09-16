# just-emitter

Event emitter for modern browsers.

[![dependencies](https://david-dm.org/justclear/just-emitter.svg)](https://david-dm.org/justclear/just-emitter#info=dependencies&view=table)
[![devDependencies](https://david-dm.org/justclear/just-emitter/dev-status.svg)](https://david-dm.org/justclear/just-emitter#info=devDependencies&view=table)

## Usage

### Install

```sh
$ npm install just-emitter

# or

$ bower install just-emitter
```

### API

- <a href="#on">`Emitter.on()`</a>
- <a href="#off">`Emitter.off()`</a>
- <a href="#once">`Emitter.once()`</a>
- <a href="#emit">`Emitter.emit()`</a>

<a name="on"></a>
#### `Emitter.on()`

```js
import Emitter from 'just-emitter';

let count = 0;

Emitter.on('hello', function () {
    count ++;
});
```

<a name="off"></a>
#### `Emitter.off()`

```js
import Emitter from 'just-emitter';

let count = 0;

function hello() {
    count ++;
}

Emitter.on('hello', hello); // bind hello
Emitter.off('hello', hello); // unbind hello

// or

Emitter.off(); // unbind all events
```

<a name="once"></a>
#### `Emitter.once()`

```js
import Emitter from 'just-emitter';

let count = 0;

Emitter.once('hello', function () {
    count ++;
});

Emitter.emit('hello'); // count increase
Emitter.emit('hello'); // do nothing
```

<a name="emit"></a>
#### `Emitter.emit()`

```js
import Emitter from 'just-emitter';

let count = 0;

Emitter.on('hello', function () {
    count ++;
});
Emitter.emit('hello'); // count increase
Emitter.emit('hello'); // count increase
Emitter.emit('hello'); // count increase

// or

Emitter.emit('hello hello hello'); // count increase 3 times
```
