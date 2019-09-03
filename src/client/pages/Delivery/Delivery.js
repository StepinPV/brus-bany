import React, {PureComponent} from 'react';
import Page from '../../components/Page';
import First from './resources/First';
import Table from './resources/Table';
import Top from './resources/Top';
import Breadcrumbs from '../../../components/Breadcrumbs';
import DeliveryMap from '../../components/DeliveryMap';
import styles from "./Delivery.module.css";
import FormBlock from "../../components/FormBlock";

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'География доставки'
}];

class Delivery extends PureComponent {
    render() {
        return (
            <Page fixedHeader>
                <Top />
                <Breadcrumbs className={styles.breadcrumbs} items={breadcrumbs} />
                <First />
                <a name="delivery-map">
                    <DeliveryMap />
                </a>
                <Table />
                <FormBlock source='Страница доставки' />
            </Page>
        );
    }
}

export default Delivery;
