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
        const { visible, source, title, buttonColor, buttonBackground } = this.state;

        const providerProps = {
            showForm: this.showForm,
            hideForm: this.hideForm,
            visible,
            source,
            title,
            buttonColor,
            buttonBackground
        };

        return (
            <Context.Provider value={providerProps}>{children}</Context.Provider>
        );
    }

    showForm = ({ source, title, buttonColor, buttonBackground }) => {
        this.setState({ visible: true, source, title, buttonColor, buttonBackground });
    };

    hideForm = () => {
        this.setState({ visible: false });
    }
}

export default Provider;
