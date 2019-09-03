import React, {PureComponent} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Caption from '../../components/Caption';
import styles from './NotFound.module.css';

class NotFound extends PureComponent {
    render() {
        return (
            <>
                <Header />
                <div className={styles.body}>
                    <Caption align='center'>Страница не найдена</Caption>
                    <div className={styles.code}>404</div>
                </div>
                <Footer />
            </>
        );
    }
}

export default NotFound;
