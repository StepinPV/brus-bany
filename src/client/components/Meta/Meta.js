import React, { memo } from 'react';
import { Helmet } from 'react-helmet';

function Meta({ meta }) {
    return (
        <Helmet>
            {meta.title ? <title>{meta.title}</title> : null}
            {meta.description ? <meta name='description' content={meta.description} /> : null}
            {meta.keywords ? <meta name='keywords' content={meta.keywords} /> : null}
            {meta.title ? <meta property='og:title' content={meta.title} /> : null}
            {meta.description ? <meta property='og:description' content={meta.description} /> : null}
            <meta property='og:image' content='https://brus-bany.ru/favicon-192x192.png' />
            <meta property='og:image:width' content='192' />
            <meta property='og:image:height' content='192' />
            <meta property='og:type' content='website' />
        </Helmet>
    );
}

export default memo(Meta);
