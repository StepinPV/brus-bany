import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Logo from '../../../components/Logo';
import { Link } from '../../../components/Button';
import styles from './Header.module.css';
import cx from "classnames";

function Header(props) {
    const { opacity, requestLink, hasLinkToMain } = props;

    function renderLink(content) {
        return hasLinkToMain ? (
            <a href='/' className={styles['logo-wrapper']} title='Перейти на главную'>{content}</a>
        ) : (
            <div className={styles['logo-wrapper']}>
                <Logo className={styles.logo}/>
            </div>
        );
    }

    return (
        <header className={opacity ? styles['header-absolute'] : null}>
            <div className={cx(styles.container, {[styles['container-opacity']]: opacity}) }>
                {renderLink(<Logo className={styles.logo}/>)}
                <nav className={styles.items}>
                    <a href='/bani/iz-brusa' className={styles.item}>Бани из бруса</a>
                    <a href='/bani/karkasnie' className={styles.item}>Каркасные бани</a>
                    <a href='/bani/gotovie' className={styles.item}>Готовые бани</a>
                    <a href='/bani/iz-brevna' className={styles.item}>Бани из бревна</a>
                </nav>
                <div className={styles.info}>
                    <div className={styles['phone-container']}>
                        <a href="tel:88002010729" className={styles.phone}>8 (800) 201-07-29</a>
                        <a href="mailto:info@brus-bany.ru" className={styles.email}>info@brus-bany.ru</a>
                    </div>
                    <Link type='yellow' caption='Обратный звонок' size='s' href={requestLink} />
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    opacity: PropTypes.bool,
    requestLink: PropTypes.string,
    hasLinkToMain: PropTypes.bool
};

Header.defaultProps = {
    requestLink: '#requestForm',
    hasLinkToMain: true
};

export default memo(Header);
