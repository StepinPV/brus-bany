import React, { memo, useState } from 'react';
import Logo from '../../../components/Logo';
import Link from '../../../components/Link';
import Button from '../Button';
import styles from './Header.module.css';
import cx from "classnames";

export default memo((props) => {
    const [expanded, setExpanded] = useState(false);
    const { className } = props;

    return (
        <div className={className}>
            <div className={styles.container}>
                <Link to='/'>
                    <Logo className={styles.logo}/>
                </Link>
                <div className={styles.items}>
                    <div className={styles.item}>Мобильные бани</div>
                    <div className={styles.item}>Бани из бруса</div>
                    <div className={styles.item}>Каркасные бани</div>
                    <Link to='/individualniy-proekt' className={styles.item}>Индивидуальный проект</Link>
                </div>
                <div className={styles.info}>
                    <div className={styles['phone-container']}>
                        <a href="tel:88002010729" className={styles.phone}>8 (800) 201-07-29</a>
                        <a href="mailto:mailto:info@brus-bany.ru" className={styles.email}>info@brus-bany.ru</a>
                    </div>
                    <Button type='yellow' caption='Обратный звонок' size='s' />
                    <div className={styles.burger} onClick={() => {setExpanded(!expanded)}}>
                        <div className={cx(styles['burger-line'], {[styles['burger-line-expanded-opacity']]: expanded})} />
                        <div className={styles['burger-line-centered']}>
                            <div className={cx(styles['burger-line'], {[styles['burger-line-expanded-first']]: expanded})} />
                            <div className={cx(styles['burger-line'], {[styles['burger-line-expanded-second']]: expanded})} />
                        </div>
                        <div className={cx(styles['burger-line'], {[styles['burger-line-expanded-opacity']]: expanded})} />
                    </div>
                </div>
            </div>
            {expanded ? (
                <div className={styles['expanded-menu']}>
                    <div className={styles.items2}>
                        <div className={styles.item2}>Мобильные бани</div>
                        <div className={styles.item2}>Бани из бруса</div>
                        <div className={styles.item2}>Каркасные бани</div>
                        <Link to='/individualniy-proekt' className={styles.item2}>Индивидуальный проект</Link>
                    </div>
                    <a href="tel:88002010729" className={styles.phone}>8 (800) 201-07-29</a>
                    <a href="mailto:mailto:info@brus-bany.ru" className={styles.email}>info@brus-bany.ru</a>
                </div>
            ) : null}
        </div>
    );
});
