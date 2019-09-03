import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

class Provider extends PureComponent {
    static propTypes = {
        children: PropTypes.element
    };

    state = {
        visible: false
    };

    render() {
        const { children } = this.props;
        const { visible, source, title, data } = this.state;

        const providerProps = {
            showForm: this.showForm,
            hideForm: this.hideForm,
            visible,
            source,
            title,
            data
        };

        return (
            <Context.Provider value={providerProps}>{children}</Context.Provider>
        );
    }

    showForm = ({ source, title, data }) => {
        this.setState({ visible: true, source, title, data });
    };

    hideForm = () => {
        this.setState({ visible: false });
    }
}

export default Provider;
