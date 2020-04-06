import React, {memo} from 'react';
import DataSection from '../../../../components/DataSection';
import { Link } from '../../../../components/Button';
import Text from '../../../../components/Text';
import Caption from '../../../../components/Caption';
import withForm from '../../../../plugins/Form/withForm';
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
    const linkStyles = {
        color: '#013885',
        fontWeight: 'bold',
        textDecoration: 'none'
    };

    return (
        <DataSection bgStyle='white' caption='Почему выбирают нас?' captionTag='h2'>
            <div className={styles.items}>
                {<Item
                    icon={styles['money-icon']}
                    caption='Работаем без предоплаты'
                    text={(<>Оплата производится после успешной сдачи объекта. Более подробная информация в <a href='/usloviya-oplaty' style={linkStyles}>условиях оплаты</a></>)}
                    />}
                {<Item
                    icon={styles['caska-icon']}
                    caption='Построили более 350 объектов'
                    text={(<>Накопили достаточно опыта, чтобы построить объект любой сложности, <a href='/photos' style={linkStyles}>убедитесь сами</a></>)}
                />}
                {<Item
                    icon={styles['galka-icon']}
                    caption={<>Гарантия<br />качества</>}
                    text={(<>Строим строго по <a href='/gosty-i-snipy' style={linkStyles}>ГОСТу</a>. По договору обслуживаем постройку в течение 2-х лет</>)}
                />}
            </div>
            <div className={styles['button-container']}>
                <Link caption='Узнать подробнее' href='#requestForm' />
            </div>
        </DataSection>
    )
}

export default memo(withForm(WhyMe));
