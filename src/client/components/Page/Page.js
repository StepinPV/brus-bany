import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import NotFound from '../NotFound';
import Breadcrumbs from '../../../components/Breadcrumbs';
import styles from './Page.module.css';

function Page(props) {
    const { children, opacityHeader, breadcrumbs, notFound } = props;

    return (
        <>
            <Header opacity={!notFound && opacityHeader} requestLink={notFound ? '/#requestForm' : undefined}/>
            {notFound ? (
                <NotFound />
                ) : (
                <div className={styles.content}>
                    {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
                    {children}
                </div>
            )}
            <a href='https://api.whatsapp.com/send?phone=79212046512' target='_blank' rel="noopener noreferrer">
                <i className={styles.whatsup} />
            </a>
            <Footer />
        </>
    );
}

Page.propTypes = {
    children: PropTypes.node,
    opacityHeader: PropTypes.bool,
    breadcrumbs: PropTypes.array,
    notFound: PropTypes.bool
};

Page.defaultProps = {
    notFound: false
};

export default memo(Page);
