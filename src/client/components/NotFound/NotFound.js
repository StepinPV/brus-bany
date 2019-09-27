import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Caption from '../Caption';
import styles from './NotFound.module.css';

function NotFound(props) {
    const { staticContext } = props;

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

NotFound.propTypes = {
    staticContext: PropTypes.object
};

export default withRouter(memo(NotFound));
