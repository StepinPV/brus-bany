import React from 'react';
import Context from './Context';

export default function withForm(Component) {
    function NotificationComponent(props) {
        return (
            <Context.Consumer>
                {({ showForm }) => <Component {...props} showForm={showForm} />}
            </Context.Consumer>
        );
    }

    return NotificationComponent;
}
