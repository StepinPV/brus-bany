import React, {PureComponent, Fragment} from 'react';
import Header from '../../components/Header';
import Caption from '../../components/Caption';

class NotFound extends PureComponent {
    render() {
        return (
            <Fragment>
                <Header />
                <Caption>Страница не найдена</Caption>
            </Fragment>
        );
    }
}

export default NotFound;
