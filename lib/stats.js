var debug = require('debug')('telegraf:styatsd')
var Stats = require('statsy')

module.exports = function (opts) {
  var client = new Stats(opts)
  return function * (next) {
    var duration = client.timer('duration')
    var typeDuration = client.timer(`${this.updateType}.duration`)
    var subTypeDuration = function () {}
    if (this.updateSubType) {
      subTypeDuration = client.timer(`${this.updateType}.${this.updateSubType}.duration`)
    }
    client.incr('count')
    client.incr(`${this.updateType}.count`)
    if (this.updateSubType) {
      client.incr(`${this.updateType}.${this.updateSubType}.count`)
    }
    if (this.message) {
      client.set('chats', this.message.chat.id)
      client.set('users', this.message.from.id)
      if (this.message.text) {
        client.histogram('text.size', this.message.length)
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
    } catch (err) {
      client.incr('errors.count')
      client.incr(`errors.${this.updateType}.count`)
      if (this.updateSubType) {
        client.incr(`errors.${this.updateType}.${this.updateSubType}.count`)
      }
      throw err
    } finally {
      duration()
      typeDuration()
      subTypeDuration()
      debug('Stats saved')
    }
  }
}
