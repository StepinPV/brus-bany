import React, { memo } from 'react';
import styles from './Header.module.css';

export default memo(() => {
    return (
        <div className={styles.container}>
            <i className={styles.logo} />
            <span className={styles.title}>Панель администрирования</span>
        </div>
    );
});
