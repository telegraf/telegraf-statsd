var debug = require('debug')('telegraf:styatsd')
var Stats = require('statsy')

module.exports = function (opts) {
  var client = new Stats(opts)
  return function * (next) {
    client.incr('count')
    client.incr(`${this.eventType}.count`)
    if (this.eventSubType) {
      client.incr(`${this.eventType}.${this.eventSubType}.count`)
    }
    if (this.message) {
      client.set('chats', this.message.chat.id)
      client.set('users', this.message.from.id)
      if (this.message.text) {
        s.histogram('text.size', this.message.length)
      }
    } else if (this.callbackQuery) {
      client.set('chats', this.callbackQuery.message.chat.id)
      client.set('users', this.callbackQuery.from.id)
    } else if (this.inlineQuery) {
      client.set('users', this.callbackQuery.from.id)
    } else if (this.chosenInlineResult) {
      client.set('users', this.chosenInlineResult.from.id)
    }
    try {
      yield next
    } catch(err) {
      client.incr('errors.count')
      client.incr(`errors.${this.eventType}.count`)
      if (this.eventSubType) {
        client.incr(`errors.${this.eventType}.${this.eventSubType}.count`)
      }
      throw error
    } finally {
      client.timer('duration')
      client.timer(`${this.eventType}.duration`)
      if (this.eventSubType) {
        client.timer(`${this.eventType}.${this.eventSubType}.duration`)
      }
    }
  }
}
