const express = require('express');
const serialize = require('serialize-javascript');
const { render } = require('../dist/server/server');
const assetsManifest = require('../public/mstatic/build/manifest.json');
const logger = require('../utils/logger');
const config = require('./config');
const { get: getSettings } = require('./settings');

const cache = require('./cache');

const router = express.Router();

router.get('*', async (req, res, next) => {
    try {
        function sendRes(preloadLinks, data) {
            res.set('Link', preloadLinks);
            res.setHeader('Cache-Control', 'no-cache');
            res.render('index.pug', data);
        }

        let fromCache = cache.get(req);
        if (fromCache) {
            fromCache = JSON.parse(fromCache);
            sendRes(fromCache.preloadLinks, fromCache.data);
            return;
        }

        const axiosOptions = {
            apiURL: `http://localhost:${config.port}`
        };

        const settings = await getSettings();

        const {
            head,
            markup,
            extractor,
            context,
            css,
            cssIds,
            theme
        } = await render(req, res, axiosOptions, settings);

        if (context.status === 404) {
            res.status(404);
        }

        if (context.action === 'REPLACE') {
            res.writeHead(302, { Location: context.url });
            res.end();
        } else {
            const scriptTags = extractor.getScriptTags();
            const linkTags = extractor.getLinkTags();
            const styleTags = extractor.getStyleTags();

            const mainAssets = extractor.getChunkAssets(['main']);

            const preloadLinks = [];
            mainAssets.forEach((asset) => {
                if (context.simplePage && asset.scriptType === 'script') {
                    return;
                }
                preloadLinks.push(`<${asset.url}>; rel=preload; as=${asset.scriptType}`);
            });

            const isAdminPage = /^\/admin/.test(req.url);
            const data = {
                needCounters: process.env.NODE_ENV === 'production' && !isAdminPage,
                url: `${settings.domain || req.get('host')}${req.url}`,
                title: head.title.toString(),
                meta: head.meta.toString(),
                link: head.link.toString(),
                data: serialize(context.simplePage ? {} : (context.data || {})),
                theme: serialize(context.simplePage ? {} : theme),
                needShareScript: Boolean(context.needShareScript),
                app: markup,
                favicon: settings && settings['__images__'] ? settings['__images__'][settings['favicon']] : '',
                logo152x152: settings && settings['__images__'] ? settings['__images__'][settings['logo152x152']] : '',
                css,
                cssIds,
                assets: {
                    styleTags,
                    linkTags: context.simplePage ? null : linkTags.split('\n').filter(str => str.includes('as="script"')).join('\n'),
                    scriptTags: context.simplePage ? null : scriptTags
                }
            };

            if (context.status !== 404 && !isAdminPage) {
                cache.add(req, JSON.stringify({ preloadLinks, data }), 'main');
            }

            sendRes(preloadLinks, data);
        }
    } catch (error) {
        logger.error(`Error 500: ${req.url} ${error}`);
        res.status(500);
        res.end();
    }

    next();
});

module.exports = router;
