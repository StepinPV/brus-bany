import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Input from '../../components/Input';
import ArrayEditor from '../../components/ArrayEditor';
import AssociativeArrayEditor from '../../components/AssociativeArrayEditor';
import styles from './ObjectEditor.module.css';

const renderHeader = ({ title, value, onChange }) => {
    return (
        <div className={styles.header}>
            <span className={styles.title}>{title}</span>
            <span className={styles.addButton} onClick={() => onChange(value ? null : {})}>{value ? '-' : '+'}</span>
        </div>
    );
};

const renderItems = ({ value, onChange, format, errors }) => {
    return format.map(item => {
        const handleChange = (val) => {
            onChange({
                ...value,
                [item['_id']]: val
            })
        };

        switch (item.type) {
            case 'string':
            case 'float number':
            case 'integer number':
                return (
                    <div className={styles.input}>
                        <Input
                            key={item['_id']}
                            value={value[item['_id']]}
                            title={item.title}
                            type={item.type}
                            required={item.required}
                            min={item.min}
                            description={item.description}
                            onChange={handleChange}
                            error={errors[item['_id']]}
                        />
                    </div>
                );
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
            case 'associative array':
                return <AssociativeArrayEditor
                    key={item['_id']}
                    value={value[item['_id']]}
                    title={item.title}
                    titleFieldId={item.titleFieldId}
                    format={item.format}
                    onChange={handleChange}
                    errors={errors[item['_id']]}
                />;
            default: break;
        }

        return null;
    });
};

const ObjectEditor = ({ title, value, onChange, format, errors }) => {
    return (
        <div className={styles.container}>
            {renderHeader({ title, value, onChange })}
            {typeof errors === 'string' ? <div className={styles.error}>{errors}</div> : null}
            {value ? (
                <div className={styles.items}>
                    { renderItems({ value, onChange, format, errors: typeof errors === 'object' && errors !== null ? errors : {} }) }
                </div>
            ) : null}
        </div>
    )
};

ObjectEditor.propTypes = {
    title: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    format: PropTypes.array,
    errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default memo(ObjectEditor);
