import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Contacts.module.css';
import cx from 'classnames';
import { Button, Text, Caption } from '../index';
import SocialNetwork from '../../client/components/SocialNetwork';

function Contacts(props) {
    if (props.staticContext && props.staticContext.simplePage) {
        props.staticContext.simplePage = false;
    }

    const className = cx(
        styles.content,
        props.paddingTop !== 'none' ? styles[`padding-top-${props.paddingTop}`] : null,
        props.paddingBottom !== 'none' ? styles[`padding-bottom-${props.paddingBottom}`] : null);

    const [renderMap, setRenderMap] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setRenderMap(true);
        }, 1000);
    }, []);

    return (
        <div className={className} itemScope itemType='http://schema.org/HomeAndConstructionBusiness'>
            <div className={styles.map}>
                {renderMap ? (
                    <iframe title="Адресс офиса" src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=111422907145" width="100%" height="100%" frameBorder="0" />
                ) : null }
            </div>
            <div className={styles.info}>
                <meta itemProp="name" content="Брус бани" />
                <Caption size='s' align='left' paddingTop='none' paddingBottom='s'>Брус бани</Caption>
                <div className={styles['info-address']} itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                    <span itemProp="postalCode">174510</span>, <span itemProp="addressRegion">Новгородская область</span>,
                    <br/>
                    <span itemProp="addressLocality">Пестово</span>, <span itemProp="streetAddress">Курганная, 12</span>
                </div>
                <div className={styles['info-phone-email']}>
                    <div className={styles['info-phone-title']}>Звонок по России бесплатный</div>
                    <a href="tel:88002010729" className={styles['info-phone']} itemProp="telephone">8 (800) 201-07-29</a>
                    <a href="mailto:info@brus-bany.ru" className={styles['info-email']} itemProp="email">info@brus-bany.ru</a>
                </div>
                <Text align='left'>
                    Построим баню или дом любой сложности с нуля или привезем готовый объект!
                    Если вы не нашли на сайте проект интересующей вас бани, напишите или позвоните нам, мы с удовольствием вам поможем
                </Text>
                <div className={styles['info-time']}>
                    <span style={{ fontWeight: 'bold' }}>Время работы: </span>
                    <time itemProp="openingHours" dateTime="Mo-Su 8:00−22:00">c 8:00 до 22:00 без выходных</time>
                </div>
                <Button align='left' href='#requestForm' color='red' caption='Обсудить проект бани' />
                <div className={styles['social-networks']}>
                    <SocialNetwork type='vk' className={styles['social-network']} />
                    <SocialNetwork type='fb' className={styles['social-network']} />
                    <SocialNetwork type='ok' className={styles['social-network']} />
                    <SocialNetwork type='inst' className={styles['social-network']} />
                    <SocialNetwork type='youtube' className={styles['social-network']} />
                </div>
                <a className={styles.rekvizity} href='/rekvizity'>Реквизиты компании</a>
            </div>
        </div>
    );
}

Contacts.propTypes = {
    background: PropTypes.oneOf(['white', 'grey']),
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l'])
};

Contacts.defaultProps = {
    background: 'grey',
    paddingTop: 'm',
    paddingBottom: 'm'
};

export default memo(Contacts);
