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
      logger.info('\nПодключаемся к MongoDB...');
   });

   mongoose.connection.on('connected', function() {
      logger.success(`Подключение к MongoDB установлено`);
   });

   mongoose.connection.on('reconnected', function () {
      logger.success('Переподключились к MongoDB');
   });

   mongoose.connection.on('error', function(error) {
      logger.error('Ошибка подключения к MongoDB: ' + error);
   });

   mongoose.connection.on('disconnected', function() {
      logger.error('\nСвязь с MongoDB разорвана!');
      connect();
   });

   connect();
};

