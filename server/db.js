const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const mongoose = require("mongoose");

let client = null;
let db = null;

exports.init = (url, name, callBack, errBack) => {
   /* MongoClient.connect(url, { useNewUrlParser: true }, (err, database) => {
        if (err) {
            return errBack(err);
        }

        client = database;
        db = client.db(name);
        callBack();
    }); */

    // подключение
    mongoose.connect(`${url}/${name}`, { useNewUrlParser: true }).then(callBack, errBack);
};

exports.getCollection = (name) => db.collection(name);
exports.getId = (id) => ObjectID(id);

