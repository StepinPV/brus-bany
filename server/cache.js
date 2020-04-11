const storage = {};

exports.get = (req) => {
    const key = req.originalUrl || req.url;
    return storage[key] ? storage[key].data : null;
};

exports.add = (req, data, group) => {
    const key = req.originalUrl || req.url;

    storage[key] = {
        group,
        data
    };

    return data;
};

exports.clear = (groups) => {
    for (let key in storage) {
        if (groups.includes(storage[key].group) || storage[key].group === 'main') {
            delete storage[key];
        }
    }
};
