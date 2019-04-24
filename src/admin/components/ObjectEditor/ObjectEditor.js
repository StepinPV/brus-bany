import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './ObjectEditor.module.css';

const ObjectEditor = ({ title, value, onChange, format }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.title}>{title}</span>
            </div>
        </div>
    )
};

ObjectEditor.propTypes = {
    title: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    format: PropTypes.bool
};

export default memo(ObjectEditor);
