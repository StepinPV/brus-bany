import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Input.module.css';

const getTypeAttrs = (type) => {
    switch (type) {
        case 'float-number': return { type: 'number', step: 'any' };
        case 'integer-number': return { type: 'number', step: 1 };
        default: return { type: 'text' };
    }
};

const Input = ({ title, value, onChange, required, type, min }) => {
    return (
        <div className={cx(styles.container, {[styles.required]: required})}>
            <input type="text" required className={styles.input} value={value} onChange={onChange} min={min} {...getTypeAttrs(type)} />
            <span className={styles.bar} />
            <label className={styles.label}>{title}</label>
        </div>
    )
};

Input.propTypes = {
    title: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    required: PropTypes.bool,
    type: PropTypes.string,
    min: PropTypes.number
};

export default memo(Input);
