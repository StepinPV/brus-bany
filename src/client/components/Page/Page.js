import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Header, Footer } from '@constructor-components';
import NotFound from '../NotFound';
import Breadcrumbs from '../../../components/Breadcrumbs';
import styles from './Page.module.css';

function Page(props) {
    const { children, opacityHeader, breadcrumbs, notFound, hasLinkToMain, customComponents, staticContext } = props;

    const headerComponent = customComponents.find(component => component['_id'] === '5eca90f2003e3d332650c6ea');
    const footerComponent = customComponents.find(component => component['_id'] === '5eca9461003e3d332650c862');

    if (staticContext) {
        staticContext.data = staticContext.data || {};
        staticContext.data.customComponents = staticContext.data.customComponents || [];
        staticContext.data.customComponents.push(headerComponent);
        staticContext.data.customComponents.push(footerComponent);
    }

    return (
        <>
            <Header
                {...headerComponent.config.componentsData['8488'].props}
                opacity={opacityHeader}
                hasLinkToMain={hasLinkToMain}
                button={{
                    caption: 'Обратный звонок',
                    link: '#requestForm'
                }}
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
            <Footer
                {...footerComponent.config.componentsData['3912'].props}
                hasLinkToMain={hasLinkToMain}
            />
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
