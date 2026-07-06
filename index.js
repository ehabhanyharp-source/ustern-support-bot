const { Telegraf, Markup } = require('telegraf');
const express = require('express');

// التوكن الخاص بك
const bot = new Telegraf('8840523796:AAEAFM5-MBd5Eq2DFBv3WQPjTjXT5V-XOOI');
const app = express();
app.use(express.json());

// إضافة لضمان عمل البوت على Vercel ومنع خطأ Cannot GET /
app.get('/', (req, res) => res.send('Ustern Support Bot is Active!'));
app.post('/api/webhook', (req, res) => { bot.handleUpdate(req.body); res.sendStatus(200); });

// ==========================================
// قاعدة بيانات المشاكل والحلول الشاملة
// ==========================================
const productsData = {
    netflix: { name: '🎬 Netflix', problems: [
        { id: 'net_1', btn: '🔐 الباسورد غلط / الحساب مقفل', title: 'الباسورد غلط أو الحساب مقفل', steps: '1. تأكد من نسخ الإيميل والباسورد بدقة بدون أي مسافات زائدة.\n2. تأكد من أنك لم تقم بتغيير أي بيانات في الحساب.' },
        { id: 'net_2', btn: '📺 حد الشاشات (Too Many Screens)', title: 'حد الشاشات الأقصى', steps: '1. هذا يعني أن هناك ضغط مؤقت.\n2. يرجى الانتظار من 5 إلى 10 دقائق.' },
        { id: 'net_3', btn: '🌐 اللغة والترجمة', title: 'تغير اللغة أو الترجمة العربية', steps: '1. ادخل لإعدادات الحساب من المتصفح.\n2. اختر العربية من خيارات اللغة.' }
    ]},
    shahid: { name: '🌟 Shahid VIP', problems: [
        { id: 'sha_1', btn: '🆓 الحساب رجع مجاني', title: 'الحساب رجع مجاني', steps: '1. سجل خروج وأغلق التطبيق.\n2. أعد تسجيل دخولك.' },
        { id: 'sha_2', btn: '📱 حد الأجهزة', title: 'حد الأجهزة الأقصى', steps: '1. الحساب يعمل على جهاز واحد فقط.\n2. سجل خروج من أي أجهزة أخرى.' }
    ]},
    osn: { name: '📺 OSN+', problems: [
        { id: 'osn_1', btn: '🔐 كود الدخول', title: 'عدم وصول كود الدخول', steps: '1. تواصل مع الدعم فوراً لإرسال الكود.' },
        { id: 'osn_2', btn: '🌐 الترجمة', title: 'مشكلة الترجمة واللغة', steps: '1. من علامة (CC) اختر العربية.' }
    ]},
    disney: { name: '🏰 Disney+', problems: [
        { id: 'dis_1', btn: '🔐 الحساب مغلق', title: 'الحساب مغلق أو الباسورد خطأ', steps: '1. انتظر 10 دقائق ثم جرب الدخول مجدداً.' },
        { id: 'dis_2', btn: '🌐 الترجمة العربية', title: 'اختفاء الترجمة العربية', steps: '1. من إعدادات الصوت اختر العربية.' }
    ]}
};

const productsList = Object.keys(productsData);

// ==========================================
// الواجهة الرئيسية
// ==========================================
bot.start((ctx) => {
    return ctx.reply(`👋 أهلاً بك يا ${ctx.from.first_name} في بوت دعم Ustern!`, Markup.inlineKeyboard([
        [Markup.button.callback('❓ حلول المشاكل', 'faq')],
        [Markup.button.callback('🛒 الأسعار', 'pricing')],
        [Markup.button.callback('⚖️ شروط الضمان', 'terms')]
    ]));
});

bot.action('faq', (ctx) => {
    ctx.answerCbQuery();
    const buttons = productsList.map(p => [Markup.button.callback(productsData[p].name, 'prod_' + p)]);
    buttons.push([Markup.button.callback('🔙 العودة للرئيسية', 'back_home')]);
    return ctx.reply("🛍️ اختر المنتج:", Markup.inlineKeyboard(buttons));
});

productsList.forEach(key => {
    bot.action('prod_' + key, (ctx) => {
        ctx.answerCbQuery();
        const btns = productsData[key].problems.map(p => [Markup.button.callback(p.btn, 'err_' + p.id)]);
        btns.push([Markup.button.callback('🔙 عودة', 'faq')]);
        return ctx.reply(`اختر مشكلة في ${productsData[key].name}:`, Markup.inlineKeyboard(btns));
    });

    productsData[key].problems.forEach(p => {
        bot.action('err_' + p.id, (ctx) => {
            ctx.answerCbQuery();
            return ctx.reply(`🛠️ ${p.title}:\n\n${p.steps}`, Markup.inlineKeyboard([
                [Markup.button.callback('📞 تواصل مع الدعم', 'human_support')],
                [Markup.button.callback('⬅️ عودة', 'prod_' + key)]
            ]));
        });
    });
});

// ==========================================
// الدعم البشري (مُحدث بالشروط)
// ==========================================
bot.action('human_support', (ctx) => {
    ctx.answerCbQuery();
    return ctx.reply(`🎯 <b>تم تحويلك للدعم البشري:</b>

<b>⚠️ شروط التحدث مع الدعم:</b>
1. الالتزام بالاحترام المتبادل.
2. توضيح المشكلة بشفافية تامة.
3. عدم تكرار الرسائل.

<b>أرسل الآن في رسالة واحدة:</b>
1. رقم الطلب أو الإيميل.
2. شرح المشكلة بالتفصيل.
3. صورة للمشكلة (اختياري).`, { 
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([[Markup.button.callback('🔙 العودة للرئيسية', 'back_home')]])
    });
});

bot.action('pricing', (ctx) => ctx.editMessageText("🛒 الأسعار: تواصل معنا!", Markup.inlineKeyboard([[Markup.button.callback('🔙 عودة', 'back_home')]])));
bot.action('terms', (ctx) => ctx.editMessageText("⚖️ الضمان: استبدال فوري.", Markup.inlineKeyboard([[Markup.button.callback('🔙 عودة', 'back_home')]])));
bot.action('back_home', (ctx) => ctx.editMessageText("👋 أهلاً بك!", Markup.inlineKeyboard([
    [Markup.button.callback('❓ حلول المشاكل', 'faq')],
    [Markup.button.callback('🛒 الأسعار', 'pricing')],
    [Markup.button.callback('⚖️ شروط الضمان', 'terms')]
])));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Bot is running...'));
