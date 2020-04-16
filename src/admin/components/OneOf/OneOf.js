import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TextArea from '../../../components/TextArea';
import Select from '../../../components/Select';
import ImageUploader from '../ImageUploader';
import styles from './OneOf.module.css';
import ArrayEditor from '../ArrayEditor';
import ObjectEditor from '../ObjectEditor';
import Input from '../../../components/Input';

const renderSelect = ({ title, value, variants, onChange }) => {
    return (
        <Select
            title={title}
            items={variants}
            displayProperty='typeTitle'
            keyProperty='id'
            selectedKey={value ? value.typeId : null}
            onChange={(id) => { onChange({ typeId: id }) }}
            required />
    );
};

const renderItem = ({ value, onChange, variants }) => {
    const variant = variants.find(v => v.id === value.typeId);

    const handleChange = (val) => {
        onChange({ ...value, value: val })
    };

    switch (variant.type) {
        case 'text':
            return (
                <div className={styles.input}>
                    <TextArea
                        value={value.value}
                        title={variant.title}
                        required={variant.required}
                        onChange={handleChange}
                    />
                </div>
            );
        case 'image':
            return <ImageUploader
                image={value.value}
                title={variant.title}
                props={item.props}
                onChange={handleChange}
            />;
        case 'array':
            return <ArrayEditor
                value={value.value}
                title={variant.title}
                itemTitleField={variant.itemTitleField}
                format={variant.format}
                expand={variant.expand}
                onChange={handleChange}
            />;
        case 'object':
            return <ObjectEditor
                value={value.value}
                title={variant.title}
                format={variant.format}
                onChange={handleChange}
            />;
        case 'string':
        case 'float number':
        case 'integer number':
            return (
                <Input
                    value={value.value}
                    title={variant.title}
                    type={variant.type}
                    required={variant.required}
                    min={variant.min}
                    description={variant.description}
                    onChange={handleChange}
                />
            );
        default: break;
    }
};

const OneOf = ({ title, value, onChange, variants, errors }) => {
    return (
        <div className={styles.container}>
            <div className={styles.select}>
                {renderSelect({ title, value, variants, onChange })}
            </div>
            {value && value.typeId ? renderItem({ value, onChange, variants }) : null}
            {typeof errors === 'string' ? <div className={styles.error}>{errors}</div> : null}
        </div>
    )
};

OneOf.propTypes = {
    title: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    variants: PropTypes.array,
    errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default memo(OneOf);
