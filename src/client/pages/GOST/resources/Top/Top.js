import React, {memo} from 'react';
import Banner from '../../../../components/Banner';
import styles from './Top.module.css';

function Top() {
    return (
        <Banner
            caption='ГОСТЫ И СНИПЫ'
            description='При возведении строительных объектов мы руководствуемся самыми актуальными стандартами и нормами строительства, именно поэтому наши бани служат очень долго и радуют своих владельцев'
            buttonCaption='Смотреть'
            buttonHref='#list'
            bannerClassName={styles.banner} />
    )
}

export default memo(Top);

