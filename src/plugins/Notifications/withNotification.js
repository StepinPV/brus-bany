import React, { memo } from 'react';
import Context from './Context';

export default function withNotification(Component) {
    function NotificationComponent(props) {
        return (
            <Context.Consumer>
                {({ showNotification }) => <Component {...props} showNotification={showNotification} />}
            </Context.Consumer>
        );
    }

    const memoComponent = memo(NotificationComponent);

    memoComponent.initialAction = Component.initialAction;

    return NotificationComponent;
}
