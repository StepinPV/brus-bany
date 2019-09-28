import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './DeliveryMap.module.css';
import Caption from '../Caption/Caption';

let Map;

class DeliveryMap extends PureComponent {
    static propTypes = {
        tariff: PropTypes.number.isRequired,
        minimalCost: PropTypes.number.isRequired,
        onChange: PropTypes.func,
        id: PropTypes.string
    };

    static defaultProps = {
        tariff: 75,
        minimalCost: 500
    };

    state = {
        data: null,
        mapLoaded: false
    };

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
                        const length = activeRoute.properties.get("distance");
                        // Вычислим стоимость доставки
                        const price = calculate(Math.round(length.value / 1000));

                        this.setState({ data: { length, price } });

                        if (props.onChange) {
                            props.onChange({ price });
                        }
                    }
                });

                route.model.events.add('requestchange', () => {
                    // window.delivery = 0;
                    this.setState({ data: null });

                    if (props.onChange) {
                        props.onChange(null);
                    }
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

    componentDidMount() {
        setTimeout(() => {
            import('./Map').then(module => {
                Map = module.default;
                this.setState({ mapLoaded: true });
            });
        }, 1000);
    }

    render() {
        const { id } = this.props;
        const { data, mapLoaded } = this.state;

        return (
            <div id={id} className={styles.container}>
                <div className={styles.title}>
                    <Caption align='center' color='black' tag='h2'>Рассчитайте стоимость доставки</Caption>
                </div>
                {data ? (
                    <div className={styles.coastContainer}>
                        <div>{`Расстояние: ${data.length.text}`}</div>
                        <div className={styles.coast}>{`Стоимость доставки: ${data.price} р`}</div>
                    </div>
                ) : null}
                {mapLoaded ? <Map setMapRef={this.setMapRef} setRoutePanelRef={this.setRoutePanelRef} /> : null}
            </div>
        );
    }
}

export default DeliveryMap;
