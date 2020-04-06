import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../components/Input';
import Date from '../../../components/Date';
import CheckBox from '../../../components/CheckBox';
import TextArea from '../../../components/TextArea';
import ObjectEditor from '../ObjectEditor';
import ArrayEditor from '../ArrayEditor';
import ImageUploader from '../ImageUploader';
import AssociativeArrayEditor from '../AssociativeArrayEditor';
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
                        return (
                            <div className={styles.item} key={item['_id']}>
                                <Input
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
                    case 'date':
                        return (
                            <div className={styles.item} key={item['_id']}>
                                <Date
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
                    case 'text':
                        return (
                            <div className={styles.item} key={item['_id']}>
                                <TextArea
                                    value={value[item['_id']]}
                                    title={item.title}
                                    required={item.required}
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
                            itemTitleField={item.itemTitleField}
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
                    case 'image':
                        return (
                            <div className={styles.item} key={item['_id']}>
                                <ImageUploader
                                    image={value[item['_id']]}
                                    withoutLogo={item.withoutLogo}
                                    title={item.title}
                                    onChange={handleChange}
                                />
                                {errors[item['_id']] ? <div className={styles.error}>{errors[item['_id']]}</div> : null}
                            </div>
                        );
                    case 'boolean':
                        return (
                            <div className={styles.item} key={item['_id']}>
                                <CheckBox
                                    checked={value[item['_id']]}
                                    title={item.title}
                                    onChange={handleChange}
                                />
                            </div>

                        );
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
