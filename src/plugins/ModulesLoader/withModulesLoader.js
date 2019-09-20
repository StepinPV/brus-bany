import React, { memo } from 'react';
import Context from './Context';

export default function withModulesLoader(Component) {
    function ModulesLoader(props) {
        return (
            <Context.Consumer>
                {({ loadModule }) => <Component {...props} loadModule={loadModule} />}
            </Context.Consumer>
        );
    }

    const memoComponent = memo(ModulesLoader);

    memoComponent.initialAction = Component.initialAction;

    return ModulesLoader;
}
