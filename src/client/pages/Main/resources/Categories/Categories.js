import React, {memo} from 'react';
import DataSection from '../../../../components/DataSection';
import Caption from '../../../../components/Caption';
import { Simple } from '../../../../../components/Button';
import cx from 'classnames';
import styles from './Categories.module.css';

const categories = [{
    className: styles.brus,
    name: 'Бани из бруса',
    caption: 'Посмотреть бани',
    link: '/bani/iz-brusa'
}, {
    className: styles['doma-brus'],
    name: 'Дома из бруса',
    caption: 'Посмотреть дома',
    link: '/doma-iz-brusa'
}, {
    className: styles.karkas,
    name: 'Каркасные бани',
    caption: 'Посмотреть бани',
    link: '/bani/karkasnie'
}, {
    className: styles.mobilnie,
    name: 'Готовые бани',
    caption: 'Посмотреть бани',
    link: '/bani/gotovie'
}];

function Categories({ caption, captionTag, id }) {
    return (
        <DataSection bgStyle='white' caption={caption} captionTag={captionTag} id={id}>
            <div className={styles.items}>
                {categories.map(({ className, name, caption, link }) => {
                    return (
                        <a href={link} key={name} className={cx(styles.item, className)}>
                            <div className={styles['item-overlay']} />
                            <div className={styles['item-content']}>
                                <div className={styles['item-caption']}>
                                    <Caption color='white' size='m' align='center'>{name}</Caption>
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
