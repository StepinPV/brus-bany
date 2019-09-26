import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Logo from '../../../components/Logo';
import { Link } from '../Button';
import styles from './Header.module.css';
import cx from "classnames";

class Header extends PureComponent {
    static propTypes = {
        opacity: PropTypes.bool
    };

    render() {
        const { opacity } = this.props;

        return (
            <header className={cx(styles.header, {[styles['header-absolute']]: opacity })}>
                <div className={cx(styles.container, {[styles['container-opacity']]: opacity}) }>
                    <a href='/'>
                        <Logo className={styles.logo}/>
                    </a>
                    {this.renderLinks(styles.items, styles.item)}
                    <div className={styles.info}>
                        <div className={styles['phone-container']}>
                            {this.renderContacts()}
                        </div>
                        <Link type='yellow' caption='Обратный звонок' size='s' href='#requestForm' />
                    </div>
                </div>
            </header>
        );
    }

    renderLinks = (containerClass, itemClass) => {
        return (
            <nav className={containerClass}>
                <a href='/bani/mobilnie' className={itemClass}>Мобильные бани</a>
                <a href='/bani/iz-brusa' className={itemClass}>Бани из бруса</a>
                <a href='/bani/karkasnie' className={itemClass}>Каркасные бани</a>
                <a href='/bani/individualniy-proekt' className={itemClass}>Индивидуальный проект</a>
            </nav>
        );
    };

    renderContacts = () => {
        return (
            <>
                <a href="tel:88002010729" className={styles.phone}>8 (800) 201-07-29</a>
                <a href="mailto:mailto:info@brus-bany.ru" className={styles.email}>info@brus-bany.ru</a>
            </>
        )
    };
}

export default Header;
