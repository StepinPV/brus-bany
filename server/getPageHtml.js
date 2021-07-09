const pug = require('pug');
const serialize = require('serialize-javascript');
const { render } = require('../dist/server/server');
const { get: getSettings } = require('./settings');

module.exports = async (pageData) => {
    const settings = await getSettings();

    const {
        head,
        markup,
        extractor,
        context,
        css,
        cssIds,
        settings: settingsForClient
    } = await render(pageData, settings);

    const scriptTags = extractor.getScriptTags();
    const linkTags = extractor.getLinkTags();
    const styleTags = extractor.getStyleTags();

    const isAdminPage = /^\/admin/.test(pageData.url);
    const data = {
        needCounters: process.env.NODE_ENV === 'production' && !isAdminPage,
        url: `${settings.domain}${pageData.url}`,
        title: head.title.toString(),
        meta: head.meta.toString(),
        link: head.link.toString(),
        data: serialize(context.simplePage ? {} : (context.data || {})),
        settings: serialize(context.simplePage ? {} : settingsForClient),
        needShareScript: Boolean(context.needShareScript),
        app: markup,
        favicon: settings && settings['__images__'] ? settings['__images__'][settings['favicon']] : '',
        logo152x152: settings && settings['__images__'] ? settings['__images__'][settings['logo152x152']] : '',
        css,
        cssIds,
        code: settings.code || {},
        assets: {
            styleTags,
            linkTags: context.simplePage ? null : linkTags.split('\n').filter(str => str.includes('as="script"')).join('\n'),
            scriptTags: context.simplePage ? null : scriptTags
        }
    };

    return {
        html: pug.renderFile(__dirname + '/templates/index.pug', data),
        status: context.status
    };
}
