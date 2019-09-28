import React, {memo} from 'react';
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

function Delivery() {
    return (
        <Page opacityHeader>
            <Top />
            <Breadcrumbs className={styles.breadcrumbs} items={breadcrumbs} />
            <First />
            {/*<DeliveryMap id='delivery-map' />*/}
            <Table />
            <FormBlock source='Страница доставки' />
        </Page>
    );
}

export default memo(Delivery);
