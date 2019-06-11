import React, {memo, Fragment} from 'react';
import DataSection from '../../../../components/DataSection';
import Button from '../../../../components/Button';
import Text from '../../../../components/Text';
import Caption from '../../../../components/Caption';
import cx from 'classnames';
import styles from './WhyMe.module.css';

function Item({ icon, caption, text }) {
    return (
        <div className={styles.item}>
            <i className={cx(styles.icon, icon)} />
            <div className={styles.caption}>
                <Caption size='s' align='center'>{caption}</Caption>
            </div>
            <div className={styles.text}>
                <Text align='center'>{text}</Text>
            </div>
        </div>
    );
}

function WhyMe() {
    return (
        <DataSection bgStyle='white' caption='Почему выбирают нас?'>
            <div className={styles.items}>
                {<Item
                    icon={styles['money-icon']}
                    caption='Работаем без предоплаты'
                    text='Оплата производится после успешной сдачи объекта. Более подробная информация в условиях оплаты'
                    />}
                {<Item
                    icon={styles['caska-icon']}
                    caption='Построили более 350 объектов'
                    text='Накопили достаточно опыта, чтобы построить объект любой сложности, убедитесь сами'
                />}
                {<Item
                    icon={styles['galka-icon']}
                    caption={<Fragment>Гарантия<br />качества</Fragment>}
                    text='Строим строго по ГОСТу. По договору обслуживаем постройку в течение 2-х лет'
                />}
            </div>
            <div className={styles['button-container']}>
                <Button caption='Узнать подробнее' />
            </div>
        </DataSection>
    )
}

export default memo(WhyMe);
