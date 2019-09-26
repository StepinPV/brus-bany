import React, {PureComponent} from 'react';
import Caption from '../Caption';
import styles from './NotFound.module.css';

class NotFound extends PureComponent {
    render() {
        return (
            <div className={styles.body}>
                <Caption align='center'>Страница не найдена</Caption>
                <div className={styles.code}>404</div>
            </div>
        );
    }
}

export default NotFound;
