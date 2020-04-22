import React, {memo} from 'react';
import DataSection from '../../../../components/DataSection';
import styles from './OurProduction.module.css';
import img1 from './resources/1.jpeg';
import img2 from './resources/2.jpeg';
import img3 from './resources/3.jpeg';
import img4 from './resources/4.jpeg';
import img5 from './resources/5.jpeg';
import img6 from './resources/6.jpeg';

function OurProduction() {
    return (
        <DataSection
            bgStyle='white'
            caption='Наше производство'
            captionTag='h2'
            description='Мы строим бани в центре российского деревянного строительства, в городе Пестово. Подробнее о преимуществах региона читайте в <a style="color:#003093; font-weight: bold" href="/blog/pochemu-tak-populyarni-bani-iz-pestovo">нашей статье</a>'
            isDescriptionHTML>
            <div className={styles.items}>
                <img src={img1} alt="Станок для обработки дерева" className={styles.item} loading='lazy' />
                <img src={img2} alt="Доски и бревна" className={styles.item} loading='lazy' />
                <img src={img3} alt="Склад хранения окон" className={styles.item} loading='lazy' />
                <img src={img4} alt="Шифер для крыши" className={styles.item} loading='lazy' />
                <img src={img5} alt="Рулоны" className={styles.item} loading='lazy' />
                <img src={img6} alt="Склад для хранения досок" className={styles.item} loading='lazy' />
            </div>
        </DataSection>
    )
}

export default memo(OurProduction);
