import React, { memo } from 'react';
import CategoriesBase from '../Main/resources/Categories';
import Page from '../../components/Page';
import FormBlock from '../../components/FormBlock';
import Meta from '../../components/Meta';

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Виды бань'
}];

const META = {
    title: 'Виды бань | Брус бани',
    description: '🏠 Категории бань, которые мы строим: брусовые, каркасные, бревенчатые, готовые 💨 Брус Бани 📳 8(800)201-07-29'
};

function Categories() {
    return (
        <Page breadcrumbs={breadcrumbs}>
            <Meta meta={META} />
            <CategoriesBase caption='Виды бань' captionTag='h1' />
            <FormBlock source='Страница /bani' />
        </Page>
    )
}

export default memo(Categories);
