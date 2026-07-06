const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const bot = new Telegraf('8840523796:AAEAFM5-MBd5Eq2DFBv3WQPjTjXT5V-XOOI');
const app = express();
app.use(express.json());

// التعديل عشان صفحة الويب متطلعش إيرور
app.get('/', (req, res) => {
    res.send('Ustern Support Bot is Active!');
});

app.post('/api/webhook', (req, res) => {
    bot.handleUpdate(req.body);
    res.sendStatus(200);
});

bot.start((ctx) => {
    return ctx.reply(`👋 أهلاً بك يا ${ctx.from.first_name} في بوت دعم Ustern!`, Markup.inlineKeyboard([
        [Markup.button.callback('❓ حلول المشاكل', 'faq')],
        [Markup.button.callback('🛒 الأسعار وطرق الدفع', 'pricing')],
        [Markup.button.callback('⚖️ شروط الضمان', 'terms')]
    ]));
});

bot.action('faq', (ctx) => {
    return ctx.editMessageText("🛍️ اختر المنتج الذي تواجه مشكلة فيه:", Markup.inlineKeyboard([
        [Markup.button.callback('🎬 Netflix', 'netflix')],
        [Markup.button.callback('🌟 Shahid VIP', 'shahid')],
        [Markup.button.callback('📺 OSN+', 'osn')],
        [Markup.button.callback('🏰 Disney+', 'disney')],
        [Markup.button.callback('🔙 عودة للرئيسية', 'back_home')]
    ]));
});

bot.action('netflix', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل Netflix:", Markup.inlineKeyboard([
        [Markup.button.callback('🔐 الباسورد غلط / الحساب مقفل', 'net_1')],
        [Markup.button.callback('📺 حد الشاشات (Too Many Screens)', 'net_2')],
        [Markup.button.callback('🌐 اللغة والترجمة', 'net_3')],
        [Markup.button.callback('💳 يطلب تحديث طريقة الدفع', 'net_4')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('net_1', (ctx) => ctx.editMessageText("🛠️ الباسورد غلط أو الحساب مقفل:\n1. تأكد من نسخ الإيميل والباسورد بدقة بدون أي مسافات زائدة.\n2. تأكد من أنك لم تقم بتغيير أي بيانات في الحساب.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'netflix')]])));
bot.action('net_2', (ctx) => ctx.editMessageText("📺 حد الشاشات الأقصى:\n1. هذا يعني أن هناك ضغط مؤقت.\n2. يرجى الانتظار من 5 إلى 10 دقائق.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'netflix')]])));
bot.action('net_3', (ctx) => ctx.editMessageText("🌐 تغير اللغة أو الترجمة العربية:\n1. ادخل إلى إعدادات الحساب من المتصفح.\n2. اختر العربية من خيارات اللغة.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'netflix')]])));
bot.action('net_4', (ctx) => ctx.editMessageText("💳 رسالة تحديث طريقة الدفع:\n1. لا تقم بأي خطوة.\n2. تواصل مع الدعم فوراً.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'netflix')]])));

bot.action('shahid', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل Shahid VIP:", Markup.inlineKeyboard([
        [Markup.button.callback('🆓 الحساب رجع مجاني', 'sha_1')],
        [Markup.button.callback('📱 حد الأجهزة', 'sha_2')],
        [Markup.button.callback('🌐 اللغة', 'sha_3')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('sha_1', (ctx) => ctx.editMessageText("🆓 الحساب رجع مجاني:\n1. سجل خروج وأغلق التطبيق.\n2. أعد تسجيل دخولك.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'shahid')]])));
bot.action('sha_2', (ctx) => ctx.editMessageText("📱 حد الأجهزة الأقصى:\n1. الحساب يعمل على جهاز واحد فقط.\n2. سجل خروج من أي أجهزة أخرى.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'shahid')]])));
bot.action('sha_3', (ctx) => ctx.editMessageText("🌐 لغة التطبيق والترجمة:\n1. من الإعدادات اختر اللغة العربية.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'shahid')]])));

bot.action('osn', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل OSN+:", Markup.inlineKeyboard([
        [Markup.button.callback('🔐 كود الدخول', 'osn_1')],
        [Markup.button.callback('🌐 الترجمة', 'osn_2')],
        [Markup.button.callback('🔄 الحساب معلق', 'osn_3')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('osn_1', (ctx) => ctx.editMessageText("🔐 عدم وصول كود الدخول:\n1. تواصل مع الدعم فوراً لإرسال الكود.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'osn')]])));
bot.action('osn_2', (ctx) => ctx.editMessageText("🌐 مشكلة الترجمة واللغة:\n1. من علامة (CC) اختر العربية.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'osn')]])));
bot.action('osn_3', (ctx) => ctx.editMessageText("🔄 الحساب معلق أو يطلب التجديد:\n1. قم بعمل تسجيل خروج وإعادة دخول.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'osn')]])));

bot.action('disney', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل Disney+:", Markup.inlineKeyboard([
        [Markup.button.callback('🔐 الحساب مغلق', 'dis_1')],
        [Markup.button.callback('🌐 الترجمة العربية', 'dis_2')],
        [Markup.button.callback('🚫 المنطقة', 'dis_3')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('dis_1', (ctx) => ctx.editMessageText("🔐 الحساب مغلق أو الباسورد خطأ:\n1. انتظر 10 دقائق ثم جرب الدخول مجدداً.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'disney')]])));
bot.action('dis_2', (ctx) => ctx.editMessageText("🌐 اختفاء الترجمة العربية:\n1. من إعدادات الصوت اختر العربية.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'disney')]])));
bot.action('dis_3', (ctx) => ctx.editMessageText("🚫 المحتوى غير متوفر:\n1. تأكد من إغلاق الـ VPN.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'disney')]])));

bot.action('human_support', (ctx) => {
    ctx.deleteMessage().catch(() => {});
    return ctx.reply("🎯 <b>تم تحويلك للدعم البشري:</b>\n\nأرسل في رسالة واحدة:\n1. رقم الطلب أو الإيميل.\n2. شرح المشكلة بالتفصيل.\n3. صورة (اختياري).\n\nهذه الرسالة ثابتة في انتظار ردك.", { 
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([[Markup.button.callback('🔙 العودة للرئيسية', 'back_home')]])
    });
});

bot.action('back_home', (ctx) => {
    return ctx.editMessageText(`👋 أconst { Telegraf, Markup } = require('telegraf');
const express = require('express');

const bot = new Telegraf('8840523796:AAEAFM5-MBd5Eq2DFBv3WQPjTjXT5V-XOOI');
const app = express();
app.use(express.json());

// التعديل عشان صفحة الويب متطلعش إيرور
app.get('/', (req, res) => {
    res.send('Ustern Support Bot is Active!');
});

app.post('/api/webhook', (req, res) => {
    bot.handleUpdate(req.body);
    res.sendStatus(200);
});

bot.start((ctx) => {
    return ctx.reply(`👋 أهلاً بك يا ${ctx.from.first_name} في بوت دعم Ustern!`, Markup.inlineKeyboard([
        [Markup.button.callback('❓ حلول المشاكل', 'faq')],
        [Markup.button.callback('🛒 الأسعار وطرق الدفع', 'pricing')],
        [Markup.button.callback('⚖️ شروط الضمان', 'terms')]
    ]));
});

bot.action('faq', (ctx) => {
    return ctx.editMessageText("🛍️ اختر المنتج الذي تواجه مشكلة فيه:", Markup.inlineKeyboard([
        [Markup.button.callback('🎬 Netflix', 'netflix')],
        [Markup.button.callback('🌟 Shahid VIP', 'shahid')],
        [Markup.button.callback('📺 OSN+', 'osn')],
        [Markup.button.callback('🏰 Disney+', 'disney')],
        [Markup.button.callback('🔙 عودة للرئيسية', 'back_home')]
    ]));
});

bot.action('netflix', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل Netflix:", Markup.inlineKeyboard([
        [Markup.button.callback('🔐 الباسورد غلط / الحساب مقفل', 'net_1')],
        [Markup.button.callback('📺 حد الشاشات (Too Many Screens)', 'net_2')],
        [Markup.button.callback('🌐 اللغة والترجمة', 'net_3')],
        [Markup.button.callback('💳 يطلب تحديث طريقة الدفع', 'net_4')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('net_1', (ctx) => ctx.editMessageText("🛠️ الباسورد غلط أو الحساب مقفل:\n1. تأكد من نسخ الإيميل والباسورد بدقة بدون أي مسافات زائدة.\n2. تأكد من أنك لم تقم بتغيير أي بيانات في الحساب.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'netflix')]])));
bot.action('net_2', (ctx) => ctx.editMessageText("📺 حد الشاشات الأقصى:\n1. هذا يعني أن هناك ضغط مؤقت.\n2. يرجى الانتظار من 5 إلى 10 دقائق.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'netflix')]])));
bot.action('net_3', (ctx) => ctx.editMessageText("🌐 تغير اللغة أو الترجمة العربية:\n1. ادخل إلى إعدادات الحساب من المتصفح.\n2. اختر العربية من خيارات اللغة.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'netflix')]])));
bot.action('net_4', (ctx) => ctx.editMessageText("💳 رسالة تحديث طريقة الدفع:\n1. لا تقم بأي خطوة.\n2. تواصل مع الدعم فوراً.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'netflix')]])));

bot.action('shahid', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل Shahid VIP:", Markup.inlineKeyboard([
        [Markup.button.callback('🆓 الحساب رجع مجاني', 'sha_1')],
        [Markup.button.callback('📱 حد الأجهزة', 'sha_2')],
        [Markup.button.callback('🌐 اللغة', 'sha_3')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('sha_1', (ctx) => ctx.editMessageText("🆓 الحساب رجع مجاني:\n1. سجل خروج وأغلق التطبيق.\n2. أعد تسجيل دخولك.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'shahid')]])));
bot.action('sha_2', (ctx) => ctx.editMessageText("📱 حد الأجهزة الأقصى:\n1. الحساب يعمل على جهاز واحد فقط.\n2. سجل خروج من أي أجهزة أخرى.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'shahid')]])));
bot.action('sha_3', (ctx) => ctx.editMessageText("🌐 لغة التطبيق والترجمة:\n1. من الإعدادات اختر اللغة العربية.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'shahid')]])));

bot.action('osn', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل OSN+:", Markup.inlineKeyboard([
        [Markup.button.callback('🔐 كود الدخول', 'osn_1')],
        [Markup.button.callback('🌐 الترجمة', 'osn_2')],
        [Markup.button.callback('🔄 الحساب معلق', 'osn_3')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('osn_1', (ctx) => ctx.editMessageText("🔐 عدم وصول كود الدخول:\n1. تواصل مع الدعم فوراً لإرسال الكود.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'osn')]])));
bot.action('osn_2', (ctx) => ctx.editMessageText("🌐 مشكلة الترجمة واللغة:\n1. من علامة (CC) اختر العربية.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'osn')]])));
bot.action('osn_3', (ctx) => ctx.editMessageText("🔄 الحساب معلق أو يطلب التجديد:\n1. قم بعمل تسجيل خروج وإعادة دخول.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'osn')]])));

bot.action('disney', (ctx) => {
    return ctx.editMessageText("🛠️ مشاكل Disney+:", Markup.inlineKeyboard([
        [Markup.button.callback('🔐 الحساب مغلق', 'dis_1')],
        [Markup.button.callback('🌐 الترجمة العربية', 'dis_2')],
        [Markup.button.callback('🚫 المنطقة', 'dis_3')],
        [Markup.button.callback('🔙 عودة للمنتجات', 'faq')]
    ]));
});

bot.action('dis_1', (ctx) => ctx.editMessageText("🔐 الحساب مغلق أو الباسورد خطأ:\n1. انتظر 10 دقائق ثم جرب الدخول مجدداً.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'disney')]])));
bot.action('dis_2', (ctx) => ctx.editMessageText("🌐 اختفاء الترجمة العربية:\n1. من إعدادات الصوت اختر العربية.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'disney')]])));
bot.action('dis_3', (ctx) => ctx.editMessageText("🚫 المحتوى غير متوفر:\n1. تأكد من إغلاق الـ VPN.", Markup.inlineKeyboard([[Markup.button.callback('📞 تواصل مع الدعم', 'human_support'), Markup.button.callback('⬅️ عودة', 'disney')]])));

bot.action('human_support', (ctx) => {
    ctx.deleteMessage().catch(() => {});
    return ctx.reply("🎯 <b>تم تحويلك للدعم البشري:</b>\n\nأرسل في رسالة واحدة:\n1. رقم الطلب أو الإيميل.\n2. شرح المشكلة بالتفصيل.\n3. صورة (اختياري).\n\nهذه الرسالة ثابتة في انتظار ردك.", { 
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([[Markup.button.callback('🔙 العودة للرئيسية', 'back_home')]])
    });
});

bot.action('back_home', (ctx) => {
    return ctx.editMessageText(`👋 أ
