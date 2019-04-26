import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Input.module.css';

const getTypeAttrs = (type) => {
    switch (type) {
        case 'float number': return { type: 'number', step: 'any' };
        case 'integer number': return { type: 'number', step: 1 };
        default: return { type: 'text' };
    }
};

class Input extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onChange: PropTypes.func,
        required: PropTypes.bool,
        type: PropTypes.string,
        min: PropTypes.number,
        error: PropTypes.string
    };

    render() {
        const { title, value, required, type, min, error } = this.props;

        return (
            <div className={cx(styles.container, {[styles.required]: required})}>
                <input type="text" required className={styles.input} value={value || ''} onChange={this.handleChange} min={min} {...getTypeAttrs(type)} />
                <span className={styles.bar} />
                <label className={styles.label}>{title}</label>
                {error ? <div className={styles.error}>{error}</div> : null}
            </div>
        )
    }

    handleChange = (e) => {
        const { onChange, type } = this.props;

        switch (type) {
            case 'float number': onChange(parseFloat(e.target.value)); break;
            case 'integer number': onChange(parseInt(e.target.value)); break;
            default: onChange(e.target.value); break;
        }

    }
}

export default Input;
