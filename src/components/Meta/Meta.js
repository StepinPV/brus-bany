import React, { memo } from 'react';
import { Helmet } from 'react-helmet';

function Meta({ meta }) {
    return (
        <Helmet>
            {meta.title ? <title>{meta.title}</title> : null}
            {meta.description ? <meta name='description' content={meta.description} /> : null}
            {meta.title ? <meta property='og:title' content={meta.title} /> : null}
            {meta.description ? <meta property='og:description' content={meta.description} /> : null}
        </Helmet>
    );
}

export default memo(Meta);
