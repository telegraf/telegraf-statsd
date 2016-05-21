# statsd middleware for Telegraf

[![Build Status](https://img.shields.io/travis/telegraf/telegraf-statsd.svg?branch=master&style=flat-square)](https://travis-ci.org/telegraf/telegraf-statsd)
[![NPM Version](https://img.shields.io/npm/v/telegraf-statsd.svg?style=flat-square)](https://www.npmjs.com/package/telegraf-statsd)

[statsd](https://github.com/etsy/statsd) middleware for [Telegraf (Telegram bot framework)](https://github.com/telegraf/telegraf).

## Installation

```js
$ npm install telegraf-statsd
```

## Example
  
```js
var Telegraf = require('telegraf')
var stats = require('telegraf-statsd')

var telegraf = new Telegraf(process.env.BOT_TOKEN)

telegraf.use(stats())

telegraf.on('text', function * () {
  this.reply('Big brother watch you!')
})

telegraf.startPolling()
```

## API

### Options

* `host` - optional statsd host
* `port` - optional statsd port
* `prefix` - optional statsd prefix ('.' is appended)
* `tcp` - use TCP instead of UDP

## Metrics

* `count` bot updates counter
* `<event type>.count` event type counter(message, inlineQuery, etc.)
* `<event type>.<event subtype>.count` event subtype counter(text, sticker, etc.)
* `chats` chats set
* `users` users set
* `text.size` text messages length histogram
* `error.count` error counter
* `error.<event type>.count` update type(message, inlineQuery, etc.) error counter
* `duration` handler duration
* `<event type>.duration` update type(message, inlineQuery, etc.) handler duration 

## License

The MIT License (MIT)

Copyright (c) 2016 Vitaly Domnikov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

