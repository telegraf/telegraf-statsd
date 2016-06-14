const Telegraf = require('telegraf')
const stats = require('../lib/stats')

const telegraf = new Telegraf(process.env.BOT_TOKEN)

telegraf.use(stats({
  host: process.env.STATS_IP,
  port: process.env.STATS_PORT,
  prefix: 'mybot'
}))

telegraf.on('text', (ctx) => {
  ctx.reply('Big brother watch you!')
})

telegraf.startPolling()
