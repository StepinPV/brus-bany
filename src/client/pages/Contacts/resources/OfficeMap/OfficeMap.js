import React, { PureComponent } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import styles from './OfficeMap.module.css';

class OfficeMap extends PureComponent {
    render() {
        return (
            <YMaps version='2.1.63'>
                <Map
                    defaultState={{ center: [58.599071, 35.798098], zoom: 9 }}
                    className={styles.map}>
                    <Placemark geometry={[58.599071, 35.798098]} />
                </Map>
            </YMaps>
        );
    }
}

export default OfficeMap;
