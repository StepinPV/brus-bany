const express = require('express');
const serialize = require('serialize-javascript');
const { getBundles } = require('react-loadable/webpack');
const { render } = require('../dist/server/server');
const stats = require('../dist/react-loadable.json');
const assetsManifest = require('../public/mstatic/build/manifest.json');
const logger = require('./logger');

const router = express.Router();

router.get('*', async (req, res, next) => {
    try {
        const routeContext = {};

        const { pageId, head, markup, initialData, modules } = await render(req, res, routeContext);

        if (routeContext.status === 404) {
            res.status(404);
        }

        if (routeContext.action === 'REPLACE') {
            res.writeHead(302, { Location: routeContext.url });
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

            res.set('Link', [
                `<${assetsManifest['runtime~main.js']}>; rel=preload; as=script`,
                `<${assetsManifest['main.js']}>; rel=preload; as=script`,
                `<${assetsManifest['main.css']}>; rel=preload; as=style`
            ]);

            res.render('index.pug', {
                title: head.title.toString(),
                meta: head.meta.toString(),
                link: head.link.toString(),
                initialData: serialize(initialData),
                app: markup,
                options: {
                    pageId: JSON.stringify(pageId),
                    buildTag: process.env.BUILD_ID
                },
                assets: {
                    js: {
                        runtimeMain: assetsManifest['runtime~main.js'],
                        runtimeStats: assetsManifest['runtime~stats.js'],
                        vendors: vendorList.map(vendor => assetsManifest[`${vendor}.js`]),
                        main: assetsManifest['main.js'],
                        stats: assetsManifest['stats.js'],
                        chunks: getJSChunks(chunks)
                    },
                    css: {
                        // vendors: assetsManifest['vendor.css'],
                        // common: assetsManifest['common.css'],
                        main: assetsManifest['main.css'],
                        chunks: getCSSChunks(chunks)
                    }
                }
            });
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
