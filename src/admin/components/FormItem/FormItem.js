import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../components/Input';
import Date from '../../../components/Date';
import CheckBox from '../../../components/CheckBox';
import TextEditor from '../TextEditor';
import ImageUploader from '../ImageUploader';
import SourceSelect from '../SourceSelect';
import ColorSelect from '../ColorSelect';
import Select from "../../../components/Select";
import styles from './FormItem.module.css';

import OneOf from '../OneOf';
import ObjectEditor from '../ObjectEditor';
import ArrayEditor from '../ArrayEditor';

const FormItem = ({ item, value, onChange, error, images }) => {
    switch (item.type) {
        case 'string':
        case 'float number':
        case 'integer number':
            return (
                <div className={styles.item}>
                    <Input
                        value={value}
                        title={item.title}
                        type={item.type}
                        required={item.required}
                        min={item.min}
                        description={item.description}
                        onChange={val => onChange(val, null, images)}
                        error={error}
                    />
                </div>
            );
        case 'date':
            return (
                <div className={styles.item}>
                    <Date
                        value={value}
                        title={item.title}
                        type={item.type}
                        required={item.required}
                        min={item.min}
                        description={item.description}
                        onChange={val => onChange(val, null, images)}
                        error={error}
                    />
                </div>
            );
        case 'text':
            return (
                <div className={styles.item}>
                    <TextEditor
                        value={value}
                        title={item.title}
                        required={item.required}
                        description={item.description}
                        onChange={val => onChange(val, null, images)}
                        error={error}
                    />
                </div>
            );
        case 'object':
            return <ObjectEditor
                value={value}
                title={item.title}
                format={item.format}
                onChange={onChange}
                images={images}
                error={error}
            />;
        case 'array':
            return <ArrayEditor
                value={value}
                title={item.title}
                itemTitleField={item.itemTitleField}
                format={item.format}
                expand={item.expand}
                copy={item.copy}
                onChange={onChange}
                images={images}
                error={error}
            />;
        case 'image':
            return (
                <div className={styles.item}>
                    <ImageUploader
                        image={value}
                        images={images}
                        props={item.props}
                        title={item.title}
                        onChange={val => {
                            if (item.props && item.props.globalStore) {
                                if (val) {
                                    const imageId = Math.floor(Math.random() * (9999 - 1000) + 1000);

                                    onChange(imageId, null, {
                                        ...images,
                                        [imageId]: val
                                    });
                                } else {
                                    const newImages = { ...images };
                                    delete newImages[value];
                                    onChange(null, null, newImages);
                                }
                            } else {
                                onChange(val, null, images);
                            }
                        }}
                    />
                    {error ? <div className={styles.error}>{error}</div> : null}
                </div>
            );
        case 'boolean':
            return (
                <div className={styles.item}>
                    <CheckBox
                        checked={value}
                        title={item.title}
                        onChange={val => onChange(val, null, images)}
                    />
                </div>

            );
        case 'select':
            return (
                <div className={styles.item}>
                    <Select
                        title={item.title}
                        items={item.items}
                        displayProperty='title'
                        keyProperty='id'
                        selectedKey={value}
                        onChange={val => onChange(val, null, images)}
                        required={item.required}
                        error={error} />
                </div>
            );
        case 'source-select':
            return (
                <div className={styles.item}>
                    <SourceSelect
                        title={item.title}
                        source={item.source}
                        displayProperty={item.displayProperty}
                        selectedKey={value}
                        hasEmpty={item.hasEmpty}
                        onChange={val => onChange(val, null, images)}
                        required={item.required}
                        error={error} />
                </div>
            );
        case 'color-select':
            return (
                <div className={styles.item}>
                    <ColorSelect
                        title={item.title}
                        value={value}
                        onChange={val => onChange(val, null, images)}
                        error={error} />
                </div>
            );
        case 'oneOf':
            return <OneOf
                value={value}
                title={item.title}
                variants={item.variants}
                onChange={onChange}
                error={error}
                images={images}
            />;
        default: return null;
    }
};

FormItem.propTypes = {
    item: PropTypes.object,
    value: PropTypes.any,
    onChange: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    images: PropTypes.object
};

export default memo(FormItem);
