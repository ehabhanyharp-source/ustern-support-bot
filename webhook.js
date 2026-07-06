const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('8840523796:AAEAFM5-MBd5Eq2DFBv3WQPjTjXT5V-XOOI');

// هنا منطق البوت الخاص بك
bot.start((ctx) => ctx.reply('أهلاً بك في بوت Ustern!'));

// هذا هو الجزء الأهم لاستقبال الرسائل في Vercel
module.exports = async (req, res) => {
    try {
        await bot.handleUpdate(req.body);
        res.status(200).send('OK');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
};
