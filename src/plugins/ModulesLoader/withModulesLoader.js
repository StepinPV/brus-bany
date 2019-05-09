import React from 'react';
import Context from './Context';

export default function withModulesLoader(Component) {
    function ModulesLoader(props) {
        return (
            <Context.Consumer>
                {({ loadModule }) => <Component {...props} loadModule={loadModule} />}
            </Context.Consumer>
        );
    }

    return ModulesLoader;
}
