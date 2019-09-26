import React, {memo} from 'react';
import DataSection from '../../../../components/DataSection';
import { Link } from '../../../../components/Button';
import Text from '../../../../components/Text';
import cx from 'classnames';
import styles from './HowWork.module.css';

function HowWork() {
    return (
        <DataSection bgStyle='grey' caption='Как мы работаем?' captionTag='h2'>
            <div className={styles.items}>
                <div className={styles.item}>
                    <i className={cx(styles.icon, styles['call-icon'])} />
                    <Text align='center'>
                        Позвоните нам<br /><a href="tel:88002010729" style={{ color: '#91001d', textDecoration: 'none', fontWeight: 'bold' }}>8&nbsp;(800)&nbsp;201-07-29</a><br />или <a href='#requestForm' style={{ color: '#013885', fontWeight: 'bold', cursor: 'pointer' }}>оставьте заявку</a>
                    </Text>
                </div>
                <i className={styles['arrow-icon']} />
                <div className={styles.item}>
                    <i className={cx(styles.icon, styles['calc-icon'])} />
                    <Text align='center'>Подберем оптимальный вариант бани, рассчитаем стоимость и пришлем подробную смету</Text>
                </div>
                <i className={styles['arrow-icon']} />
                <div className={styles.item}>
                    <i className={cx(styles.icon, styles['dogovor-icon'])} />
                    <Text align='center'><a href='https://yadi.sk/i/x6PDA_1a3X5Yzg' style={{ color: '#013885', textDecoration: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Заключим договор</a>, приступим к строительству бани или привезем уже готовую</Text>
                </div>
            </div>
            <div className={styles['button-container']}>
                <Link caption='Узнать подробнее' href='#requestForm' />
            </div>
        </DataSection>
    )
}

export default memo(HowWork);
