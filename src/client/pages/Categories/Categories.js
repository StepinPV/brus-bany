import React, { memo } from 'react';
import CategoriesBase from '../Main/resources/Categories';
import Page from '../../components/Page';
import FormBlock from '../../components/FormBlock';
import { Helmet } from 'react-helmet';

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Категории бань'
}];

const META = {
    title: 'Брус бани — категории бань',
    description: 'Брус бани — категории бань',
    keywords: 'Категории бань'
};

function Categories() {
    return (
        <Page breadcrumbs={breadcrumbs}>
            <Helmet>
                <title>{META.title}</title>
                <meta name='description' content={META.description} />
                <meta name='keywords' content={META.keywords} />
                <meta property='og:title' content={META.title} />
                <meta property='og:description' content={META.description} />
            </Helmet>
            <CategoriesBase caption='Категории бань' captionTag='h1' />
            <FormBlock source='Страница /bani' />
        </Page>
    )
}

export default memo(Categories);
