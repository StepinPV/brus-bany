import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Page from '../../components/Page';
import OfficeMap from './resources/OfficeMap';
import Button from '../../components/Button';
import SocialNetwork from '../../components/SocialNetwork';
import DataSection from '../../components/DataSection';
import Link from '../../../components/Link';
import H1Block from '../../components/H1Block';
import cx from 'classnames';
import styles from './Contacts.module.css';
import FormBlock from "../../components/FormBlock";
import withForm from '../../plugins/Form/withForm';

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Наши контакты'
}];

class Contacts extends PureComponent {
    static propTypes = {
        showForm: PropTypes.func
    };

    render() {
        const { showForm} = this.props;
        return (
            <Page breadcrumbs={breadcrumbs}>
                <H1Block caption='Наши контакты' />
                <div className={styles.content}>
                    <div className={styles.map}>
                        <OfficeMap />
                    </div>
                    <div className={styles.info}>
                        <div className={cx(styles['info-name'], styles['info-block'])}>ООО "Русская баня"</div>
                        <div className={cx(styles['info-address'], styles['info-block'])}>174510, Новгородская обл, <br/> г. Пестово, ул. Курганная 12</div>
                        <div className={styles['info-block']}>
                            <div className={styles['info-phone-title']}>Звонок по России бесплатный</div>
                            <a href="tel:88002010729" className={styles['info-phone']}>8 (800) 201-07-29</a>
                            <a href="mailto:mailto:info@brus-bany.ru" className={styles['info-email']}>info@brus-bany.ru</a>
                        </div>
                        <div className={cx(styles['info-text'], styles['info-block'])}>
                            Построим баню любой сложности с нуля или привезем готовую!
                            Если вы не нашли на сайте проект интересующей вас бани, напишите или позвоните нам, мы с удовольствием вам поможем
                        </div>
                        <div className={cx(styles['info-time'], styles['info-block'])}>
                            <span style={{ fontWeight: 'bold' }}>Время работы:</span> без выходных с 8:00 до 22:00
                        </div>
                        <Button type='red' caption='Обсудить проект бани' className={styles['info-block']} onClick={() => { showForm({ source: 'Страница контактов' })}}/>
                        <div className={styles['social-networks']}>
                            <SocialNetwork type='vk' className={styles['social-network']} />
                            <SocialNetwork type='fb' className={styles['social-network']} />
                            <SocialNetwork type='ok' className={styles['social-network']} />
                            <SocialNetwork type='inst' className={styles['social-network']} />
                            <SocialNetwork type='youtube' className={styles['social-network']} />
                        </div>
                        <Link to='/rekvizity'>Реквизиты компании</Link>
                    </div>
                </div>
                <DataSection caption='Наши представительства'>
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

export default withForm(Contacts);
