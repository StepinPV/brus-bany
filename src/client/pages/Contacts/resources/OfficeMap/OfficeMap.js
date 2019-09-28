import React, { memo } from 'react';
import styles from './OfficeMap.module.css';

function OfficeMap() {
    return (
        <div className={styles.map}>
            <iframe src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=111422907145" width="100%" height="100%" frameBorder="0" />
        </div>
    );
}

export default memo(OfficeMap);
