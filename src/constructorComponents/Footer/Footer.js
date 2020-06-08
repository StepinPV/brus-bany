import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Footer.module.css';

// TODO
import SocialNetwork from '../../client/components/SocialNetwork';
import Logo from '../../components/Logo';

function Footer(props) {
    const { columns } = props;

    return (
        <footer className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.column} itemScope itemType='http://schema.org/HomeAndConstructionBusiness'>
                    <meta itemProp="name" content="Брус бани" />
                    <a href='/' className={styles['logo-wrapper']} title='Перейти на главную'>
                        <Logo className={styles.logo}/>
                    </a>
                    <div className={styles['social-networks']}>
                        <SocialNetwork type='vk' className={styles['social-network']} />
                        <SocialNetwork type='fb' className={styles['social-network']} />
                        <SocialNetwork type='ok' className={styles['social-network']} />
                        <SocialNetwork type='inst' className={styles['social-network']} />
                        <SocialNetwork type='youtube' className={styles['social-network']} />
                    </div>
                    <div className={styles['info-block']}>
                        <a href="tel:88002010729" className={cx(styles.phone, styles['color-white'])} itemProp="telephone">8 (800) 201-07-29</a>
                        <div className={cx(styles['size-default'], styles['color-white'])}>Звонок по России бесплатный</div>
                        <a href="mailto:info@brus-bany.ru" className={cx(styles.email, styles['size-default'])} itemProp="email">info@brus-bany.ru</a>
                    </div>
                    <div className={styles['info-block']}>
                        <time
                            className={cx(styles['size-default'], styles['color-white'])}
                            itemProp="openingHours"
                            dateTime="Mo-Su 8:00−22:00">Время работы:<br />c 8:00 до 22:00 без выходных
                        </time>
                    </div>
                    <div className={styles['info-block']}>
                        <div className={cx(styles['size-default'], styles['color-grey'])}>© «Брус бани» 2010-2020</div>
                        <div className={cx(styles['size-default'], styles['color-grey'])}>Строительство бань под ключ</div>
                    </div>
                    <div className={styles['info-block']}>
                        <div className={cx(styles['size-default'], styles['color-grey'])}>ОГРН 1185321002910</div>
                        <div className={cx(styles['size-default'], styles['color-grey'])}>ИНН 5313015082</div>
                    </div>
                    <div className={styles['info-block']}>
                        <div className={cx(styles['size-default'], styles['color-grey'])} itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                            <span itemProp="postalCode">174510</span>, <span itemProp="addressRegion">Новгородская область</span>,
                            <br />
                            <span itemProp="addressLocality">Пестово</span>, <span itemProp="streetAddress">Курганная, 12</span>
                        </div>
                    </div>
                </div>
                {columns.map(({ caption, items }) => {
                    return (
                        <nav key={caption} className={styles.column}>
                            <div className={styles['items-header']}>{caption.toUpperCase()}</div>
                            {items ? items.map(({ link, caption }) => (
                                <a key={caption} href={link} className={styles['items-item']}>{caption}</a>
                            )) : null}
                        </nav>
                    );
                })}
            </div>
        </footer>
    );
}

Footer.propTypes = {
    columns: PropTypes.array
};

Footer.defaultProps = {
    columns: []
};

export default memo(Footer);
