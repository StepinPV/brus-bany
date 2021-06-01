const SettingsController = require('./controllers/Settings');
const cache = require('./cache');

let settings = null;

const update = async () => {
    const { data } = await SettingsController.get('main');
    if (data) {
        settings = JSON.parse(data);
    }

    cache.clearAll();
};

const get = async () => {
    if (!settings) {
        await update();
    }

    return settings || {};
};

exports.update = update;
exports.get = get;
