import React, {memo} from 'react';
import Banner from '../../../../components/Banner';
import styles from './Top.module.css';

function Top() {
    return (
        <Banner
            caption='География доставки'
            description='Мы работаем по всей России. Оставьте заявку, мы перезвоним и ответим на все вопросы'
            buttonCaption='Рассчитать стоимость доставки'
            bannerClassName={styles.banner} />
    )
}

export default memo(Top);

