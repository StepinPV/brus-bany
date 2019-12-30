import React, { memo } from 'react';
import Logo from '../../../components/Logo';
import styles from './Header.module.css';

export default memo(() => (
    <div className={styles.container}>
        <Logo className={styles.logo} />
        <span className={styles.title}>Панель администрирования</span>
    </div>
));
