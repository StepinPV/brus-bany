import React, {PureComponent} from 'react';
import Page from '../../components/Page';
import Caption from '../../components/Caption';
import Text from '../../components/Text';
import Button from '../../components/Button';
import styles from './Payment.module.css';

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
                    <Caption className={styles.caption} align='center'>Условия оплаты</Caption>
                    <div className={styles.data}>
                        <Caption size='s' className={styles.subCaption}>При покупке мобильной бани:</Caption>
                        <Text>
                            1) Заключаем договор<br />
                            2) Мы привозим баню на ваш участок<br />
                            3) По факту доставки вы оплачиваете 100% от суммы заказа<br />
                        </Text>
                    </div>
                    <div className={styles.data}>
                        <Caption size='s' className={styles.subCaption}>При покупке бани из бруса или каркасной:</Caption>
                        <Text>
                            1) Заключаем договор<br />
                            2) Мы привозим на ваш участок все необходимые материалы<br />
                            3) Вы оплачиваете 70% от стоимости заказа<br />
                            4) Мы строим баню и сдаем работу вам<br />
                            5) Вы принимаете работу и оплачиваете остальные 30% от стоимости заказа<br />
                        </Text>
                    </div>
                    <div className={styles['button-container']}>
                        <a href='https://yadi.sk/i/x6PDA_1a3X5Yzg' target='_blank' rel="noopener noreferrer">
                            <Button caption='Скачать образец договора' />
                        </a>
                    </div>
                </div>
            </Page>
        );
    }
}

export default Payment;
