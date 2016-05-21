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

| Metric name | Type | Description |
| --- | --- | --- |
| `counter` | `counter` | bot updates counter |
| `<type>.count` | `counter` | update type counter (message, inlineQuery, etc.) |
| `message.<subtype>.count` | `counter` | message subtype counter(text, sticker, etc.) |
| `errors.count` | `counter` | error counter |
| `errors.<type>.count` | `counter` | update type error counter |
| `errors.message.<subtype>.count` | `counter` | message subtype error counter |
| `duration` | `timer` | handler duration |
| `<type>.duration` | `timer` | update type handler duration  |
| `message.<subtype>.duration` | `timer` | message subtype handler duration  |
| `chats` | `set` | chats set |
| `users` | `set` | users set |
| `text.size` | `histogram` | text messages length |



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

