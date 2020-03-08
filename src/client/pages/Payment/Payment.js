import React, {memo} from 'react';
import Page from '../../components/Page';
import Caption from '../../components/Caption';
import H1Block from '../../components/H1Block';
import Text from '../../components/Text';
import { Link } from '../../components/Button';
import styles from './Payment.module.css';
import FormBlock from "../../components/FormBlock";
import Meta from '../../components/Meta';

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Условия оплаты'
}];

const META = {
    title: 'Условия оплаты',
    description: 'Мы работаем без предоплаты! Вы платите только за результат хорошо построенной бани'
};

function Payment() {
    return (
        <Page breadcrumbs={breadcrumbs}>
            <Meta meta={META} />
            <div className={styles.container}>
                <H1Block caption='Условия оплаты' />
                <div className={styles.data}>
                    <Caption className={styles.subCaption} size='s' tag='h2'>При покупке готовой бани:</Caption>
                    <Text>
                        <ol>
                            <li>Заключаем договор</li>
                            <li>Мы привозим баню на ваш участок</li>
                            <li>По факту доставки вы оплачиваете 100% от суммы заказа</li>
                        </ol>
                    </Text>
                </div>
                <div className={styles.data}>
                    <Caption className={styles.subCaption} size='s' tag='h2'>При покупке бани из бруса или каркасной:</Caption>
                    <Text>
                        <ol>
                            <li>Заключаем договор</li>
                            <li>Мы привозим на ваш участок все необходимые материалы</li>
                            <li>Вы оплачиваете 70% от стоимости заказа</li>
                            <li>Мы строим баню и сдаем работу вам</li>
                            <li>Вы принимаете работу и оплачиваете остальные 30% от стоимости заказа</li>
                        </ol>
                    </Text>
                </div>
                <div className={styles['button-container']}>
                    <Link href='https://yadi.sk/i/x6PDA_1a3X5Yzg' target='_blank' rel='noopener noreferrer' caption='Скачать образец договора' />
                </div>
            </div>
            <FormBlock source='Страница условия оплаты' />
        </Page>
    );
}

export default memo(Payment);
