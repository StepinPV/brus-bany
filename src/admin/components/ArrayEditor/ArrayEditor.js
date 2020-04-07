import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import ObjectEditor from '../../components/ObjectEditor';
import styles from './ArrayEditor.module.css';

const ArrayEditor = ({ title, value, onChange, format, errors, itemTitleField }) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <div className={styles.title} onClick={() => { setVisible(!visible) }}>{visible ? '▼' : '▶'} {title} {`(${value ? value.length : 0})`}</div>
            {visible ? (
                <div className={styles.items}>
                    {
                        value ? value.map((val, index) => {
                            return <ObjectEditor
                                key={index + 1}
                                title={itemTitleField ? val[itemTitleField] : index + 1}
                                value={val}
                                format={format}
                                errors={typeof errors === 'object' && errors !== null ? errors[index] : null}
                                onChange={v => {
                                    const newValue = [...value];
                                    if (v) {
                                        newValue[index] = v;
                                    } else {
                                        newValue.splice(index, 1);
                                    }
                                    onChange(newValue.length ? newValue : null);
                                }}
                                onUp={index !== 0 ? () => {
                                    const newValue = [...value];
                                    const temp = newValue[index - 1];
                                    newValue[index - 1] = newValue[index];
                                    newValue[index] = temp;
                                    onChange(newValue);
                                } : null}
                                onBottom={index !== value.length - 1 ? () => {
                                    const newValue = [...value];
                                    const temp = newValue[index + 1];
                                    newValue[index + 1] = newValue[index];
                                    newValue[index] = temp;
                                    onChange(newValue);
                                } : null} />
                        }) : null
                    }
                    <ObjectEditor
                        key={`${title} [${value ? value.length + 1 : 1}]`}
                        title={`${title} [${value ? value.length + 1 : 1}]`}
                        format={format}
                        onChange={v => {
                            const newValue = [...(value || [])];
                            newValue[newValue.length] = v;
                            onChange(newValue);
                        }} />
                </div>
            ) : null}
            {errors && typeof errors === 'string' ? <div className={styles.error}>{errors}</div> : null}
        </>
    );
};

ArrayEditor.propTypes = {
    title: PropTypes.string,
    itemTitleField: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
    format: PropTypes.array,
    errors: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};

export default memo(ArrayEditor);
