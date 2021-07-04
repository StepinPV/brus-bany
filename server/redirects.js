const { get: getSettings } = require('./settings');
const Links = require('./controllers/Links');

module.exports = async (req, res, next) => {
    const settings = await getSettings();

    let redirectMatch;
    if (settings.redirects) {
        do {
            const match = settings.redirects.find(item => {
                if (new RegExp('^' + item.from).test(redirectMatch ? redirectMatch.to : req.originalUrl)) {
                    return true;
                }
            });

            if (match) {
                redirectMatch = match;
            } else {
                break;
            }
        } while(true);
    }

    if (redirectMatch) {
        res.redirect(301, redirectMatch.to);
    } else if(/^\/link_/.test(req.url)) {
        const { status, data } = await Links.get({ from: req.url });

        if (status === 'success') {
            res.redirect(301, data.get('to'));
        } else {
            next();
        }
    } else {
        next();
    }
};
