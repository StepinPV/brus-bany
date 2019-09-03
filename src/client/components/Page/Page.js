import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import styles from './Page.module.css';

class Page extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        fixedHeader: PropTypes.bool,
        breadcrumbs: PropTypes.array
    };

    render() {
        const { children, fixedHeader, breadcrumbs } = this.props;

        return (
            <Fragment>
                <Header fixedHeader={fixedHeader} />
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
