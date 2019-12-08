import React, { memo } from 'react';
import Logo from '../../../components/Logo';
import SocialNetwork from '../SocialNetwork';
import cx from 'classnames';
import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.column} itemScope itemType='http://schema.org/Organization'>
                    <meta itemProp="name" content="Брус бани" />
                    <a href='/' className={styles['logo-wrapper']}>
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
                        <a href="mailto:mailto:info@brus-bany.ru" className={cx(styles.email, styles['size-default'])} itemProp="email">info@brus-bany.ru</a>
                    </div>
                    <div className={styles['info-block']}>
                        <time
                            className={cx(styles['size-default'], styles['color-white'])}
                            itemProp="openingHours"
                            dateTime="Mo-Su 8:00−22:00">Время работы:<br />c 8:00 до 22:00 без выходных
                        </time>
                    </div>
                    <div className={styles['info-block']}>
                        <div className={cx(styles['size-default'], styles['color-grey'])}>© «Брус бани» 2010-2019</div>
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
                <nav className={styles.column}>
                    <div className={styles['items-header']}>ВЫБЕРИТЕ БАНЮ</div>
                    <a href='/bani/mobilnie' className={styles['items-item']}>Мобильные бани</a>
                    <a href='/bani/iz-brusa' className={styles['items-item']}>Бани из бруса</a>
                    <a href='/bani/karkasnie' className={styles['items-item']}>Каркасные бани</a>
                    <a href='/bani/individualnyy-proekt' className={styles['items-item']}>Индивидуальный проект</a>
                </nav>
                <nav className={styles.column}>
                    <div className={styles['items-header']}>О КОМПАНИИ</div>
                    <a href='/o-companii' className={styles['items-item']}>О компании</a>
                    <a href='/rekvizity' className={styles['items-item']}>Реквизиты компании</a>
                    <a href='/dostavka' className={styles['items-item']}>География доставки</a>
                    <a href='/usloviya-oplaty' className={styles['items-item']}>Условия оплаты</a>
                    <a href='/kontakty' className={styles['items-item']}>Контакты</a>
                    <a href='/vakansii' className={styles['items-item']}>Вакансии</a>
                    <a href='/politika-konfidencialnosti' className={styles['items-item']}>Политика конфиденциальности</a>
                </nav>
                <nav className={styles.column}>
                    <div className={styles['items-header']}>ДОПОЛНИТЕЛЬНО</div>
                    <a href='/photos' className={styles['items-item']}>Фото построенных бань</a>
                    <a href='/otzyvy' className={styles['items-item']}>Отзывы</a>
                    <a href='/blog' className={styles['items-item']}>Блог</a>
                    <a href='https://zen.yandex.ru/brusbany' className={styles['items-item']} target='_blank' rel="noopener noreferrer">Яндекс Дзен</a>
                    <a href='/akcii' className={styles['items-item']}>Скидки и акции</a>
                    <a href='/voprosy-i-otvety' className={styles['items-item']}>Вопросы и ответы</a>
                    <a href='/gosty-i-snipy' className={styles['items-item']}>ГОСТы и СНиПы</a>
                </nav>
            </div>
        </footer>
    );
}

export default memo(Footer);
