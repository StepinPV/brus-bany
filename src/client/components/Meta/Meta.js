import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

function Meta({ meta }) {
    return (
        <Helmet>
            {meta.title ? <title>{meta.title}</title> : null}
            {meta.description ? <meta name='description' content={meta.description} /> : null}
            {meta.title ? <meta property='og:title' content={meta.title} /> : null}
            {meta.description ? <meta property='og:description' content={meta.description} /> : null}
            <meta property='og:type' content={meta.type || 'website'} />
            <meta property='og:image' content={`https://brus-bany.ru${meta.image || '/favicon-192x192.png'}`} />
            {meta.imageAlt ? <meta property='og:image:alt' content={meta.imageAlt} /> : null}
        </Helmet>
    );
}

export default memo(Meta);
