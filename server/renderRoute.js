const express = require('express');
const serialize = require('serialize-javascript');
const { render } = require('../dist/server/server');
const assetsManifest = require('../public/mstatic/build/manifest.json');
const logger = require('./logger');
const config = require('./config');

const cache = require('./cache');

const router = express.Router();

router.get('*', async (req, res, next) => {
    try {
        function sendRes(preloadList, data) {
            res.set('Link', preloadList);
            res.setHeader('Cache-Control', 'no-cache');
            res.render('index.pug', data);
        }

        let fromCache = cache.get(req);
        if (fromCache) {
            fromCache = JSON.parse(fromCache);
            sendRes(fromCache.preloadList, fromCache.data);
            return;
        }

        const axiosOptions = {
            apiURL: `http://localhost:${config.port}`
        };

        const { head, markup, initialData, extractor, simplePage, context, pageData, customComponents, componentIds } = await render(req, res, axiosOptions);

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

            const vendorList = [
                'axios',
                'babel',
                'classnames',
                'core-js',
                'react',
                'react-dom',
                'redux',
                'react-redux',
                'react-helmet',
                'react-router',
                'react-router-dom'
            ];

            let preloadList = [
                `<${assetsManifest['main.css']}>; rel=preload; as=style`
            ];

            if (!simplePage) {
                preloadList = [
                    `<${assetsManifest['runtime~main.js']}>; rel=preload; as=script`,
                    `<${assetsManifest['main.js']}>; rel=preload; as=script`,
                    ...preloadList
                ]
            }

            const isAdminPage = /^\/admin/.test(req.url);
            const data = {
                needCounters: process.env.NODE_ENV === 'production' && !isAdminPage,
                url: `https://brus-bany.ru${req.url}`,
                title: head.title.toString(),
                meta: head.meta.toString(),
                link: head.link.toString(),
                initialData: serialize(simplePage ? {} : initialData),
                pageData: serialize(pageData || {}),
                customComponents: serialize(customComponents || []),
                app: markup,
                assets: {
                    styleTags,
                    linkTags: simplePage ? linkTags.split('\n').filter(str => !str.includes('as="script"')).join('\n') : linkTags,
                    scriptTags: simplePage ? null : scriptTags,
                    js: simplePage ? null : {
                        vendors: vendorList.map(vendor => assetsManifest[`${vendor}.js`]),
                        components: componentIds ? componentIds.map(componentId => assetsManifest[`${componentId}.js`]) : []
                    },
                    css: {
                        components: componentIds ? componentIds.map(componentId => assetsManifest[`${componentId}.css`]) : [],
                    }
                }
            };

            if (context.status !== 404 && !isAdminPage) {
                cache.add(req, JSON.stringify({ preloadList, data }), 'main');
            }

            sendRes(preloadList, data);
        }
    } catch (error) {
        logger.error(`Error 500: ${req.url} ${error}`);
        res.status(500);
        res.end();
    }

    next();
});

module.exports = router;
