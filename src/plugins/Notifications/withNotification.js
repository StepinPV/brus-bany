import React from 'react';
import Context from './Context';

export default function withNotification(Component) {
    function NotificationComponent(props) {
        return (
            <Context.Consumer>
                {({ showNotification }) => <Component {...props} showNotification={showNotification} />}
            </Context.Consumer>
        );
    }

    return NotificationComponent;
}
