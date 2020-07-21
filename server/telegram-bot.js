const TelegramBot = require('node-telegram-bot-api');
const logger = require('./logger');

let bot;

const CHATS = {
    27702291: 'Павел',
    179886316: 'Игорь'
};

module.exports.init = () => {
    bot = new TelegramBot('1377613799:AAFMa15az8V0bILnrolTtjGDbabbnBCV4_Q', { polling: true });

    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;

        if (CHATS[chatId]) {
            bot.sendMessage(chatId, `Добро пожаловать, ${CHATS[chatId]}! Мы с тобой уже знакомы.`);
            return;
        }

        bot.sendMessage(chatId, `Добро пожаловать! Твой уникальный ID ${msg.chat.id}. Перешли его Паше.`);
    });

    logger.success('Telegram bot запущен!');
};

module.exports.send = (chatId, message) => {
    if (bot) {
        bot.sendMessage(chatId, message);
    }
};

/* bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    bot.sendMessage(chatId, resp);
}); */

// Listen for any kind of message. There are different kinds of
// messages.
/* bot.on('message', (msg) => {
    // const chatId = msg.chat.id;

    // console.log(chatId);

    // send a message to the chat acknowledging receipt of their message
    // bot.sendMessage(chatId, 'Received your message');
}); */
