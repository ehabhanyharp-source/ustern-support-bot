const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const bot = new Telegraf('8840523796:AAEAFM5-MBd5Eq2DFBv3WQPjTjXT5V-XOOI');
const app = express();

app.use(express.json());

// مسار للتأكد أن السيرفر يعمل
app.get('/', (req, res) => {
    res.send('Ustern Support Bot is Active!');
});

// استقبال رسايل تليجرام
app.post('/api/webhook', (req, res) => {
    bot.handleUpdate(req.body);
    res.sendStatus(200);
});

// بداية البوت
bot.start((ctx) => {
    return ctx.reply(`👋 أهلاً بك يا ${ctx.from.first_name} في بوت دعم Ustern!`, Markup.inlineKeyboard([
        [Markup.button.callback('❓ حلول المشاكل', 'faq')],
        [Markup.button.callback('🛒 الأسعار وطرق الدفع', 'pricing')],
        [Markup.button.callback('⚖️ شروط الضمان', 'terms')]
    ]));
});

// قائمة المنتجات (يدوية بالكامل)
bot.action('faq', (ctx) => {
    return ctx.editMessageText("🛍️ اختر المنتج الذي تواجه مشكلة فيه:", Markup.inlineKeyboard([
        [Markup.button.callback('🎬 Netflix', 'netflix')],
        [Markup.button.callback('🌟 Shahid VIP', 'shahid')],
        [Markup.button.callback('📺 OSN+', 'osn')],
        [Markup.button.callback('🏰 Disney+', 'disney')],
        [Markup.button.callback('🔙 عودة للرئيسية', 'back_home')]
    ]));
});

// --- قسم نتفليكس ---
bot.action('netflix', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل Netflix:", Markup.inlineKeyboard([
        [Markup.button.callback('🔐 الباسورد غلط', 'net_1')],
        [Markup.button.callback('📺 حد الشاشات', 'net_2')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('net_1', (ctx) => {
    return ctx.editMessageText("🛠️ الباسورد غلط:\n1. تأكد من النسخ بدقة.\n2. لا تغير أي بيانات في الحساب.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
        [Markup.button.callback('⬅️ عودة', 'netflix')]
    ]));
});

bot.action('net_2', (ctx) => {
    return ctx.editMessageText("📺 حد الشاشات:\n1. انتظر 5-10 دقائق.\n2. حاول مجدداً.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
        [Markup.button.callback('⬅️ عودة', 'netflix')]
    ]));
});

// --- قسم شاهد ---
bot.action('shahid', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل Shahid VIP:", Markup.inlineKeyboard([
        [Markup.button.callback('🆓 الحساب مجاني', 'sha_1')],
        [Markup.button.callback('📱 حد الأجهزة', 'sha_2')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('sha_1', (ctx) => {
    return ctx.editMessageText("🆓 الحساب مجاني:\n1. سجل خروج.\n2. أعد الدخول.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
        [Markup.button.callback('⬅️ عودة', 'shahid')]
    ]));
});

bot.action('sha_2', (ctx) => {
    return ctx.editMessageText("📱 حد الأجهزة:\n1. جهاز واحد فقط مسموح.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
        [Markup.button.callback('⬅️ عودة', 'shahid')]
    ]));
});

// --- قسم OSN ---
bot.action('osn', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل OSN+:", Markup.inlineKeyboard([
        [Markup.button.callback('🔐 كود الدخول', 'osn_1')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('osn_1', (ctx) => {
    return ctx.editMessageText("🔐 كود الدخول:\n1. تواصل مع الدعم فوراً.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
        [Markup.button.callback('⬅️ عودة', 'osn')]
    ]));
});

// --- قسم ديزني ---
bot.action('disney', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل Disney+:", Markup.inlineKeyboard([
        [Markup.button.callback('🔐 الباسورد', 'dis_1')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('dis_1', (ctx) => {
    return ctx.editMessageText("🔐 الباسورد:\n1. انتظر 10 دقائق.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
        [Markup.button.callback('⬅️ عودة', 'disney')]
    ]));
});

// --- قسم الدعم البشري (رسالة جديدة وثابتة) ---
bot.action('human_support', (ctx) => {
    ctx.deleteMessage().catch(() => {});
    return ctx.reply("🎯 <b>تم تحويلك للدعم البشري:</b>\n\nأرسل في رسالة واحدة:\n1. رقم الطلب.\n2. المشكلة.\n3. صورة (اختياري).\n\nهذه الرسالة ثابتة، يمكنك الكتابة في أي وقت.", { 
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([[Markup.button.callback('🔙 العودة للرئيسية', 'back_home')]])
    });
});

// --- العودة للرئيسية ---
bot.action('back_home', (ctx) => {
    return ctx.editMessageText(`👋 أهلاً بك يا ${ctx.from.first_name} في بوت دعم Ustern!`, Markup.inlineKeyboard([
        [Markup.button.callback('❓ حلول المشاكل', 'faq')],
        [Markup.button.callback('🛒 الأسعار وطرق الدفع', 'pricing')],
        [Markup.button.callback('⚖️ شروط الضمان', 'terms')]
    ]));
});

bot.action('pricing', (ctx) => ctx.editMessageText("🛒 الأسعار: تواصل معنا للتفاصيل!", Markup.inlineKeyboard([[Markup.button.callback('🔙 عودة', 'back_home')]])));
bot.action('terms', (ctx) => ctx.editMessageText("⚖️ الضمان: استبدال فوري.", Markup.inlineKeyboard([[Markup.button.callback('🔙 عودة', 'back_home')]])));

app.listen(3000, () => console.log('Bot is running on port 3000'));const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const bot = new Telegraf('8840523796:AAEAFM5-MBd5Eq2DFBv3WQPjTjXT5V-XOOI');
const app = express();

app.use(express.json());

// مسار للتأكد أن السيرفر يعمل
app.get('/', (req, res) => {
    res.send('Ustern Support Bot is Active!');
});

// استقبال رسايل تليجرام
app.post('/api/webhook', (req, res) => {
    bot.handleUpdate(req.body);
    res.sendStatus(200);
});

// بداية البوت
bot.start((ctx) => {
    return ctx.reply(`👋 أهلاً بك يا ${ctx.from.first_name} في بوت دعم Ustern!`, Markup.inlineKeyboard([
        [Markup.button.callback('❓ حلول المشاكل', 'faq')],
        [Markup.button.callback('🛒 الأسعار وطرق الدفع', 'pricing')],
        [Markup.button.callback('⚖️ شروط الضمان', 'terms')]
    ]));
});

// قائمة المنتجات (يدوية بالكامل)
bot.action('faq', (ctx) => {
    return ctx.editMessageText("🛍️ اختر المنتج الذي تواجه مشكلة فيه:", Markup.inlineKeyboard([
        [Markup.button.callback('🎬 Netflix', 'netflix')],
        [Markup.button.callback('🌟 Shahid VIP', 'shahid')],
        [Markup.button.callback('📺 OSN+', 'osn')],
        [Markup.button.callback('🏰 Disney+', 'disney')],
        [Markup.button.callback('🔙 عودة للرئيسية', 'back_home')]
    ]));
});

// --- قسم نتفليكس ---
bot.action('netflix', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل Netflix:", Markup.inlineKeyboard([
        [Markup.button.callback('🔐 الباسورد غلط', 'net_1')],
        [Markup.button.callback('📺 حد الشاشات', 'net_2')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('net_1', (ctx) => {
    return ctx.editMessageText("🛠️ الباسورد غلط:\n1. تأكد من النسخ بدقة.\n2. لا تغير أي بيانات في الحساب.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
        [Markup.button.callback('⬅️ عودة', 'netflix')]
    ]));
});

bot.action('net_2', (ctx) => {
    return ctx.editMessageText("📺 حد الشاشات:\n1. انتظر 5-10 دقائق.\n2. حاول مجدداً.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
        [Markup.button.callback('⬅️ عودة', 'netflix')]
    ]));
});

// --- قسم شاهد ---
bot.action('shahid', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل Shahid VIP:", Markup.inlineKeyboard([
        [Markup.button.callback('🆓 الحساب مجاني', 'sha_1')],
        [Markup.button.callback('📱 حد الأجهزة', 'sha_2')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('sha_1', (ctx) => {
    return ctx.editMessageText("🆓 الحساب مجاني:\n1. سجل خروج.\n2. أعد الدخول.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
        [Markup.button.callback('⬅️ عودة', 'shahid')]
    ]));
});

bot.action('sha_2', (ctx) => {
    return ctx.editMessageText("📱 حد الأجهزة:\n1. جهاز واحد فقط مسموح.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
        [Markup.button.callback('⬅️ عودة', 'shahid')]
    ]));
});

// --- قسم OSN ---
bot.action('osn', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل OSN+:", Markup.inlineKeyboard([
        [Markup.button.callback('🔐 كود الدخول', 'osn_1')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('osn_1', (ctx) => {
    return ctx.editMessageText("🔐 كود الدخول:\n1. تواصل مع الدعم فوراً.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
        [Markup.button.callback('⬅️ عودة', 'osn')]
    ]));
});

// --- قسم ديزني ---
bot.action('disney', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل Disney+:", Markup.inlineKeyboard([
        [Markup.button.callback('🔐 الباسورد', 'dis_1')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('dis_1', (ctx) => {
    return ctx.editMessageText("🔐 الباسورد:\n1. انتظر 10 دقائق.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
        [Markup.button.callback('⬅️ عودة', 'disney')]
    ]));
});

// --- قسم الدعم البشري (رسالة جديدة وثابتة) ---
bot.action('human_support', (ctx) => {
    ctx.deleteMessage().catch(() => {});
    return ctx.reply("🎯 <b>تم تحويلك للدعم البشري:</b>\n\nأرسل في رسالة واحدة:\n1. رقم الطلب.\n2. المشكلة.\n3. صورة (اختياري).\n\nهذه الرسالة ثابتة، يمكنك الكتابة في أي وقت.", { 
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([[Markup.button.callback('🔙 العودة للرئيسية', 'back_home')]])
    });
});

// --- العودة للرئيسية ---
bot.action('back_home', (ctx) => {
    return ctx.editMessageText(`👋 أهلاً بك يا ${ctx.from.first_name} في بوت دعم Ustern!`, Markup.inlineKeyboard([
        [Markup.button.callback('❓ حلول المشاكل', 'faq')],
        [Markup.button.callback('🛒 الأسعار وطرق الدفع', 'pricing')],
        [Markup.button.callback('⚖️ شروط الضمان', 'terms')]
    ]));
});

bot.action('pricing', (ctx) => ctx.editMessageText("🛒 الأسعار: تواصل معنا للتفاصيل!", Markup.inlineKeyboard([[Markup.button.callback('🔙 عودة', 'back_home')]])));
bot.action('terms', (ctx) => ctx.editMessageText("⚖️ الضمان: استبدال فوري.", Markup.inlineKeyboard([[Markup.button.callback('🔙 عودة', 'back_home')]])));

app.listen(3000, () => console.log('Bot is running on port 3000'));const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const bot = new Telegraf('8840523796:AAEAFM5-MBd5Eq2DFBv3WQPjTjXT5V-XOOI');
const app = express();

app.use(express.json());

// مسار للتأكد أن السيرفر يعمل
app.get('/', (req, res) => {
    res.send('Ustern Support Bot is Active!');
});

// استقبال رسايل تليجرام
app.post('/api/webhook', (req, res) => {
    bot.handleUpdate(req.body);
    res.sendStatus(200);
});

// بداية البوت
bot.start((ctx) => {
    return ctx.reply(`👋 أهلاً بك يا ${ctx.from.first_name} في بوت دعم Ustern!`, Markup.inlineKeyboard([
        [Markup.button.callback('❓ حلول المشاكل', 'faq')],
        [Markup.button.callback('🛒 الأسعار وطرق الدفع', 'pricing')],
        [Markup.button.callback('⚖️ شروط الضمان', 'terms')]
    ]));
});

// قائمة المنتجات (يدوية بالكامل)
bot.action('faq', (ctx) => {
    return ctx.editMessageText("🛍️ اختر المنتج الذي تواجه مشكلة فيه:", Markup.inlineKeyboard([
        [Markup.button.callback('🎬 Netflix', 'netflix')],
        [Markup.button.callback('🌟 Shahid VIP', 'shahid')],
        [Markup.button.callback('📺 OSN+', 'osn')],
        [Markup.button.callback('🏰 Disney+', 'disney')],
        [Markup.button.callback('🔙 عودة للرئيسية', 'back_home')]
    ]));
});

// --- قسم نتفليكس ---
bot.action('netflix', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل Netflix:", Markup.inlineKeyboard([
        [Markup.button.callback('🔐 الباسورد غلط', 'net_1')],
        [Markup.button.callback('📺 حد الشاشات', 'net_2')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('net_1', (ctx) => {
    return ctx.editMessageText("🛠️ الباسورد غلط:\n1. تأكد من النسخ بدقة.\n2. لا تغير أي بيانات في الحساب.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
        [Markup.button.callback('⬅️ عودة', 'netflix')]
    ]));
});

bot.action('net_2', (ctx) => {
    return ctx.editMessageText("📺 حد الشاشات:\n1. انتظر 5-10 دقائق.\n2. حاول مجدداً.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
        [Markup.button.callback('⬅️ عودة', 'netflix')]
    ]));
});

// --- قسم شاهد ---
bot.action('shahid', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل Shahid VIP:", Markup.inlineKeyboard([
        [Markup.button.callback('🆓 الحساب مجاني', 'sha_1')],
        [Markup.button.callback('📱 حد الأجهزة', 'sha_2')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('sha_1', (ctx) => {
    return ctx.editMessageText("🆓 الحساب مجاني:\n1. سجل خروج.\n2. أعد الدخول.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
        [Markup.button.callback('⬅️ عودة', 'shahid')]
    ]));
});

bot.action('sha_2', (ctx) => {
    return ctx.editMessageText("📱 حد الأجهزة:\n1. جهاز واحد فقط مسموح.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
        [Markup.button.callback('⬅️ عودة', 'shahid')]
    ]));
});

// --- قسم OSN ---
bot.action('osn', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل OSN+:", Markup.inlineKeyboard([
        [Markup.button.callback('🔐 كود الدخول', 'osn_1')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('osn_1', (ctx) => {
    return ctx.editMessageText("🔐 كود الدخول:\n1. تواصل مع الدعم فوراً.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
        [Markup.button.callback('⬅️ عودة', 'osn')]
    ]));
});

// --- قسم ديزني ---
bot.action('disney', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل Disney+:", Markup.inlineKeyboard([
        [Markup.button.callback('🔐 الباسورد', 'dis_1')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('dis_1', (ctx) => {
    return ctx.editMessageText("🔐 الباسورد:\n1. انتظر 10 دقائق.", Markup.inlineKeyboard([
        [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
        [Markup.button.callback('⬅️ عودة', 'disney')]
    ]));
});

// --- قسم الدعم البشري (رسالة جديدة وثابتة) ---
bot.action('human_support', (ctx) => {
    ctx.deleteMessage().catch(() => {});
    return ctx.reply("🎯 <b>تم تحويلك للدعم البشري:</b>\n\nأرسل في رسالة واحدة:\n1. رقم الطلب.\n2. المشكلة.\n3. صورة (اختياري).\n\nهذه الرسالة ثابتة، يمكنك الكتابة في أي وقت.", { 
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([[Markup.button.callback('🔙 العودة للرئيسية', 'back_home')]])
    });
});

// --- العودة للرئيسية ---
bot.action('back_home', (ctx) => {
    return ctx.editMessageText(`👋 أهلاً بك يا ${ctx.from.first_name} في بوت دعم Ustern!`, Markup.inlineKeyboard([
        [Markup.button.callback('❓ حلول المشاكل', 'faq')],
        [Markup.button.callback('🛒 الأسعار وطرق الدفع', 'pricing')],
        [Markup.button.callback('⚖️ شروط الضمان', 'terms')]
    ]));
});

bot.action('pricing', (ctx) => ctx.editMessageText("🛒 الأسعار: تواصل معنا للتفاصيل!", Markup.inlineKeyboard([[Markup.button.callback('🔙 عودة', 'back_home')]])));
bot.action('terms', (ctx) => ctx.editMessageText("⚖️ الضمان: استبدال فوري.", Markup.inlineKeyboard([[Markup.button.callback('🔙 عودة', 'back_home')]])));

app.listen(3000, () => console.log('Bot is running on port 3000'));
