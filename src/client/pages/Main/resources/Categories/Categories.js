import React, {memo} from 'react';
import DataSection from '../../../../components/DataSection';
import Caption from '../../../../components/Caption';
import Button from '../../../../components/Button';
import Text from '../../../../components/Text';
import cx from 'classnames';
import styles from './Categories.module.css';

const categories = [{
    className: styles.mobilnie,
    name: 'Мобильные бани',
    text: 'Недорого и без хлопот. Построим баню у себя, быстро привезем и установим на участке без шума и мусора',
    caption: 'Посмотреть бани',
    link: '/bani/mobilnie'
}, {
    className: styles.brus,
    name: 'Бани из бруса',
    text: 'Строим баню на вашем участке, а вы контролируете процесс. Сложность - любая, хоть дворец с мансардой и верандой',
    caption: 'Посмотреть бани',
    link: '/bani/iz-brusa'
}, {
    className: styles.karkas,
    name: 'Каркасные бани',
    text: 'Фасад не боится холодов, влажности и не дает усадки. А утеплители Paroc и Rockwool по теплоизоляции утирают нос даже бревну',
    caption: 'Посмотреть бани',
    link: '/bani/karkasnie'
}, {
    className: styles.custom,
    name: 'Индивидуальный проект',
    text: 'Расскажите, какую баню хотите, или покажите картинку - посчитаем, согласуем и сразу приступим к строительству',
    caption: 'Подробнее',
    link: '/bani/individualniy-proekt'
}];

function Categories(props) {
    return (
        <DataSection bgStyle='white' caption='Какую баню выбрать?' captionTag='h2' id={props.id}>
            <div className={styles.items}>
                {categories.map(({ className, name, text, caption, link }) => {
                    return (
                        <a href={link} key={name} className={cx(styles.item, className)}>
                            <div className={styles['item-overlay']} />
                            <div className={styles['item-content']}>
                                <div className={styles['item-caption']}>
                                    <Caption color='white' size='m' align='center'>{name}</Caption>
                                </div>
                                <div className={styles['item-text']}>
                                    <Text size='m'>{text}</Text>
                                </div>
                                <Button caption={caption} className={styles['item-button']} />
                            </div>
                        </a>
                    )
                })}
            </div>
        </DataSection>
    )
}

export default memo(Categories);
