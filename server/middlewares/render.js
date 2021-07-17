const fs = require('fs');
const url = require('url');
const path = require('path');
const express = require('express');
const logger = require('../../utils/logger');
const getPageHtml = require('../getPageHtml');

const router = express.Router();

router.get('*', async (req, res) => {
    try {
        res.setHeader('Cache-Control', 'no-cache');

        const urlParts = url.parse(req.url, true);
        const file = path.join(__dirname, `/../../sites/${process.env.NAME}/pages/${req.path === '/' ? '/index' : req.path}.html`);

        if (!(urlParts && urlParts.query && urlParts.query['data']) && fs.existsSync(file)) {
            res.sendFile(file);
        } else {
            const { html, status } = await getPageHtml({ path: req.path, url: req.url });

            if (status === 404) {
                res.status(404);
            }

            res.send(html);
        }
    } catch (error) {
        logger.error(`Error 500: ${req.url} ${error}`);
        res.status(500);
        res.end();
    }
});

module.exports = router;
