import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import NotFound from '../NotFound';
import Breadcrumbs from '../../../components/Breadcrumbs';
import styles from './Page.module.css';

function Page(props) {
    const { children, opacityHeader, breadcrumbs, notFound, hasLinkToMain, headerProps } = props;

    return (
        <>
            <Header
                opacity={!notFound && opacityHeader}
                requestLink={notFound ? '/#requestForm' : undefined}
                hasLinkToMain={hasLinkToMain}
                {...headerProps}
            />
            {notFound ? (
                <NotFound />
                ) : (
                <div className={styles.content}>
                    {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
                    {children}
                </div>
            )}
            <a
                href='https://api.whatsapp.com/send?phone=79210290107'
                title='Перейти в WatsApp'
                target='_blank'
                rel="noopener noreferrer">
                <i className={styles['whats-app']} />
            </a>
            <Footer hasLinkToMain={hasLinkToMain} />
        </>
    );
}

Page.propTypes = {
    headerProps: PropTypes.object,
    children: PropTypes.node,
    opacityHeader: PropTypes.bool,
    hasLinkToMain: PropTypes.bool,
    breadcrumbs: PropTypes.array,
    notFound: PropTypes.bool
};

Page.defaultProps = {
    headerProps: {},
    notFound: false,
    hasLinkToMain: true
};

export default memo(Page);
