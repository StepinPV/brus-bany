import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Logo from '../../../components/Logo';
import { Link } from '../Button';
import styles from './Header.module.css';
import cx from "classnames";

function Header(props) {
    const { opacity } = props;

    return (
        <header className={opacity ? styles['header-absolute'] : null}>
            <div className={cx(styles.container, {[styles['container-opacity']]: opacity}) }>
                <a href='/' className={styles['logo-wrapper']}>
                    <Logo className={styles.logo}/>
                </a>
                <nav className={styles.items}>
                    <a href='/bani/gotovie' className={styles.item}>Готовые бани</a>
                    <a href='/bani/iz-brusa' className={styles.item}>Бани из бруса</a>
                    <a href='/bani/karkasnie' className={styles.item}>Каркасные бани</a>
                    <a href='/bani/individualnyy-proekt' className={styles.item}>Индивидуальный проект</a>
                </nav>
                <div className={styles.info}>
                    <div className={styles['phone-container']}>
                        <a href="tel:88002010729" className={styles.phone}>8 (800) 201-07-29</a>
                        <a href="mailto:mailto:info@brus-bany.ru" className={styles.email}>info@brus-bany.ru</a>
                    </div>
                    <Link type='yellow' caption='Обратный звонок' size='s' href='#requestForm' />
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    opacity: PropTypes.bool
};

export default memo(Header);
