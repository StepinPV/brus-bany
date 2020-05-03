import React, {memo} from 'react';
import Header from '../../client/components/Header';
import Footer from '../../client/components/Footer';
import NotFoundComponent from '../../client/components/NotFound';
import Meta from '../../client/components/Meta';

const META = {
    title: '404 | Брус бани',
    description: 'Страница не найдена или не существует'
};

function NotFound() {
    return (
        <>
            <Meta meta={META} />
            <Header requestLink='/#requestForm' />
            <NotFoundComponent />
            <Footer />
        </>
    );
}

export default memo(NotFound);
