const SUCCESS_COLOR = '\x1b[32m';
const ERROR_COLOR = '\x1b[31m';

exports.success = (message) => {
    console.log(SUCCESS_COLOR, message);
};

exports.error = (message) => {
    console.log(ERROR_COLOR, message);
};
