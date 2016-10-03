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
const Telegraf = require('telegraf')
const stats = require('telegraf-statsd')

const telegraf = new Telegraf(process.env.BOT_TOKEN)

telegraf.use(stats())

telegraf.on('text', (ctx) => {
  return ctx.reply('Big brother watch you!')
})

telegraf.startPolling()
```

## API

### Options

* `host` - optional statsd host
* `port` - optional statsd port
* `prefix` - optional statsd prefix ('.' is appended)
* `tcp` - use TCP instead of UDP

## User context

Telegraf user context props and functions:

```js
app.use((ctx) => {
  ctx.statsd  // Statsy instance
})
```
[Statsy help](https://github.com/segmentio/statsy)

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
