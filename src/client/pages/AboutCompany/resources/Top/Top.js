import React, {memo} from 'react';
import Banner from '../../../../components/Banner';
import styles from './Top.module.css';

function Top() {
    return (
        <Banner
            caption='О компании'
            description={(
                <>
                    Мы строим готовые бани, бани из бруса, каркасные бани, бани из бревна, <br/> а так же любые ваши идеи реализуем по индивидуальному проекту
                </>
            )}
            buttonCaption='Узнать больше'
            buttonHref='#requestForm'
            bannerClassName={styles.banner} />
    )
}

export default memo(Top);

