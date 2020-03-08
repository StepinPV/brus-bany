import React, {PureComponent} from 'react';
import Caption from '../../../../components/Caption';
import Text from '../../../../components/Text';
import cx from 'classnames';
import styles from './First.module.css';

class First extends PureComponent {
    render() {
        return (
            <div className={styles.container}>
                <Caption className={styles.caption} align='center' tag='h2'>Информация о доставке</Caption>
                <Text className={styles.data} align='center'>Чтобы узнать точную стоимость доставки, укажите на карте точный адрес вашего участка</Text>
                <div className={styles.items}>
                    <div className={styles.item}>
                        <div className={styles['item-number']}>-1-</div>
                        <div className={styles['item-price']}>45 руб / км</div>
                        <div className={styles['item-title']}>Готовые бани до 7м длинной</div>
                    </div>
                    <div className={cx(styles.item, styles['item-centered'])}>
                        <div className={styles['item-number']}>-2-</div>
                        <div className={styles['item-price']}>70 руб / км</div>
                        <div className={styles['item-title']}>Готовые бани больше 7м длинной</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles['item-number']}>-3-</div>
                        <div className={styles['item-price']}>70 руб / км</div>
                        <div className={styles['item-title']}>Бани из бруса и каркасные бани</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default First;
