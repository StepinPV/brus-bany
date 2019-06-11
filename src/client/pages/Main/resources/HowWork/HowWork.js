import React, {memo} from 'react';
import DataSection from '../../../../components/DataSection';
import Button from '../../../../components/Button';
import Text from '../../../../components/Text';
import cx from 'classnames';
import styles from './HowWork.module.css';

function HowWork() {
    return (
        <DataSection bgStyle='grey' caption='Как мы работаем?'>
            <div className={styles.items}>
                <div className={styles.item}>
                    <i className={cx(styles.icon, styles['call-icon'])} />
                    <Text align='center'>Позвоните нам<br /><a href="tel:88002010729" style={{ color: '#91001d', textDecoration: 'none', fontWeight: 'bold' }}>8&nbsp;(800)&nbsp;201-07-29</a><br />или оставьте заявку</Text>
                </div>
                <i className={styles['arrow-icon']} />
                <div className={styles.item}>
                    <i className={cx(styles.icon, styles['calc-icon'])} />
                    <Text align='center'>Подберем оптимальный вариант бани, рассчитаем стоимость и пришлем подробную смету</Text>
                </div>
                <i className={styles['arrow-icon']} />
                <div className={styles.item}>
                    <i className={cx(styles.icon, styles['dogovor-icon'])} />
                    <Text align='center'>Заключим договор, приступим к строительству бани или привезем уже готовую</Text>
                </div>
            </div>
            <div className={styles['button-container']}>
                <Button caption='Узнать подробнее' />
            </div>
        </DataSection>
    )
}

export default memo(HowWork);
