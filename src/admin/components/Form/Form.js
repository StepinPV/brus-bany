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
                        onChange={(val, error, images) => {
                            onChange({
                                ...value,
                                [item['_id']]: val
                            }, {
                                ...errors,
                                [item['_id']]: error
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
