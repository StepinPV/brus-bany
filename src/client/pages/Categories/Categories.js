import React, { memo } from 'react';
import CategoriesBase from '../Main/resources/Categories';
import Page from '../../components/Page';
import FormBlock from '../../components/FormBlock';
import Meta from '../../components/Meta';

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Категории бань'
}];

const META = {
    title: 'Брус бани — категории бань',
    description: 'Категории бань, которые мы строим'
};

function Categories() {
    return (
        <Page breadcrumbs={breadcrumbs}>
            <Meta meta={META} />
            <CategoriesBase caption='Категории бань' captionTag='h1' />
            <FormBlock source='Страница /bani' />
        </Page>
    )
}

export default memo(Categories);
