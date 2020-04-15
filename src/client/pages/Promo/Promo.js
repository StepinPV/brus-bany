import React, {memo} from 'react';
import Page from '../../components/Page';
import Caption from '../../components/Caption';
import Text from '../../components/Text';
import { Link } from '../../../components/Button';
import H1Block from '../../components/H1Block';
import img1 from './resources/1.jpg';
import img2 from './resources/2.jpg';
import img3 from './resources/3.jpg';
import styles from './Promo.module.css';
import FormBlock from "../../components/FormBlock";
import Meta from '../../components/Meta';

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Скидки и акции'
}];

const META = {
    title: 'Скидки и акции | Брус бани',
    description: '🏠 Закажите баню со скидкой 💨 Ознакомиться с действующими акциями можно на нашем сайте 📳 8(800)201-07-29'
};

function Promo() {
    return (
        <Page breadcrumbs={breadcrumbs}>
            <Meta meta={META} />
            <H1Block caption='Скидки и акции' description='Надеемся, что вы найдете для себя интересное предложение и исполните свою мечту' />
            <div className={styles.items}>
                <div className={styles.item}>
                    <img className={styles.image} src={img3} alt="Банные пренадлежности" loading='lazy' />
                    <div className={styles.info}>
                        <Caption className={styles.name} size='s'>Пройдите опрос и получите подарок</Caption>
                        <Text className={styles.text}>
                            Мы зададим 5 простых вопросов, чтобы поближе познакомиться с вами. Пройдите опрос, мы подберем для вас баню и <strong style={{ color: '#359bd0' }}>подарим подарок</strong>!
                        </Text>
                        <Link href='/akcii/quiz' caption='Перейти на страницу акции' />
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles.image} src={img1} alt="Гарантия лучшей цены" loading='lazy' />
                    <div className={styles.info}>
                        <Caption className={styles.name} size='s'>Гарантия лучшей цены</Caption>
                        <Text className={styles.text}>
                            Сравниваете цены на разных сайтах? Пришлите предложение от конкурентов и мы <strong style={{ color: '#d7b32a' }}>сделаем</strong> вам <strong style={{ color: '#5e9300' }}>предложение лучше</strong>
                        </Text>
                        <Link caption='Получить выгодное предложение' href='#requestForm' />
                    </div>
                </div>
                <div className={styles.item}>
                    <img className={styles.image} src={img2} alt="Теплый угол" loading='lazy' />
                    <div className={styles.info}>
                        <Caption className={styles.name} size='s'>Теплый угол и утепление!</Caption>
                        <Text className={styles.text}>
                            При заказе бани до конца <strong style={{ color: '#5e9300' }}>августа 2020</strong> года получите <strong style={{ color: ' #d7b32a' }}>теплый угол</strong> и <strong style={{ color: '#d7b32a' }}>утепление</strong> в подарок!
                        </Text>
                        <Link caption='Узнать подробнее' href='#requestForm' />
                    </div>
                </div>
            </div>
            <FormBlock source='Страница акций' />
        </Page>
    );
}

export default memo(Promo);
