import React, {PureComponent} from 'react';
import Page from '../../components/Page';
import { Link } from '../../../components/Button';
import SocialNetwork from '../../components/SocialNetwork';
import DataSection from '../../components/DataSection';
import H1Block from '../../components/H1Block';
import cx from 'classnames';
import styles from './Contacts.module.css';
import FormBlock from "../../components/FormBlock";
import Meta from '../../components/Meta';

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Наши контакты'
}];

const META = {
    title: 'Наши контакты | Брус бани',
    description: '🏠 174510, Новгородская область, город Пестово, улица Курганная, дом 12 💨 Звоните 📳 8(800)201-07-29'
};

let Map;

class Contacts extends PureComponent {
    state = {
        mapLoaded: false
    };

    componentDidMount() {
        setTimeout(() => {
            import('./resources/OfficeMap').then(module => {
                Map = module.default;
                this.setState({ mapLoaded: true });
            });
        }, 1000);
    }

    render() {
        const { mapLoaded } = this.state;

        return (
            <Page breadcrumbs={breadcrumbs}>
                <Meta meta={META} />
                <H1Block caption='Наши контакты' />
                <div className={styles.content} itemScope itemType='http://schema.org/HomeAndConstructionBusiness'>
                    <div className={styles.map}>
                        {mapLoaded ? <Map /> : null }
                    </div>
                    <div className={styles.info}>
                        <meta itemProp="name" content="Брус бани" />
                        <div className={cx(styles['info-name'], styles['info-block'])}>Брус бани</div>
                        <div className={cx(styles['info-address'], styles['info-block'])} itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                            <span itemProp="postalCode">174510</span>, <span itemProp="addressRegion">Новгородская область</span>,
                            <br/>
                            <span itemProp="addressLocality">Пестово</span>, <span itemProp="streetAddress">Курганная, 12</span>
                        </div>
                        <div className={styles['info-block']}>
                            <div className={styles['info-phone-title']}>Звонок по России бесплатный</div>
                            <a href="tel:88002010729" className={styles['info-phone']} itemProp="telephone">8 (800) 201-07-29</a>
                            <a href="mailto:info@brus-bany.ru" className={styles['info-email']} itemProp="email">info@brus-bany.ru</a>
                        </div>
                        <div className={cx(styles['info-text'], styles['info-block'])}>
                            Построим баню любой сложности с нуля или привезем готовую!
                            Если вы не нашли на сайте проект интересующей вас бани, напишите или позвоните нам, мы с удовольствием вам поможем
                        </div>
                        <div className={cx(styles['info-time'], styles['info-block'])}>
                            <span style={{ fontWeight: 'bold' }}>Время работы: </span>
                            <time itemProp="openingHours" dateTime="Mo-Su 8:00−22:00">c 8:00 до 22:00 без выходных</time>
                        </div>
                        <Link href='#requestForm' type='red' caption='Обсудить проект бани' className={styles['info-block']} />
                        <div className={styles['social-networks']}>
                            <SocialNetwork type='vk' className={styles['social-network']} />
                            <SocialNetwork type='fb' className={styles['social-network']} />
                            <SocialNetwork type='ok' className={styles['social-network']} />
                            <SocialNetwork type='inst' className={styles['social-network']} />
                            <SocialNetwork type='youtube' className={styles['social-network']} />
                        </div>
                        <a href='/rekvizity'>Реквизиты компании</a>
                    </div>
                </div>
                <DataSection caption='Наши представительства' captionTag='h2'>
                    <div className={styles['our-phones']}>
                        <div className={styles['our-phones-item']}>
                            <div className={styles['our-phones-caption']}>Россия</div>
                            <a href="tel:88002010729" className={styles['our-phones-phone']}>8 (800) 201-07-29</a>
                        </div>
                        <div className={styles['our-phones-item']}>
                            <div className={styles['our-phones-caption']}>Москва и<br />Москвовская область</div>
                            <a href="tel:89163949067" className={styles['our-phones-phone']}>8 (916) 394 90-67</a>
                        </div>
                        <div className={styles['our-phones-item']}>
                            <div className={styles['our-phones-caption']}>Санкт-Петербург и<br />Ленинградская область</div>
                            <a href="tel:89217066362" className={styles['our-phones-phone']}>8 (921) 706 63-62</a>
                        </div>
                    </div>
                </DataSection>
                <FormBlock source='Страница контактов' />
            </Page>
        );
    }
}

export default Contacts;
