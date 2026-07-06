const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const bot = new Telegraf('8840523796:AAEAFM5-MBd5Eq2DFBv3WQPjTjXT5V-XOOI');
const app = express();
app.use(express.json());

// ده السطر اللي بيحل مشكلة الـ Cannot GET
app.get('/', (req, res) => res.send('Ustern Support Bot is Active!'));

app.post('/api/webhook', (req, res) => {
    bot.handleUpdate(req.body);
    res.sendStatus(200);
});

// --- الواجهة الرئيسية ---
bot.start((ctx) => {
    return ctx.reply(`👋 أهلاً بك يا ${ctx.from.first_name} في بوت Ustern!`, Markup.inlineKeyboard([
        [Markup.button.callback('❓ حلول المشاكل', 'faq')],
        [Markup.button.callback('🛒 الأسعار', 'pricing')]
    ]));
});

// --- قسم الأسئلة (بسيط) ---
bot.action('faq', (ctx) => {
    return ctx.reply("🛍️ اختر المنتج:", Markup.inlineKeyboard([
        [Markup.button.callback('🎬 Netflix', 'netflix')],
        [Markup.button.callback('🌟 Shahid VIP', 'shahid')],
        [Markup.button.callback('📺 OSN+', 'osn')],
        [Markup.button.callback('🏰 Disney+', 'disney')]
    ]));
});

// --- الأمثلة (كرر نفس النمط ده لكل المشاكل) ---
bot.action('netflix', (ctx) => {
    ctx.reply("مشاكل نتفليكس:", Markup.inlineKeyboard([
        [Markup.button.callback('🔐 الباسورد غلط', 'net_1')],
        [Markup.button.callback('📺 حد الشاشات', 'net_2')]
    ]));
});

bot.action('net_1', (ctx) => {
    ctx.reply("🛠️ الحل: تأكد من النسخ ولا تغير بيانات الحساب.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')]
    ]));
});

// --- قسم الدعم (ثابت) ---
bot.action('human_support', (ctx) => {
    return ctx.reply("🎯 <b>تم تحويلك للدعم:</b>\nأرسل رقم الطلب والمشكلة هنا، وسنرد عليك فوراً.", { parse_mode: 'HTML' });
});

bot.action('pricing', (ctx) => ctx.reply("🛒 الأسعار: تواصل معنا للتفاصيل!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Bot is running...'));
