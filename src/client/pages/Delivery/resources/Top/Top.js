import React, {memo} from 'react';
import Banner from '../../../../components/Banner';
import withForm from '../../../../plugins/Form/withForm';
import styles from './Top.module.css';

function Top(props) {
    const linkStyles = {
        color: '#ff8562',
        textDecoration: 'none',
        cursor: 'pointer'
    };

    return (
        <Banner
            caption='География доставки'
            description={(
                <>Мы работаем по всей России. <span onClick={() => props.showForm({ source: 'География доставки' })} style={linkStyles}>Оставьте заявку</span>, мы перезвоним и ответим на все вопросы</>
            )}
            buttonCaption='Рассчитать стоимость доставки'
            buttonHref='#delivery-map'
            bannerClassName={styles.banner} />
    )
}

export default memo(withForm(Top));

