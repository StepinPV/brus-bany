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
            {meta.type ? <meta property='og:type' content={meta.type} /> : null}
            {meta.image ? <meta property='og:image' content={`https://brus-bany.ru${meta.image}`} /> : null}
            {meta.imageAlt ? <meta property='og:image:alt' content={meta.imageAlt} /> : null}
        </Helmet>
    );
}

Meta.defaultProps = {
    type: 'website',
    image: '/favicon-192x192.png'
};

export default memo(Meta);
