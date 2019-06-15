const mongoose = require("mongoose");

exports.init = (url, name, callBack, errBack) => {
   mongoose.connect(`${url}/${name}`, { useNewUrlParser: true }).then(callBack, errBack);
};

