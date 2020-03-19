const express = require('express');
const serialize = require('serialize-javascript');
const { getBundles } = require('react-loadable/webpack');
const { render } = require('../dist/server/server');
const stats = require('../dist/react-loadable.json');
const assetsManifest = require('../public/mstatic/build/manifest.json');
const logger = require('./logger');
const config = require('./config');

const router = express.Router();

router.get('*', async (req, res, next) => {
    try {
        const axiosOptions = {
            apiURL: `http://localhost:${config.port}`
        };

        const { head, markup, initialData, modules, simplePage, context, timings } = await render(req, res, axiosOptions);

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
                // 'react-helmet',
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

            res.set('Link', preloadList);

            res.render('index.pug', {
                isProduction: process.env.NODE_ENV === 'production',
                title: head.title.toString(),
                meta: head.meta.toString(),
                link: head.link.toString(),
                initialData: simplePage ? null : serialize(initialData),
                app: markup,
                timings: JSON.stringify(timings || {}),
                assets: {
                    js: simplePage ? null : {
                        runtimeMain: assetsManifest['runtime~main.js'],
                        main: assetsManifest['main.js'],
                        vendors: vendorList.map(vendor => assetsManifest[`${vendor}.js`]),
                        chunks: getJSChunks(chunks)
                    },
                    css: {
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
