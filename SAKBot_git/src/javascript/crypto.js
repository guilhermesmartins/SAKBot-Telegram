const Telegraf = require('Telegraf')
const axios = require('axios')

const bot = new Telegraf('1058188076:AAFIpKl1XfEJa3Guz0D1T5OQM3b1w4yO4QM')

const apiKey = '913116a0c98e6ceece01e81d8c7c80546e3f45c5c1f1dbec0cc034f0e0cb36b5'

const mainCryptFunction = async (ctx, ...texts) => {
    let userMessage = ctx.message.text
    let userMessageArray = userMessage.trim().split(' ')

    switch (userMessageArray.length) {
        case 1:
            ctx.reply(texts[1])
            break;
        case 2:
            cryptOperation(userMessage)
                .then((value) => {
                    bot.telegram.sendMessage(ctx.chat.id, value)
                })
                .catch(_ => {
                    bot.telegram.sendMessage(ctx.chat.id, 'not available')
                })
            break;
        default:
                ctx.reply('future updates :P')
            break;
    }
}

const cryptOperation = async (userMessage) => {
    let messageFilter = userMessage.toUpperCase().split(' ')[1]
    let symbol = messageFilter.split('-')[0]
    let coin = messageFilter.split('-')[1]

    if(symbol === 'BTC') {
        const blockRaw = await axios.get('https://blockchain.info/ticker')
        let cryptoCoin = `${blockRaw.data[coin].symbol} ${blockRaw.data[coin].last}`

        return cryptoCoin
    }
    else {
        const cryptoRaw = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${apiKey}`)

        let cryptoCoin = cryptoRaw.data.DISPLAY[symbol][coin]

        return cryptoCoin.PRICE
    }
}

module.exports = {
    mainCryptFunction
}