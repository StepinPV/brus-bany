import React, { memo } from 'react';
import { YMaps, Map, RoutePanel } from 'react-yandex-maps';
import styles from './DeliveryMap.module.css';

function MapWrapper(props) {
    return (
        <YMaps version='2.1.63' query={{ apikey: 'fa735bc8-c259-4135-ba18-08ccba800f4d' }}>
            <Map
                defaultState={{ center: [60.906882, 30.067233], zoom: 9 }}
                instanceRef={props.setMapRef}
                className={styles.map}>
                <RoutePanel
                    options={{
                        showHeader: true,
                        title: 'Расчет доставки',
                        autofocus: false,
                        maxWidth: '294px',
                        types: {auto: true}
                    }}
                    instanceRef={props.setRoutePanelRef}
                />
            </Map>
        </YMaps>
    );
}

export default memo(MapWrapper);
