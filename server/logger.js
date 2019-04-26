require('colors');

exports.success = (message) => {
    console.log(message.green);
};

exports.error = (message) => {
    console.log(message.red);
};
