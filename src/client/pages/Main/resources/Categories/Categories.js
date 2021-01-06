import React, {memo} from 'react';
import DataSection from '../../../../components/DataSection';
import Caption from '../../../../components/Caption';
import { Simple } from '../../../../../components/Button';
import Text from '../../../../components/Text';
import cx from 'classnames';
import styles from './Categories.module.css';

const categories = [{
    className: styles.brus,
    name: 'Бани из бруса',
    text: 'Строим баню на вашем участке, а вы контролируете процесс. Сложность - любая, хоть дворец с мансардой и верандой',
    caption: 'Посмотреть бани',
    link: '/bani/iz-brusa'
}, {
    className: styles['doma-brus'],
    name: 'Дома из бруса',
    text: 'Экологичный дом, неповторимая красота которого сохранится навечно',
    caption: 'Посмотреть дома',
    link: '/doma-iz-brusa'
}, {
    className: styles.karkas,
    name: 'Каркасные бани',
    text: 'Фасад не боится холодов, влажности и не дает усадки. А утеплители Paroc и Rockwool по теплоизоляции утирают нос даже бревну',
    caption: 'Посмотреть бани',
    link: '/bani/karkasnie'
}, {
    className: styles.mobilnie,
    name: 'Готовые бани',
    text: 'Недорого и без хлопот. Построим баню у себя, быстро привезем и установим на участке без шума и мусора',
    caption: 'Посмотреть бани',
    link: '/bani/gotovie'
}];

function Categories({ caption, captionTag, id }) {
    return (
        <DataSection bgStyle='white' caption={caption} captionTag={captionTag} id={id}>
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
                                <Simple caption={caption} className={styles['item-button']} />
                            </div>
                        </a>
                    )
                })}
            </div>
        </DataSection>
    )
}

Categories.defaultProps = {
    caption: 'Что мы строим?',
    captionTag: 'h2'
};

export default memo(Categories);
