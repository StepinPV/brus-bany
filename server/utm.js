const url = require('url');

module.exports.middleware = function(req, res, next) {
    const urlParts = url.parse(req.url, true);

    if (urlParts && urlParts.query) {
        let UTMParams = '';
        Object.keys(urlParts.query).forEach(function(key) {
            if (/^utm_/.test(key)) {
                UTMParams += `${UTMParams ? ';' : ''}${key}=${urlParts.query[key]}`;
            }
        });

        if (UTMParams) {
            res.cookie('saved_utm_params', UTMParams, {
                httpOnly: true
            });
        }
    }

    next();
};

module.exports.get = function(req) {
    if (req.cookies && req.cookies['saved_utm_params']) {
        return req.cookies['saved_utm_params'].split(';').reduce(function(acc, str) {
            const [name, value] = str.split('=');
            acc.push({ name, value });
            return acc;
        }, []);
    }

    return null;
};
