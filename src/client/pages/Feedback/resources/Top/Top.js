import React, {memo} from 'react';
import Banner from '../../../../components/Banner';
import styles from './Top.module.css';

function Top() {
    return (
        <Banner
            caption='ОТЗЫВЫ О НАС'
            description='На данной странице вы можете почитать как отзываются о нас люди или оставить свой отзыв'
            bannerClassName={styles.banner} />
    )
}

export default memo(Top);



