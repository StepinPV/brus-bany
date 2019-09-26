import React, {PureComponent} from 'react';
import { withRouter } from 'react-router-dom';
import Caption from '../Caption';
import styles from './NotFound.module.css';

class NotFound extends PureComponent {
    render() {
        const { staticContext } = this.props;

        if (staticContext) {
            staticContext.status = 404;
        }

        return (
            <div className={styles.body}>
                <Caption align='center'>Страница не найдена</Caption>
                <div className={styles.code}>404</div>
            </div>
        );
    }
}

export default withRouter(NotFound);
