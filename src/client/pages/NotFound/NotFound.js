import React, {PureComponent} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NotFoundComponent from '../../components/NotFound';

class NotFound extends PureComponent {
    render() {
        return (
            <>
                <Header />
                <NotFoundComponent />
                <Footer />
            </>
        );
    }
}

export default NotFound;
