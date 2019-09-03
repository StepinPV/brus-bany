import React, {memo, Fragment} from 'react';
import DataSection from '../../../../components/DataSection';
import Button from '../../../../components/Button';
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

function WhyMe(props) {
    const linkStyles = {
        color: '#ff8562',
        textDecoration: 'none'
    };

    return (
        <DataSection bgStyle='white' caption='Почему выбирают нас?'>
            <div className={styles.items}>
                {<Item
                    icon={styles['money-icon']}
                    caption='Работаем без предоплаты'
                    text={(<Fragment>Оплата производится после успешной сдачи объекта. Более подробная информация в <a href='/uslovia-oplati' style={linkStyles}>условиях оплаты</a></Fragment>)}
                    />}
                {<Item
                    icon={styles['caska-icon']}
                    caption='Построили более 350 объектов'
                    text={(<Fragment>Накопили достаточно опыта, чтобы построить объект любой сложности, <a href='/photos' style={linkStyles}>убедитесь сами</a></Fragment>)}
                />}
                {<Item
                    icon={styles['galka-icon']}
                    caption={<Fragment>Гарантия<br />качества</Fragment>}
                    text={(<Fragment>Строим строго по <a href='/gosty-i-snipy' style={linkStyles}>ГОСТу</a>. По договору обслуживаем постройку в течение 2-х лет</Fragment>)}
                />}
            </div>
            <div className={styles['button-container']}>
                <Button caption='Узнать подробнее' onClick={() => { props.showForm({ source: 'Главная. Почему выбирают нас?', title: 'Узнать подробнее' })}} />
            </div>
        </DataSection>
    )
}

export default memo(withForm(WhyMe));
