import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { matchPath } from 'react-router-dom';

class Provider extends PureComponent {
    static propTypes = {
        routes: PropTypes.array,
        children: PropTypes.element
    };

    render() {
        const { children } = this.props;

        return (
            <Context.Provider value={{ loadModule: this.loadModule }}>{children}</Context.Provider>
        );
    }

    loadModule = async (path, callback) => {
        const { routes } = this.props;

        const matchRoute = routes.find(route => matchPath(path, route));

        if (matchRoute) {
            await matchRoute.component.preload();
            callback();
        } else {
            callback();
        }
    };
}

export default Provider;
