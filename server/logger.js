require('colors');

exports.success = (message) => {
    console.log(message.green);
};

exports.info = (message) => {
    console.log(message);
};

exports.error = (message) => {
    console.log(message.red);
};
