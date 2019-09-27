import React, {memo} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NotFoundComponent from '../../components/NotFound';

function NotFound() {
    return (
        <>
            <Header />
            <NotFoundComponent />
            <Footer />
        </>
    );
}

export default memo(NotFound);
