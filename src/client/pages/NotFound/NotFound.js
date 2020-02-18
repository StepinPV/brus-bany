import React, {memo} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NotFoundComponent from '../../components/NotFound';
import {Helmet} from "react-helmet";

const META = {
    title: '404',
    description: 'Страница не найдена или не существует',
    keywords: '404'
};

function NotFound() {
    return (
        <>
            <Helmet>
                <title>{META.title}</title>
                <meta name='description' content={META.description} />
                <meta name='keywords' content={META.keywords} />
                <meta property='og:title' content={META.title} />
                <meta property='og:description' content={META.description} />
            </Helmet>
            <Header />
            <NotFoundComponent />
            <Footer />
        </>
    );
}

export default memo(NotFound);
