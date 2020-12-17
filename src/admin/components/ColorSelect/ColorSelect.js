import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './ColorSelect.module.css';
import cx from 'classnames';
import { useTheme } from 'emotion-theming';

const ColorSelect = ({ title, value, onChange }) => {
    const theme = useTheme();

    // TODO
    if (value && value[0] === '{') {
        value = JSON.parse(value).value;
    }

    return (
        <>
            <div className={styles.title}>{title}</div>
            <div className={styles.items}>
                {Object.keys(theme.colors).map(colorId => (
                    <div
                        key={colorId}
                        className={cx(styles.item, {[styles['item-selected']]: value && colorId === value })}>
                        <div
                            style={{ background: theme.colors[colorId].v }}
                            onClick={() => onChange(colorId)}
                            className={styles['item-color']} />
                        <div className={styles['item-title']}>{theme.colors[colorId].n}</div>
                    </div>
                ))}
            </div>
        </>
    );
};

ColorSelect.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};

export default memo(ColorSelect);
