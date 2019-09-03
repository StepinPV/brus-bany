import React, {PureComponent} from 'react';
import Page from '../../components/Page';
import Caption from '../../components/Caption';
import H1Block from '../../components/H1Block';
import Text from '../../components/Text';
import Button from '../../components/Button';
import styles from './Payment.module.css';
import FormBlock from "../../components/FormBlock";

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Условия оплаты'
}];

class Payment extends PureComponent {
    render() {
        return (
            <Page breadcrumbs={breadcrumbs}>
                <div className={styles.container}>
                    <H1Block caption='Условия оплаты' />
                    <div className={styles.data}>
                        <Caption className={styles.subCaption}>При покупке мобильной бани:</Caption>
                        <Text>1) Заключаем договор</Text>
                        <Text>2) Мы привозим баню на ваш участок</Text>
                        <Text>3) По факту доставки вы оплачиваете 100% от суммы заказа</Text>
                    </div>
                    <div className={styles.data}>
                        <Caption className={styles.subCaption}>При покупке бани из бруса или каркасной:</Caption>
                        <Text>1) Заключаем договор</Text>
                        <Text>2) Мы привозим на ваш участок все необходимые материалы</Text>
                        <Text>3) Вы оплачиваете 70% от стоимости заказа</Text>
                        <Text>4) Мы строим баню и сдаем работу вам</Text>
                        <Text>5) Вы принимаете работу и оплачиваете остальные 30% от стоимости заказа</Text>
                    </div>
                    <div className={styles['button-container']}>
                        <a href='https://yadi.sk/i/x6PDA_1a3X5Yzg' target='_blank' rel="noopener noreferrer">
                            <Button caption='Скачать образец договора' />
                        </a>
                    </div>
                </div>
                <FormBlock source='Страница условия оплаты' />
            </Page>
        );
    }
}

export default Payment;
