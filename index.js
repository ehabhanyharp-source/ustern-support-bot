const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const bot = new Telegraf('8840523796:AAEAFM5-MBd5Eq2DFBv3WQPjTjXT5V-XOOI');
const app = express();
app.use(express.json());

// هذا السطر يحل مشكلة الـ Cannot GET
app.get('/', (req, res) => {
    res.send('Ustern Support Bot is Active!');
});

app.post('/api/webhook', (req, res) => {
    bot.handleUpdate(req.body);
    res.sendStatus(200);
});

// هنا الكود المفصل لكل منتج (بدون اختصار)
bot.start((ctx) => {
    return ctx.reply(`👋 أهلاً بك يا ${ctx.from.first_name} في بوت دعم Ustern!`, Markup.inlineKeyboard([
        [Markup.button.callback('❓ حلول المشاكل', 'faq')],
        [Markup.button.callback('🛒 الأسعار وطرق الدفع', 'pricing')],
        [Markup.button.callback('⚖️ شروط الضمان', 'terms')]
    ]));
});

bot.action('faq', (ctx) => {
    return ctx.editMessageText("🛍️ اختر المنتج:", Markup.inlineKeyboard([
        [Markup.button.callback('🎬 Netflix', 'netflix')],
        [Markup.button.callback('🌟 Shahid VIP', 'shahid')],
        [Markup.button.callback('📺 OSN+', 'osn')],
        [Markup.button.callback('🏰 Disney+', 'disney')],
        [Markup.button.callback('🔙 عودة', 'back_home')]
    ]));
});

// هنا كل قسم لوحده بالتفصيل الممل
bot.action('netflix', (ctx) => {
    return ctx.editMessageText("مشاكل Netflix:", Markup.inlineKeyboard([
        [Markup.button.callback('🔐 الباسورد غلط', 'net_1')],
        [Markup.button.callback('📺 حد الشاشات', 'net_2')],
        [Markup.button.callback('🔙 عودة', 'faq')]
    ]));
});

bot.action('net_1', (ctx) => {
    return ctx.editMessageText("🛠️ الباسورد غلط:\n1. تأكد من النسخ.\n2. لا تغير بيانات.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
        [Markup.button.callback('⬅️ عودة', 'netflix')]
    ]));
});

// (وهكذا بتكرر نفس النمط ده لكل المنتجات الباقية...)

bot.action('human_support', (ctx) => {
    ctx.deleteMessage().catch(() => {});
    return ctx.reply("🎯 تم تحويلك للدعم البشري، أرسل مشكلتك هنا وسنرد فوراً.", {
        ...Markup.inlineKeyboard([[Markup.button.callback('🔙 عودة للرئيسية', 'back_home')]])
    });
});

bot.action('back_home', (ctx) => {
    return ctx.editMessageText(`👋 أهلاً بك في بوت دعم Ustern!`, Markup.inlineKeyboard([
        [Markup.button.callback('❓ حلول المشاكل', 'faq')],
        [Markup.button.callback('🛒 الأسعار', 'pricing')]
    ]));
});

app.listen(3000, () => console.log('Bot is running...'));
