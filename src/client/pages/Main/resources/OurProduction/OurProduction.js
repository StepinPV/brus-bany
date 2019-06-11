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
            description='Мы строим бани в центре российского деревянного строительства, в городе Пестово. Подробнее о преимуществах региона читайте в нашей статье' >
            <div className={styles.items}>
                <img src={img1} alt="" className={styles.item} />
                <img src={img2} alt="" className={styles.item} />
                <img src={img3} alt="" className={styles.item} />
                <img src={img4} alt="" className={styles.item} />
                <img src={img5} alt="" className={styles.item} />
                <img src={img6} alt="" className={styles.item} />
            </div>
        </DataSection>
    )
}

export default memo(OurProduction);
