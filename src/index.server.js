import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import Helmet from 'react-helmet';
import path from 'path';
import { ChunkExtractor } from '@loadable/server';
import createEmotionServer from '@emotion/server/create-instance'
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import routes from './routes';
import App from './components/App';
import axios from 'axios';

const render = async (req, res, axiosOptions = {}, settings) => {
    axios.defaults.baseURL = axiosOptions.apiURL;

    const matchRoute = routes.find(route => matchPath(req.path, route) || false);

    if (!matchRoute) {
        throw new Error(`Не найден подходящий route для ${req.url}!`);
    }

    if (!matchRoute.id) {
        throw new Error('У route не указан id!');
    }

    const extractor = new ChunkExtractor({
        statsFile: path.resolve('public/mstatic/build/loadable-stats.json')
    });

    const context = {
        simplePage: matchRoute.simplePage
    };

    const cache = createCache({ key: 'custom' });
    const { extractCritical } = createEmotionServer(cache);

    let pagesRes, pageFoldersRes, customComponentsRes, pageRes, pageTemplatesRes;

    if (matchRoute.id === 'page-generator') {
        const res = await Promise.all([
            axios.get(`/api/pages`),
            axios.get(`/api/page-folders`),
            axios.get(`/api/components`),
            axios.get(`/api/pages/${encodeURIComponent(req.path)}`, { params: { byUrl: true } }),
            axios.get(`/api/page-templates`)
        ]);

        pagesRes = res[0];
        pageFoldersRes = res[1];
        customComponentsRes = res[2];
        pageRes = res[3];
        pageTemplatesRes = res[4];

        // Обрабатываем кейс с 404
        if (!pageRes.data.data) {
            context.status = 404;

            if (settings['not-found-page']) {
                pageRes = await axios.get(`/api/pages/${settings['not-found-page']}`);
            }
        }
    }

    const jsx = extractor.collectChunks(
        <CacheProvider value={cache}>
            <StaticRouter location={req.url} context={context}>
                <App
                    theme={settings.theme || {}}
                    whatsAppWidget={settings.whatsAppWidget}
                    preparedComponents={{ [matchRoute.id]: matchRoute.component }}
                    page={pageRes ? pageRes.data.data : null}
                    customComponents={customComponentsRes ? customComponentsRes.data.data : null}
                    pageTemplates={pageTemplatesRes ? pageTemplatesRes.data.data : null}
                    pages={pagesRes ? pagesRes.data.data : null}
                    pageFolders={pageFoldersRes ? pageFoldersRes.data.data : null}
                    routes={[matchRoute]} />
            </StaticRouter>
        </CacheProvider>
    );

    let { html: markup, css, ids: cssIds } = extractCritical(renderToString(jsx));

    return {
        head: Helmet.renderStatic(),
        markup,
        context,
        extractor,
        css,
        cssIds,
        theme: settings.theme || {}
    };
};

export { render };
