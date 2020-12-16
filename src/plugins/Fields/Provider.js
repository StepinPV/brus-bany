import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

class Provider extends PureComponent {
    static propTypes = {
        children: PropTypes.element,
        fields: PropTypes.object
    };

    render() {
        const { children, fields } = this.props;

        return (
            <Context.Consumer>
                {prevFields => (
                    <Context.Provider value={fields || prevFields ? { ...(fields || {}), ...(prevFields || {}) } : null}>{children}</Context.Provider>
                )}
            </Context.Consumer>
        );
    }
}

export default Provider;
