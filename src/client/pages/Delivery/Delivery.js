import React, {memo} from 'react';
import Page from '../../components/Page';
import First from './resources/First';
import Table from './resources/Table';
import Top from './resources/Top';
import Breadcrumbs from '../../../components/Breadcrumbs';
import DeliveryMap from '../../components/DeliveryMap';
import FormBlock from '../../components/FormBlock';
import Meta from '../../components/Meta';

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'География доставки'
}];

const META = {
    title: 'География доставки | Брус бани',
    description: '🏠 Доставим баню в любую точку России 💨 Рассчитайте стоимость доставки на сайте 💨 Звоните 📳 8(800)201-07-29'
};

function Delivery() {
    return (
        <Page opacityHeader>
            <Meta meta={META} />
            <Top />
            <Breadcrumbs items={breadcrumbs} />
            <First />
            <DeliveryMap id='delivery-map' />
            <Table />
            <FormBlock source='Страница доставки' />
        </Page>
    );
}

export default memo(Delivery);
