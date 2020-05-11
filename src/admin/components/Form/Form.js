import React, { memo } from 'react';
import PropTypes from 'prop-types';
import FormItem from '../FormItem';
import styles from './Form.module.css';

const Form = ({ value, onChange, format, errors, images }) => {
    return (
        <div className={styles.container}>
            {format.map(item => {
                return (
                    <FormItem
                        key={item['_id']}
                        item={item}
                        value={value[item['_id']]}
                        error={errors[item['_id']]}
                        images={images}
                        onChange={(val, images) => {
                            onChange(item['_id'], {
                                ...value,
                                [item['_id']]: val
                            }, images);
                        }}
                    />
                );
            })}
        </div>
    );
};

Form.propTypes = {
    format: PropTypes.array,
    value: PropTypes.object,
    onChange: PropTypes.func,
    errors: PropTypes.object,
    images: PropTypes.object
};

export default memo(Form);
