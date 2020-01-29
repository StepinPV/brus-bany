import React, { memo } from 'react';
import Logo from '../../../components/Logo';
import styles from './Header.module.css';

export default memo(() => (
    <div className={styles.container}>
        <a href='/admin'>
            <Logo className={styles.logo} />
        </a>
        <span className={styles.title}>Панель администрирования</span>
    </div>
));
