import React, {memo} from 'react';
import DataSection from '../../../../components/DataSection';
import styles from './Video.module.css';

function Video() {
    return (
        <DataSection bgStyle='grey' caption='Видеообзор построенных бань'>
            <div className={styles.items}>
                <iframe className={styles.item} width="560" height="315" src="https://www.youtube.com/embed/PjbYfDQbBMg" frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen />
                <iframe  className={styles.item} width="560" height="315" src="https://www.youtube.com/embed/BhKcmE2t3nY" frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen />
            </div>
        </DataSection>
    )
}

export default memo(Video);
