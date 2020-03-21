import React, {memo} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NotFoundComponent from '../../components/NotFound';
import Meta from '../../components/Meta';

const META = {
    title: '404 | Брус бани',
    description: 'Страница не найдена или не существует'
};

function NotFound() {
    return (
        <>
            <Meta meta={META} />
            <Header />
            <NotFoundComponent />
            <Footer />
        </>
    );
}

export default memo(NotFound);
