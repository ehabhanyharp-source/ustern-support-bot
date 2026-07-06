const { Telegraf, Markup } = require('telegraf');
const express = require('express');

// التوكن الخاص بك
const bot = new Telegraf('8840523796:AAEAFM5-MBd5Eq2DFBv3WQPjTjXT5V-XOOI');
const app = express();
app.use(express.json());

app.post('/api/webhook', (req, res) => {
    bot.handleUpdate(req.body);
    res.sendStatus(200);
});

// قاعدة البيانات الأصلية كاملة
const productsData = {
    netflix: {
        name: '🎬 Netflix',
        problems: [
            { id: 'net_1', btn: '🔐 الباسورد غلط / الحساب مقفل', title: 'الباسورد غلط أو الحساب مقفل', steps: '1. تأكد من نسخ الإيميل والباسورد بدقة.\n2. لا تقم بتغيير أي بيانات في الحساب.' },
            { id: 'net_2', btn: '📺 حد الشاشات (Too Many Screens)', title: 'حد الشاشات الأقصى', steps: '1. هذا يعني أن هناك ضغط مؤقت.\n2. يرجى الانتظار من 5 إلى 10 دقائق.' },
            { id: 'net_3', btn: '🌐 اللغة والترجمة', title: 'تغير اللغة أو الترجمة العربية', steps: '1. ادخل إلى إعدادات الحساب من المتصفح.\n2. اختر العربية من خيارات اللغة.' },
            { id: 'net_4', btn: '💳 يطلب تحديث طريقة الدفع', title: 'رسالة تحديث طريقة الدفع', steps: '1. لا تقم بأي خطوة.\n2. تواصل مع الدعم فوراً.' }
        ]
    },
    shahid: {
        name: '🌟 Shahid VIP',
        problems: [
            { id: 'sha_1', btn: '🆓 الحساب رجع مجاني', title: 'الحساب رجع مجاني', steps: '1. سجل خروج وأغلق التطبيق.\n2. أعد تسجيل دخولك.' },
            { id: 'sha_2', btn: '📱 حد الأجهزة', title: 'حد الأجهزة الأقصى', steps: '1. الحساب يعمل على جهاز واحد فقط.\n2. سجل خروج من أي أجهزة أخرى.' },
            { id: 'sha_3', btn: '🌐 اللغة', title: 'لغة التطبيق والترجمة', steps: '1. من الإعدادات اختر اللغة العربية.' }
        ]
    },
    osn: {
        name: '📺 OSN+',
        problems: [
            { id: 'osn_1', btn: '🔐 كود الدخول', title: 'عدم وصول كود الدخول', steps: '1. تواصل مع الدعم فوراً لإرسال الكود.' },
            { id: 'osn_2', btn: '🌐 الترجمة', title: 'مشكلة الترجمة واللغة', steps: '1. من علامة (CC) اختر العربية.' },
            { id: 'osn_3', btn: '🔄 الحساب معلق', title: 'الحساب معلق أو يطلب التجديد', steps: '1. قم بعمل تسجيل خروج وإعادة دخول.' }
        ]
    },
    disney: {
        name: '🏰 Disney+',
        problems: [
            { id: 'dis_1', btn: '🔐 الحساب مغلق', title: 'الحساب مغلق أو الباسورد خطأ', steps: '1. انتظر 10 دقائق ثم جرب الدخول مجدداً.' },
            { id: 'dis_2', btn: '🌐 الترجمة العربية', title: 'اختفاء الترجمة العربية', steps: '1. من إعدادات الصوت اختر العربية.' },
            { id: 'dis_3', btn: '🚫 المنطقة', title: 'المحتوى غير متوفر', steps: '1. تأكد من إغلاق الـ VPN.' }
        ]
    }
};

// الواجهة الرئيسية
bot.start((ctx) => {
    return ctx.reply(`👋 أهلاً بك يا ${ctx.from.first_name} في بوت دعم Ustern!`, Markup.inlineKeyboard([
        [Markup.button.callback('❓ حلول المشاكل', 'faq')],
        [Markup.button.callback('🛒 الأسعار وطرق الدفع', 'pricing')],
        [Markup.button.callback('⚖️ شروط الضمان', 'terms')]
    ]));
});

// قائمة المنتجات (نظافة الشات)
bot.action('faq', (ctx) => {
    const buttons = Object.keys(productsData).map(k => [Markup.button.callback(productsData[k].name, 'prod_' + k)]);
    buttons.push([Markup.button.callback('🔙 عودة للرئيسية', 'back_home')]);
    return ctx.editMessageText("🛍️ اختر المنتج الذي تواجه مشكلة فيه:", Markup.inlineKeyboard(buttons));
});

// قائمة مشاكل المنتج (نظافة الشات)
Object.keys(productsData).forEach(key => {
    bot.action('prod_' + key, (ctx) => {
        const prod = productsData[key];
        const buttons = prod.problems.map(p => [Markup.button.callback(p.btn, 'err_' + p.id)]);
        buttons.push([Markup.button.callback('🔙 عودة للمنتجات', 'faq')]);
        return ctx.editMessageText(`مشاكل ${prod.name}:`, Markup.inlineKeyboard(buttons));
    });

    productsData[key].problems.forEach(p => {
        bot.action('err_' + p.id, (ctx) => {
            return ctx.editMessageText(`🛠️ <b>${p.title}:</b>\n\n${p.steps}\n\nإذا لم تحل، تواصل معنا:`, {
                parse_mode: 'HTML',
                ...Markup.inlineKeyboard([
                    [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
                    [Markup.button.callback('⬅️ عودة', 'prod_' + key)]
                ])
            });
        });
    });
});

// قسم الدعم البشري (رسالة ثابتة لا تختفي)
bot.action('human_support', (ctx) => {
    ctx.deleteMessage().catch(() => {});
    return ctx.reply("🎯 <b>تم تحويلك للدعم البشري:</b>\n\nأرسل في رسالة واحدة:\n1. رقم الطلب أو الإيميل.\n2. شرح المشكلة بالتفصيل.\n3. صورة (اختياري).\n\nهذه الرسالة ستظل ثابتة بانتظار ردك.", { 
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([[Markup.button.callback('🔙 العودة للرئيسية', 'back_home')]])
    });
});

// العودة للرئيسية
bot.action('back_home', (ctx) => {
    return ctx.editMessageText(`👋 أهلاً بك يا ${ctx.from.first_name} في بوت دعم Ustern!`, Markup.inlineKeyboard([
        [Markup.button.callback('❓ حلول المشاكل', 'faq')],
        [Markup.button.callback('🛒 الأسعار وطرق الدفع', 'pricing')],
        [Markup.button.callback('⚖️ شروط الضمان', 'terms')]
    ]));
});

bot.action('pricing', (ctx) => ctx.editMessageText("🛒 الأسعار: تواصل معنا للتفاصيل!", Markup.inlineKeyboard([[Markup.button.callback('🔙 عودة', 'back_home')]])));
bot.action('terms', (ctx) => ctx.editMessageText("⚖️ الضمان: استبدال فوري في حال وجود مشكلة تقنية.", Markup.inlineKeyboard([[Markup.button.callback('🔙 عودة', 'back_home')]])));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Bot is running...'));
