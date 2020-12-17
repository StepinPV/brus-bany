import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './ColorSelect.module.css';
import cx from 'classnames';
import { useTheme } from 'emotion-theming';
import ColorPicker from 'rc-color-picker';
import { hexToRgba, rgbToHex } from '@utils/colors';

const ColorSelect = ({ title, value, onChange }) => {
    const theme = useTheme();

    if (value) {
        if (value[0] === '{'){
            value = JSON.parse(value);
        } else {
            value = { type: 'base', value }
            onChange(JSON.stringify(value));
        }
    }

    return (
        <>
            <div className={styles.title}>{title}</div>
            <div className={styles.items}>
                {Object.keys(theme.colors).map(colorId => (
                    <div
                        key={colorId}
                        className={cx(styles.item, {[styles['item-selected']]: value && value.type === 'base' && colorId === value.value })}>
                        <span
                            style={{ background: theme.colors[colorId].v }}
                            onClick={() => onChange(JSON.stringify({
                                type: 'base',
                                value: colorId
                            }))}
                            className='rc-color-picker-trigger' />
                        <div className={styles['item-title']}>{theme.colors[colorId].n}</div>
                    </div>
                ))}
                <div className={cx(styles.item, {[styles['item-selected']]: value && value.type === 'custom' })}>
                    <ColorPicker
                        color={value && value.type === 'custom' && rgbToHex(value.value).hex || '#fff'}
                        alpha={value && value.type === 'custom' && rgbToHex(value.value).alpha || 100}
                        onChange={({ color, alpha }) => {
                            onChange(JSON.stringify({
                                type: 'custom',
                                value: hexToRgba(color, alpha / 100)
                            }))
                        }}
                        onClose={() => {}}
                        placement='topLeft'>
                        <span className='rc-color-picker-trigger' />
                    </ColorPicker>
                    <div className={styles['item-title']}>Произвольный</div>
                </div>
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
