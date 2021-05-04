import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './DeliveryMap.module.css';
import Caption from '@components/Caption';

let Map;

class DeliveryMap extends PureComponent {
    static propTypes = {
        id: PropTypes.string,
        onChange: PropTypes.func,
        content: PropTypes.object,
        defaultAddress: PropTypes.string
    };

    state = {
        firstChanged: true
    };

    constructor(props) {
        super(props);

        this.setRoutePanelRef = element => {
            if (!element) {
                return;
            }

            const { routePanel } = element;

            routePanel.state.set({
                fromEnabled: false,
                from: 'Новгородская обл, г.Пестово',
                to: props.defaultAddress
            });

            routePanel.options.set({
                types: { auto: true }
            });

            routePanel.getRouteAsync().then(route => {
                // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором
                route.model.setParams({ results: 1 }, true);

                // Повесим обработчик на событие построения маршрута
                route.model.events.add('requestsuccess', () => {
                    const activeRoute = route.getActiveRoute();

                    if (activeRoute) {
                        // Получим протяженность маршрута
                        const distance = activeRoute.properties.get("distance");
                        const length = Math.round(distance.value / 1000);

                        const point = routePanel.getRoute().getWayPoints().get(1);
                        const address = point ? point.model.getJson().properties.address : null;

                        if (props.onChange) {
                            props.onChange({ length, address });
                        }
                    }
                });

                route.model.events.add('requestchange', () => {
                    if (props.onChange && !this.state.firstChanged) {
                        props.onChange(null);
                    }

                    this.setState({ firstChanged: false });
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
        const { id, content } = this.props;
        const { mapLoaded } = this.state;

        return (
            <div id={id} className={styles.container}>
                <div className={styles.title}>
                    <Caption align='center' color='black' tag='h2'>Рассчитайте стоимость доставки</Caption>
                </div>
                {content ? (
                    <div className={styles.coastContainer}>
                        {content}
                    </div>
                ) : null}
                {mapLoaded ? (
                    <Map
                        setMapRef={this.setMapRef}
                        setRoutePanelRef={this.setRoutePanelRef} />
                ) : null}
            </div>
        );
    }
}

export default DeliveryMap;
