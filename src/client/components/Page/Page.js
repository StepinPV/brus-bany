import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import styles from './Page.module.css';

class Page extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        opacityHeader: PropTypes.bool,
        breadcrumbs: PropTypes.array
    };

    render() {
        const { children, opacityHeader, breadcrumbs } = this.props;

        return (
            <>
                <Header opacity={opacityHeader} />
                <div className={styles.content}>
                    {breadcrumbs ? <Breadcrumbs className={styles.breadcrumbs} items={breadcrumbs} /> : null}
                    {children}
                </div>
                <Footer />
            </>
        );
    }
}

export default Page;
