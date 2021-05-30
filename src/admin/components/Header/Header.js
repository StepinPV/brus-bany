import React, { memo } from 'react';
import styles from './Header.module.css';

export default memo(() => (
    <div className={styles.container}>
        <div className={styles.left}>
            <span className={styles.site}>Панель администрирования</span>
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
