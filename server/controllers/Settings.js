const Status = require('./Status');
const SettingsModel = require('../models/Settings');

class Settings {
    static async get(name) {
        const res = await SettingsModel.findOne({ name });
        return Status.success(res ? res.settings : '');
    };

    static async update(name, settings) {
        if (await SettingsModel.findOne({ name })) {
            await SettingsModel.updateOne({ name }, { name, settings }, { runValidators: true });
        } else {
            await SettingsModel.create({ name, settings });
        }

        return Status.success();
    };
}

module.exports = Settings;
