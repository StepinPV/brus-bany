import React, { memo } from 'react';
import Logo from '../../../components/Logo';
import SocialNetwork from '../SocialNetwork';
import Link from '../../../components/Link';
import cx from 'classnames';
import styles from './Footer.module.css';

function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.column}>
                    <Link to='/' className={styles['logo-wrapper']}>
                        <Logo className={styles.logo}/>
                    </Link>
                    <div className={styles['social-networks']}>
                        <SocialNetwork type='vk' className={styles['social-network']} />
                        <SocialNetwork type='fb' className={styles['social-network']} />
                        <SocialNetwork type='ok' className={styles['social-network']} />
                        <SocialNetwork type='inst' className={styles['social-network']} />
                        <SocialNetwork type='youtube' className={styles['social-network']} />
                    </div>
                    <div className={styles['info-block']}>
                        <a href="tel:88002010729" className={cx(styles.phone, styles['color-white'])}>8 (800) 201-07-29</a>
                        <div className={cx(styles['size-default'], styles['color-white'])}>Звонок по России бесплатный</div>
                        <a href="mailto:mailto:info@brus-bany.ru" className={cx(styles.email, styles['size-default'])}>info@brus-bany.ru</a>
                    </div>
                    <div className={styles['info-block']}>
                        <div className={cx(styles['size-default'], styles['color-white'])}>Время работы:<br />c 8:00 до 22:00 без выходных</div>
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
                        <div className={cx(styles['size-default'], styles['color-grey'])}>174510, Новгородская обл,<br /> г. Пестово, ул. Курганная 12</div>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles['items-header']}>ВЫБЕРИТЕ БАНЮ</div>
                    <div className={styles['items-item']}>Мобильные бани</div>
                    <div className={styles['items-item']}>Бани из бруса</div>
                    <div className={styles['items-item']}>Каркасные бани</div>
                    <Link to='/individualniy-proekt' className={styles['items-item']}>Индивидуальный проект</Link>
                </div>
                <div className={styles.column}>
                    <div className={styles['items-header']}>О КОМПАНИИ</div>
                    <Link to='/rekvizity' className={styles['items-item']}>Реквизиты компании</Link>
                    <Link to='/dostavka' className={styles['items-item']}>География доставки</Link>
                    <Link to='/uslovia-oplati' className={styles['items-item']}>Условия оплаты</Link>
                    <Link to='/contakti' className={styles['items-item']}>Контакты</Link>
                    <Link to='/vakansii' className={styles['items-item']}>Вакансии</Link>
                    <Link to='/politika_konfidencialnosty' className={styles['items-item']}>Политика конфиденциальности</Link>
                </div>
                <div className={styles.column}>
                    <div className={styles['items-header']}>ДОПОЛНИТЕЛЬНО</div>
                    <div className={styles['items-item']}>Фото построенных бань</div>
                    <Link to='/otzivi' className={styles['items-item']}>Отзывы</Link>
                    <div className={styles['items-item']}>Блог</div>
                    <a href='https://zen.yandex.ru/brusbany' className={styles['items-item']} target='_blank' rel="noopener noreferrer">Яндекс Дзен</a>
                    <Link to='/akcii' className={styles['items-item']}>Скидки и акции</Link>
                    <Link to='/voprosy-i-otvety' className={styles['items-item']}>Вопросы и ответы</Link>
                    <Link to='/gosty-i-snipy' className={styles['items-item']}>ГОСТы и СНиПы</Link>
                </div>
            </div>
        </div>
    );
}

export default memo(Footer);
