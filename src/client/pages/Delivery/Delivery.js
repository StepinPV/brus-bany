import React, {memo} from 'react';
import Page from '../../components/Page';
import First from './resources/First';
import Table from './resources/Table';
import Top from './resources/Top';
import Breadcrumbs from '../../../components/Breadcrumbs';
import DeliveryMap from '../../components/DeliveryMap';
import styles from "./Delivery.module.css";
import FormBlock from '../../components/FormBlock';
import Meta from '../../components/Meta';

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'География доставки'
}];

const META = {
    title: 'География доставки',
    description: 'Доставим баню в любую точку России',
    keywords: 'География доставки, информация о доставке, стоимость доставки'
};

function Delivery() {
    return (
        <Page opacityHeader>
            <Meta meta={META} />
            <Top />
            <Breadcrumbs className={styles.breadcrumbs} items={breadcrumbs} />
            <First />
            <DeliveryMap id='delivery-map' />
            <Table />
            <FormBlock source='Страница доставки' />
        </Page>
    );
}

export default memo(Delivery);
