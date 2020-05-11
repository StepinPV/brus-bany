import React, { memo } from 'react';
import PropTypes from 'prop-types';
import FormItem from '../FormItem';
import Select from '../../../components/Select';
import styles from './OneOf.module.css';

const getSelectedVariant = (variants, value) => {
    return value && value.typeId ? variants.find(v => v.id === value.typeId) : variants[0];
};

const renderSelect = ({ title, value, variants, onChange, images }) => {
    return (
        <Select
            title={title}
            items={variants}
            displayProperty='typeTitle'
            keyProperty='id'
            selectedKey={getSelectedVariant(variants, value).id}
            onChange={(id) => {
                onChange({ typeId: id }, images)
            }}
            required />
    );
};

const renderItem = ({ value, onChange, variants, images }) => {
    const variant = getSelectedVariant(variants, value);

    return (
        <FormItem
            item={variant}
            value={value ? value.value : undefined}
            onChange={(val, images) => {
                onChange({
                    ...value,
                    value: val
                }, images);
            }}
            images={images}
        />
    );
};

const OneOf = ({ title, value, onChange, variants, error, images }) => {
    return (
        <div className={styles.container}>
            <div className={styles.select}>
                {renderSelect({ title, value, variants, onChange, images })}
            </div>
            {renderItem({ value, onChange, variants, images })}
            {typeof error === 'string' ? <div className={styles.error}>{error}</div> : null}
        </div>
    )
};

OneOf.propTypes = {
    title: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    variants: PropTypes.array,
    images: PropTypes.object,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default memo(OneOf);
