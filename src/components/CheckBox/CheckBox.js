import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './CheckBox.module.css';

class CheckBox extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        checked: PropTypes.bool,
        onChange: PropTypes.func
    };

    render() {
        const { title, checked } = this.props;

        return (
            <div>
                <input type='checkbox' checked={checked} onChange={this.handleChange} />
                <label htmlFor="filters-withTerr">{title}</label>
            </div>
        )
    }

    handleChange = (e) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(e.target.checked)
        }
    }
}

export default CheckBox;
