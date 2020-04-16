import React, {memo} from 'react';
import Banner from '../../../../components/Banner';
import styles from './Top.module.css';

function Top() {
    const linkStyles = {
        color: '#f95f33',
        textDecoration: 'none',
        cursor: 'pointer'
    };

    return (
        <Banner
            caption='География доставки'
            description={(
                <>Мы работаем по всей России. <a href='#requestForm' style={linkStyles}>Оставьте заявку</a>, мы перезвоним и ответим на все вопросы</>
            )}
            buttonCaption='Рассчитать стоимость доставки'
            buttonHref='#delivery-map'
            bannerClassName={styles.banner} />
    )
}

export default memo(Top);

