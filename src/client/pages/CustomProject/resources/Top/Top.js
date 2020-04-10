import React, {memo} from 'react';
import Banner from '../../../../components/Banner';
import styles from './Top.module.css';

function Top() {
    const linkStyles = {
        color: '#ffbb00',
        textDecoration: 'none',
        cursor: 'pointer'
    };

    return (
        <Banner
            caption='Индивидуальный проект'
            description={(
                <>
                    Построим баню любой сложности отталкиваясь от ваших предпочтений и пожеланий.
                    Отправьте информацию о проекте на почту <a href="mailto:info@brus-bany.ru" style={linkStyles}>info@brus-bany.ru</a> или <a href='#requestForm' style={linkStyles}>оставьте заявку</a>.
                    Мы изучим ваш проект, дадим свои рекомендации и рассчитаем стоимость
                </>
            )}
            buttonCaption='Обсудить проект'
            buttonHref='#requestForm'
            bannerClassName={styles.banner} />
    )
}

export default memo(Top);

