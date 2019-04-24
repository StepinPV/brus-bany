const MongoClient = require('mongodb').MongoClient;

let client = null;
let db = null;

exports.init = (url, name, callBack, errBack) => {
    MongoClient.connect(url, (err, database) => {
        if (err) {
            return errBack(err);
        }

        client = database;
        db = client.db(name);
        callBack();
    });
};

exports.getCollection = (name) => db.collection(name);

