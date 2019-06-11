import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { YMaps, Map, RoutePanel } from 'react-yandex-maps';
import DataSection from '../DataSection';
import styles from './DeliveryMap.module.css';

class DeliveryMap extends PureComponent {
    constructor(props) {
        super(props);

        // Функция, вычисляющая стоимость доставки.
        function calculate(routeLength) {
            return Math.max(routeLength * props.tariff, props.minimalCost);
        }

        this.setRoutePanelRef = element => {
            if (!element) {
                return;
            }

            this.routePanel = element;

            this.routePanel.routePanel.state.set({
                fromEnabled: false,
                from: 'Новгородская обл, г.Пестово'
            });

            this.routePanel.routePanel.options.set({
                types: { auto: true }
            });

            this.routePanel.routePanel.getRouteAsync().then(route => {
                // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором
                route.model.setParams({ results: 1 }, true);

                // Повесим обработчик на событие построения маршрута
                route.model.events.add('requestsuccess', () => {

                    const activeRoute = route.getActiveRoute();

                    if (activeRoute) {
                        // Получим протяженность маршрута
                        const length = route.getActiveRoute().properties.get("distance");
                        // Вычислим стоимость доставки
                        const price = calculate(Math.round(length.value / 1000));

                        this.setState({ data: { length, price } });
                        // Создадим макет содержимого балуна маршрута.
                        /* const balloonContentLayout = ymaps.templateLayoutFactory.createClass(
                                '<span>Расстояние: ' + length.text + '.</span><br/>' +
                                '<span style="font-weight: bold; font-style: italic">Стоимость доставки: ' + price + ' р.</span>');
                        // Зададим этот макет для содержимого балуна.
                        route.options.set('routeBalloonContentLayout', balloonContentLayout);
                        // Откроем балун.
                        activeRoute.balloon.open(); */

                        // const addressObj = event.get("target").getRoutes()[0].multiRoute.properties._data.rawProperties.RouterMetaData.Waypoints[1];
                    }
                });

                route.model.events.add('requestchange', () => {
                    // window.delivery = 0;
                    this.setState({ data: null });
                });

            });
        };

        this.setMapRef = element => {
            if (!element) {
                return;
            }

            this.map = element;
            this.map.behaviors.disable('scrollZoom');
        }
    }

    static propTypes = {
        tariff: PropTypes.number.isRequired,
        minimalCost: PropTypes.number.isRequired
    };

    static defaultProps = {
        tariff: 75,
        minimalCost: 500
    };

    state = {
        data: null
    };

    render() {
        const { data } = this.state;

        return (
            <DataSection caption='Рассчитайте стоимость доставки'>
                <div className={styles.container}>
                    {data ? (
                        <div className={styles.coastContainer}>
                            <div>{`Расстояние: ${data.length.text}`}</div>
                            <div className={styles.coast}>{`Стоимость доставки: ${data.price} р`}</div>
                        </div>
                    ) : null}
                    <YMaps version='2.1.63'>
                        <Map
                            defaultState={{ center: [60.906882, 30.067233], zoom: 9 }}
                            instanceRef={this.setMapRef}
                            className={styles.map}>
                            <RoutePanel
                                options={{
                                    showHeader: true,
                                    title: 'Расчет доставки',
                                    autofocus: false,
                                    maxWidth: '294px',
                                    types: {auto: true}
                                }}
                                instanceRef={this.setRoutePanelRef}
                            />
                        </Map>
                    </YMaps>
                </div>
            </DataSection>
        );
    }
}

export default DeliveryMap;
