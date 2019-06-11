import React, {memo} from 'react';
import Banner from '../../../../components/Banner';
import styles from './Top.module.css';

function Top() {
    return (
        <Banner
            caption='Индивидуальный проект'
            description='Построим баню любой сложности отталкиваясь от ваших предпочтений и пожеланий.
Отправьте информацию о проекте на почту info@brus-bany.ru или оставьте заявку.
Мы изучим ваш проект, дадим свои рекомендации и рассчитаем стоимость'
            buttonCaption='Обсудить проект'
            bannerClassName={styles.banner} />
    )
}

export default memo(Top);

