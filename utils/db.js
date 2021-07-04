const mongoose = require('mongoose');
const logger = require('../utils/logger');

exports.init = (url, name, callBack) => {
   const connect = () => {
      mongoose.connect(url, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      }).then(callBack);
   };

   mongoose.connection.on('connecting', function() {
      logger.info(`\n${name}: подключаемся к MongoDB...`);
   });

   mongoose.connection.on('connected', function() {
      logger.success(`${name}: подключение к MongoDB установлено`);
   });

   mongoose.connection.on('reconnected', function () {
      logger.success(`${name}: переподключились к MongoDB`);
   });

   mongoose.connection.on('error', function(error) {
      logger.error(`${name}: ошибка подключения к MongoDB ${error}`);
   });

   mongoose.connection.on('disconnected', function() {
      logger.error(`\n${name}: связь с MongoDB разорвана!`);
      connect();
   });

   connect();
};

