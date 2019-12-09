import React, { memo } from 'react';
import CategoriesBase from '../Main/resources/Categories';
import Page from '../../components/Page';
import FormBlock from '../../components/FormBlock';

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Категории бань'
}];

function Categories() {
    return (
        <Page breadcrumbs={breadcrumbs}>
            <CategoriesBase caption='Категории бань' captionTag='h1' />
            <FormBlock source='Страница /bani' />
        </Page>
    )
}

export default memo(Categories);
