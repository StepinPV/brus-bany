const express = require('express');
const serialize = require('serialize-javascript');
const { getBundles } = require('react-loadable/webpack');
const { render } = require('../dist/server/server');
const stats = require('../dist/react-loadable.json');
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

        /*let fromCache = cache.get(req);
        if (fromCache) {
            fromCache = JSON.parse(fromCache);
            sendRes(fromCache.preloadList, fromCache.data);
            return;
        }*/

        const axiosOptions = {
            apiURL: `http://localhost:${config.port}`
        };

        const { head, markup, initialData, modules, simplePage, context, pageData, componentIds } = await render(req, res, axiosOptions);

        if (context.status === 404) {
            res.status(404);
        }

        if (context.action === 'REPLACE') {
            res.writeHead(302, { Location: context.url });
            res.end();
        } else {
            const chunks = getBundles(stats, modules);
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
                'react-router-dom',
                'react-loadable'
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
                app: markup,
                assets: {
                    js: simplePage ? null : {
                        runtimeMain: assetsManifest['runtime~main.js'],
                        main: assetsManifest['main.js'],
                        vendors: vendorList.map(vendor => assetsManifest[`${vendor}.js`]),
                        components: componentIds ? componentIds.map(componentId => assetsManifest[`${componentId}.js`]) : [],
                        chunks: getJSChunks(chunks)
                    },
                    css: {
                        main: assetsManifest['main.css'],
                        chunks: getCSSChunks(chunks),
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

/**
 * getJSChunks
 * @param {Array} chunks
 * @returns {Array}
 */
function getJSChunks(chunks) {
    return chunks.filter(chunk => {
        return chunk.file.indexOf('.map') === -1 && chunk.file.indexOf('.css') === -1;
    });
}

/**
 * getCSSChunks
 * @param {Array} chunks
 * @returns {Array}
 */
function getCSSChunks(chunks) {
    return chunks.filter(chunk => {
        return chunk.file.indexOf('.js') === -1 && chunk.file.indexOf('.map') === -1;
    });
}

module.exports = router;
