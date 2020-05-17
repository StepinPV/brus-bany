import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import styles from './Header.module.css';
import cx from 'classnames';

// TODO
import Logo from '../../components/Logo';

function Header(props) {
    const { opacity, items, phone, email, button } = props;

    return (
        <header className={cx(styles.header, opacity ? styles['header-absolute'] : null)}>
            <div className={cx(styles.container, {[styles['container-opacity']]: opacity}) }>
                <a href='/' className={styles['logo-wrapper']} title='Перейти на главную'>
                    <Logo className={styles.logo}/>
                </a>
                <nav className={styles.items}>
                    {items.map(item => (
                        <a href={item.link} className={styles.item}>{item.caption}</a>
                    ))}
                </nav>
                <div className={styles.info}>
                    <div className={styles['phone-container']}>
                        <a
                            href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                            className={styles.phone}
                            dangerouslySetInnerHTML={{ __html: phone.replace(/(\d)(\d\d\d)(\d\d\d)(\d\d)(\d\d)/, '$1&nbsp;($2)&nbsp;$3-$4-$5') }} />
                        <a href={`mailto:${email}`} className={styles.email}>{email}</a>
                    </div>
                    {button ? (
                        <Button
                            color='yellow'
                            caption={button.caption}
                            size='s'
                            href={button.link}
                            paddingBottom='none'
                            paddingTop='none' />
                    ) : null}
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    items: PropTypes.array,
    phone: PropTypes.string,
    email: PropTypes.string,
    button: PropTypes.object,
    opacity: PropTypes.bool
};

Header.defaultProps = {
    items: [],
    phone: '',
    email: '',
    button: null,
    opacity: false
};

export default memo(Header);
