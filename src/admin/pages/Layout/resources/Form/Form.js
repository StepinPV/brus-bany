import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../components/Input';
import ObjectEditor from '../../../../components/ObjectEditor';
import ArrayEditor from '../../../../components/ArrayEditor';
import styles from './Form.module.css';

const Form = ({ value, onChange, format, errors }) => {
    return (
        <div className={styles.container}>
            {format.map(item => {
                const handleChange = (val) => {
                    onChange(item['_id'], {
                        ...value,
                        [item['_id']]: val
                    })
                };

                switch (item.type) {
                    case 'string':
                    case 'float number':
                    case 'integer number':
                        return <Input
                            key={item['_id']}
                            value={value[item['_id']]}
                            title={item.title}
                            type={item.type}
                            required={item.required}
                            min={item.min}
                            description={item.description}
                            onChange={handleChange}
                            error={errors[item['_id']]}
                        />;
                    case 'object':
                        return <ObjectEditor
                            key={item['_id']}
                            value={value[item['_id']]}
                            title={item.title}
                            format={item.format}
                            onChange={handleChange}
                            errors={errors[item['_id']]}
                        />;
                    case 'array':
                        return <ArrayEditor
                            key={item['_id']}
                            value={value[item['_id']]}
                            title={item.title}
                            format={item.format}
                            onChange={handleChange}
                            errors={errors[item['_id']]}
                        />;
                    default: break;
                }

                return null;
            })}
        </div>
    );
};

Form.propTypes = {
    format: PropTypes.array,
    value: PropTypes.object,
    onChange: PropTypes.func,
    errors: PropTypes.object
};

export default memo(Form);
