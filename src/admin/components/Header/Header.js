import React, { memo } from 'react';
import styles from './Header.module.css';

export default memo(() => (
    <div className={styles.container}>
        <div className={styles.left}>
            <a href='/admin'>
                <span className={styles.site}>Панель администрирования</span>
            </a>
            <div className={styles.items}>
                <a className={styles.item} href='/admin'>Страницы</a>
                <a className={styles.item} href='/admin/page-templates'>Шаблоны страниц</a>
                <a className={styles.item} href='/admin/components'>Компоненты</a>
                <a className={styles.item} href='/admin/settings'>Настройки</a>
            </div>
        </div>
        <a href='/' className={styles.title}>Перейти к сайту</a>
    </div>
));
