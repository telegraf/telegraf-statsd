const debug = require('debug')('telegraf:styatsd')
const Stats = require('statsy')

module.exports = function (opts) {
  const client = new Stats(opts)
  return (ctx, next) => {
    const duration = client.timer('duration')
    const typeDuration = client.timer(`${ctx.updateType}.duration`)
    var subTypeDuration = function () {}
    if (ctx.updateSubType) {
      subTypeDuration = client.timer(`${ctx.updateType}.${ctx.updateSubType}.duration`)
    }
    client.incr('count')
    client.incr(`${ctx.updateType}.count`)
    if (ctx.updateSubType) {
      client.incr(`${ctx.updateType}.${ctx.updateSubType}.count`)
    }
    if (ctx.message) {
      client.set('chats', ctx.message.chat.id)
      client.set('users', ctx.message.from.id)
      if (ctx.message.text) {
        client.histogram('text.size', ctx.message.length)
      }
    } else if (ctx.callbackQuery) {
      client.set('chats', ctx.callbackQuery.message.chat.id)
      client.set('users', ctx.callbackQuery.from.id)
    } else if (ctx.inlineQuery) {
      client.set('users', ctx.inlineQuery.from.id)
    } else if (ctx.chosenInlineResult) {
      client.set('users', ctx.chosenInlineResult.from.id)
    }

    return next().catch((err) => {
      client.incr('errors.count')
      client.incr(`errors.${ctx.updateType}.count`)
      if (ctx.updateSubType) {
        client.incr(`errors.${ctx.updateType}.${ctx.updateSubType}.count`)
      }
      throw err
    }).finally(() => {
      duration()
      typeDuration()
      subTypeDuration()
      debug('Stats saved')
    })
  }
}
