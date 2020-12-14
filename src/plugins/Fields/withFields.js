import React, { memo } from 'react';
import Context from './Context';

export default function withFields(Component) {
    function FieldsComponent(props) {
        return (
            <Context.Consumer>
                {fields => <Component {...props} fields={fields} />}
            </Context.Consumer>
        );
    }

    const memoComponent = memo(FieldsComponent);

    memoComponent.initialAction = Component.initialAction;

    return FieldsComponent;
}
