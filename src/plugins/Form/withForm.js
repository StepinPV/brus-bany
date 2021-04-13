import React, { memo } from 'react';
import Context from './Context';

export default function withForm(Component) {
    function FormComponent(props) {
        return (
            <Context.Consumer>
                {({ showForm }) => <Component {...props} showForm={showForm} />}
            </Context.Consumer>
        );
    }

    const memoComponent = memo(FormComponent);

    memoComponent.initialAction = Component.initialAction;

    return memoComponent;
}
