import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import cx from 'classnames';
import styles from './Page.module.css';

class Page extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        fixedHeader: PropTypes.bool,
        breadcrumbs: PropTypes.array
    };

    render() {
        const { children, fixedHeader, breadcrumbs, absoluteHeader } = this.props;

        return (
            <Fragment>
                <Header className={cx(styles.header, {[styles['header-fixed']]: fixedHeader, [styles['header-absolute']]: absoluteHeader })} />
                <div className={styles.content}>
                    {breadcrumbs ? <Breadcrumbs className={styles.breadcrumbs} items={breadcrumbs} /> : null}
                    {children}
                </div>
                <Footer />
            </Fragment>
        );
    }
}

export default Page;
