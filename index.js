require('dotenv').config()
const {Telegraf} = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Ищу картинки в Гугле и Яндексе. Отправь мне фото, чтобы начать.'))
bot.help((ctx) => ctx.reply('Ищу картинки в Гугле и Яндексе. Отправь мне фото, чтобы начать.'))
bot.on('photo', async (ctx) => {
    const chatId = process.env.CHAT_ID
    const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id
    const imageUrl = await ctx.telegram.getFileLink(fileId)
    const href = imageUrl.href
    const yaUrl = 'https://yandex.by/images/search?rpt=imageview&url=' + href
    const goUrl = 'https://www.google.com/searchbyimage?image_url=' + href
    const message = ctx.reply(href)


    ctx.reply('Yandex: \n' + yaUrl, { disable_web_page_preview: true })
    ctx.reply('Google: \n' + goUrl, { disable_web_page_preview: true })
    //return this.copyMessage(chatId, message.chat.id, message.message_id, extra)

})

bot.launch()


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))