import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './PageRender.module.css';

function PageRender(props) {
    const { header, children, footer } = props;

    return (
        <>
            {header}
            <div className={styles.content}>
                {children}
            </div>
            {footer}
        </>
    );
}

PageRender.propTypes = {
    header: PropTypes.element,
    children: PropTypes.element,
    footer: PropTypes.element
};

PageRender.defaultProps = {};

export default memo(PageRender);
