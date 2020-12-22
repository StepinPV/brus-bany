const TelegramBot = require('node-telegram-bot-api');
const logger = require('./logger');

let bot;

const CHATS = [{
    id: 27702291,
    name: 'Павел'
}, {
    id: 179886316,
    name: 'Игорь'
}, {
    id: 1258968095,
    name: 'Константинъ'
}, {
    id: 1252816969,
    name: 'Вера'
}, {
    id: 925807162,
    name: 'Марина'
}]

module.exports.init = async () => {
    bot = new TelegramBot('1377613799:AAFMa15az8V0bILnrolTtjGDbabbnBCV4_Q', { polling: false });

    // Пока просто отключаем pooling
    /* if(bot.isPolling()) {
        await bot.stopPolling();
    }
    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        const user = CHATS.find(item => item.id === chatId);

        if (user) {
            bot.sendMessage(chatId, `Добро пожаловать, ${user.name}! Мы с тобой уже знакомы.`);
            return;
        }

        bot.sendMessage(chatId, `Добро пожаловать! Твой уникальный ID ${chatId}. Перешли его Паше.`);
    }); */

    logger.success('Telegram bot запущен!');
};

module.exports.send = async (userName, message) => {
    if (bot) {
        const user = CHATS.find(item => item.name === userName);
        bot.sendMessage(user.id, message);
    }
};
