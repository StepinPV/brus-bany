import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

const LIFE_TIME = 3000;

class Provider extends PureComponent {
    static propTypes = {
        children: PropTypes.element
    };

    state = {
        notification: null,
        timeout: null
    };

    render() {
        const { children } = this.props;
        const { notification } = this.state;

        const providerProps = {
            notification,
            showNotification: this.showNotification
        };

        return (
            <Context.Provider value={providerProps}>{children}</Context.Provider>
        );
    }

    showNotification = (newNotification) => {
        const { notification } = this.state;

        // Если есть активная нотификация, сначала скрываем ее
        if (notification) {
            this.hide(() => this.show(newNotification));
        } else {
            this.show(newNotification);
        }
    };

    show = (notification) => {
        const timeout = setTimeout(() => this.hide(), LIFE_TIME);
        this.setState({ notification, timeout });
    };

    hide = (callback) => {
        const { timeout } = this.state;

        clearTimeout(timeout);

        this.setState({
            notification: null,
            timeout: null
        }, () => callback && callback());
    };
}

export default Provider;
