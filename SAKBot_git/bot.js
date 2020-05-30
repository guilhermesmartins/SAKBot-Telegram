const Telegraf = require('Telegraf')
const fs = require('fs')

//Here comes the key for your bot, the key below is from the @SakGit_bot
const bot = new Telegraf('995235476:AAGFI2Hcf5p7J4BSw7tr38j_TvSyaIJZ2lY')

const { mainCryptFunction } = require('./src/javascript/crypto')

const jsonParse = (message) => {
    let rawdata = fs.readFileSync('./src/json/messages.json', 'utf8')
    let data = JSON.parse(rawdata)

    return data[message]
}

bot.start(ctx => {
    let message = jsonParse('start')
    bot.telegram.sendMessage(ctx.chat.id, message)
})

bot.command('help', ctx => {
    let message = jsonParse('help')
    ctx.reply(message)
})

bot.command('price', ctx => {
    let message = jsonParse('price')
    let attMessage = jsonParse('priceError')
    mainCryptFunction(ctx, message, attMessage)
})


bot.command('about', ctx => {
    let message = jsonParse('about')
    ctx.reply(message)
})

bot.launch()