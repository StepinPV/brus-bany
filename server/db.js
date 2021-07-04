const mongoose = require('mongoose');
const logger = require('../utils/logger');

exports.init = (url, callBack) => {
   const connect = () => {
      mongoose.connect(url, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      }).then(callBack);
   };

   mongoose.connection.on('connecting', function() {
      logger.info(`\nПодключаемся к MongoDB для сайта ${process.env.NAME}...`);
   });

   mongoose.connection.on('connected', function() {
      logger.success(`Подключение к MongoDB для сайта ${process.env.NAME} установлено`);
   });

   mongoose.connection.on('reconnected', function () {
      logger.success(`Переподключились к MongoDB для сайта ${process.env.NAME}`);
   });

   mongoose.connection.on('error', function(error) {
      logger.error(`Ошибка подключения к MongoDB для сайта ${process.env.NAME}: ` + error);
   });

   mongoose.connection.on('disconnected', function() {
      logger.error(`\nСвязь с MongoDB для сайта ${process.env.NAME} разорвана!`);
      connect();
   });

   connect();
};

