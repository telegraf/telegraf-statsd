var Telegraf = require('telegraf')
var stats = require('../lib/stats')

var telegraf = new Telegraf(process.env.BOT_TOKEN)

telegraf.use(stats({
  host: process.env.STATS_IP,
  port: process.env.STATS_PORT,
  prefix: 'mybot'
}))

telegraf.on('text', function * () {
  this.reply('Big brother watch you!')
})

telegraf.startPolling()