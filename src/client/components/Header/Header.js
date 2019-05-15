import React, { memo } from 'react';
import styles from './Header.module.css';

export default memo(() => (
    <div className={styles.container}>
        <i className={styles.logo} />
    </div>
));
