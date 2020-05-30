const Telegraf = require('Telegraf')
const bot = new Telegraf('1058188076:AAFIpKl1XfEJa3Guz0D1T5OQM3b1w4yO4QM')

const pinFunction = (ctx, msg) => {
    // console.log(ctx.message.reply_to_message.message_id)
    if(ctx.message.reply_to_message) {
        bot.telegram.pinChatMessage(ctx.chat.id, ctx.message.reply_to_message.message_id)
    }
}

module.exports = {
    pinFunction
}