const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const bot = new Telegraf('8840523796:AAEAFM5-MBd5Eq2DFBv3WQPjTjXT5V-XOOI');
const app = express();
app.use(express.json());

app.post('/api/webhook', (req, res) => {
    bot.handleUpdate(req.body);
    res.sendStatus(200);
});

app.get('/', (req, res) => {
    res.send('Ustern Support Bot is Active!');
});

// ==========================================
// قاعدة بيانات المنتجات والشروحات
// ==========================================
const productsData = {
    netflix: { name: '🎬 Netflix', problems: [
        { id: 'net_1', btn: '🔐 الباسورد غلط / الحساب مقفل', title: 'الباسورد غلط أو الحساب مقفل', steps: '1. تأكد من نسخ الإيميل والباسورد بدقة.\n2. لا تغير أي بيانات في الحساب.' },
        { id: 'net_2', btn: '📺 حد الشاشات (Too Many Screens)', title: 'حد الشاشات الأقصى', steps: '1. انتظر من 5 إلى 10 دقائق.\n2. تأكد من دخول الشاشة المخصصة لك فقط.' },
        { id: 'net_3', btn: '🌐 اللغة والترجمة', title: 'تغير اللغة أو الترجمة العربية', steps: '1. من إعدادات الحساب اختر العربية.\n2. من مشغل الفيديو اختر لغة الترجمة.' },
        { id: 'net_4', btn: '💳 يطلب تحديث طريقة الدفع', title: 'رسالة تحديث طريقة الدفع', steps: '1. لا تضف أي بطاقة.\n2. تواصل مع الدعم فوراً.' }
    ]},
    shahid: { name: '🌟 Shahid VIP', problems: [
        { id: 'sha_1', btn: '🆓 الحساب رجع مجاني', title: 'الحساب رجع مجاني', steps: '1. سجل خروج وأغلق التطبيق.\n2. سجل دخولك مجدداً.' },
        { id: 'sha_2', btn: '📱 حد الأجهزة', title: 'حد الأجهزة الأقصى', steps: '1. سياسة المتجر (جهاز واحد فقط).\n2. سجل خروج من أي أجهزة أخرى.' },
        { id: 'sha_3', btn: '🌐 اللغة', title: 'لغة التطبيق', steps: '1. من القائمة الجانبية اختر الإعدادات.\n2. غير اللغة للعربية.' }
    ]},
    osn: { name: '📺 OSN+', problems: [
        { id: 'osn_1', btn: '🔐 كود الدخول', title: 'عدم وصول كود الدخول', steps: '1. تواصل مع الدعم فوراً لإرسال الكود.' },
        { id: 'osn_2', btn: '🌐 الترجمة', title: 'مشكلة الترجمة', steps: '1. من علامة (CC) اختر العربية.' },
        { id: 'osn_3', btn: '🔄 الحساب معلق', title: 'الحساب معلق', steps: '1. سجل خروج وإعادة دخول.' }
    ]},
    disney: { name: '🏰 Disney+', problems: [
        { id: 'dis_1', btn: '🔐 الباسورد غير صحيح', title: 'الباسورد خطأ', steps: '1. انتظر 10 دقائق وجرب مجدداً.' },
        { id: 'dis_2', btn: '🌐 الترجمة', title: 'اختفاء الترجمة العربية', steps: '1. من إعدادات الصوت اختر العربية.' },
        { id: 'dis_3', btn: '🚫 المحتوى غير متوفر', title: 'المحتوى غير متوفر بالمنطقة', steps: '1. تأكد من إغلاق الـ VPN.' }
    ]}
};

const productsList = Object.keys(productsData);

// ==========================================
// الواجهة الرئيسية
// ==========================================
bot.start((ctx) => {
    return ctx.reply(`👋 أهلاً بك يا ${ctx.from.first_name} في بوت دعم <b>Ustern</b>!`, {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
            [Markup.button.callback('❓ حلول المشاكل', 'faq')],
            [Markup.button.callback('📖 دليل التشغيل', 'guides')],
            [Markup.button.callback('🛒 الأسعار وطرق الدفع', 'pricing')],
            [Markup.button.callback('⚖️ شروط الضمان', 'terms')]
        ])
    });
});

// الأقسام والحلول
bot.action('faq', (ctx) => {
    ctx.answerCbQuery();
    const buttons = productsList.map(k => [Markup.button.callback(productsData[k].name, 'prod_' + k)]);
    buttons.push([Markup.button.callback('🔙 عودة', 'back_home')]);
    return ctx.editMessageText("🛍️ اختر المنتج:", Markup.inlineKeyboard(buttons));
});

productsList.forEach(key => {
    bot.action('prod_' + key, (ctx) => {
        ctx.answerCbQuery();
        const btns = productsData[key].problems.map(p => [Markup.button.callback(p.btn, 'err_' + p.id)]);
        btns.push([Markup.button.callback('🔙 عودة للمنتجات', 'faq')]);
        return ctx.editMessageText(`مشاكل ${productsData[key].name}:`, Markup.inlineKeyboard(btns));
    });

    productsData[key].problems.forEach(p => {
        bot.action('err_' + p.id, (ctx) => {
            ctx.answerCbQuery();
            const txt = `🛠️ <b>حل مشكلة ${p.title}:</b>\n\n${p.steps}\n\nإذا لم تُحل، اضغط أدناه للتواصل:`;
            return ctx.editMessageText(txt, { parse_mode: 'HTML', ...Markup.inlineKeyboard([
                [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
                [Markup.button.callback('⬅️ عودة', 'prod_' + key)]
            ])});
        });
    });
});

// قسم الدعم الثابت (لا يمسح الرسائل)
bot.action('human_support', (ctx) => {
    ctx.answerCbQuery();
    const supportMsg = "🎯 <b>مركز دعم Ustern البشري:</b>\n\n" +
                       "يرجى إرسال رسالة واحدة فيها:\n" +
                       "1️⃣ رقم الطلب أو الإيميل.\n" +
                       "2️⃣ شرح المشكلة بالتفصيل.\n" +
                       "3️⃣ صورة للمشكلة (اختياري).\n\n" +
                       "⏳ <i>يرجى الانتظار، سيتم الرد عليك في أقرب وقت.</i>";
    return ctx.reply(supportMsg, { parse_mode: 'HTML', ...Markup.inlineKeyboard([[Markup.button.callback('🔙 عودة للرئيسية', 'back_home')]]) });
});

// الشروط والأسعار (تم اختصارها لتوفير مساحة)
bot.action('pricing', (ctx) => ctx.editMessageText("🛒 <b>الأسعار:</b>\nنتفليكس وشاهد بأسعار منافسة.\nالدفع: فودافون كاش / إنستا باي.", { parse_mode: 'HTML', ...Markup.inlineKeyboard([[Markup.button.callback('🔙 عودة', 'back_home')]]) }));
bot.action('terms', (ctx) => ctx.editMessageText("⚖️ <b>الضمان:</b>\nالمنتجات رقمية لا تسترد.\nنضمن استبدال الحساب في حال وجود مشكلة تقنية.", { parse_mode: 'HTML', ...Markup.inlineKeyboard([[Markup.button.callback('🔙 عودة', 'back_home')]]) }));

bot.action('back_home', (ctx) => {
    ctx.answerCbQuery();
    return ctx.editMessageText("🔙 القائمة الرئيسية:", Markup.inlineKeyboard([
        [Markup.button.callback('❓ حلول المشاكل', 'faq')],
        [Markup.button.callback('📖 دليل التشغيل', 'guides')],
        [Markup.button.callback('🛒 الأسعار', 'pricing')],
        [Markup.button.callback('⚖️ شروط الضمان', 'terms')]
    ]));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
