import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import ObjectEditor from '../ObjectEditor';
import styles from './ArrayEditor.module.css';

const ArrayEditor = ({ title, value, onChange, format, error, itemTitleField, expand, images }) => {
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
                                expand={expand}
                                images={images}
                                error={typeof error === 'object' && error !== null ? error[index] : null}
                                onChange={(v, images) => {
                                    const newValue = [...value];
                                    if (v) {
                                        newValue[index] = v;
                                    } else {
                                        newValue.splice(index, 1);
                                    }
                                    onChange(newValue.length ? newValue : null, error, images);
                                }}
                                onUp={index !== 0 ? () => {
                                    const newValue = [...value];
                                    const temp = newValue[index - 1];
                                    newValue[index - 1] = newValue[index];
                                    newValue[index] = temp;

                                    let newError = error;
                                    if (error && typeof error === 'object') {
                                        newError = [...error];
                                        const temp = newError[index - 1];
                                        newError[index - 1] = newError[index];
                                        newError[index] = temp;
                                    }

                                    onChange(newValue, newError, images);
                                } : null}
                                onBottom={index !== value.length - 1 ? () => {
                                    const newValue = [...value];
                                    const temp = newValue[index + 1];
                                    newValue[index + 1] = newValue[index];
                                    newValue[index] = temp;

                                    let newError = error;
                                    if (error && typeof error === 'object') {
                                        newError = [...error];
                                        const temp = newError[index + 1];
                                        newError[index + 1] = newError[index];
                                        newError[index] = temp;
                                    }

                                    onChange(newValue, newError, images);
                                } : null} />
                        }) : null
                    }
                    <ObjectEditor
                        key={`${title} [${value ? value.length + 1 : 1}]`}
                        title={`${title} [${value ? value.length + 1 : 1}]`}
                        format={format}
                        images={images}
                        onChange={(v, images) => {
                            const newValue = [...(value || [])];
                            newValue[newValue.length] = v;
                            onChange(newValue, error, images);
                        }} />
                </div>
            ) : null}
            {error && typeof error === 'string' ? <div className={styles.error}>{error}</div> : null}
        </>
    );
};

ArrayEditor.propTypes = {
    title: PropTypes.string,
    itemTitleField: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
    format: PropTypes.array,
    expand: PropTypes.bool,
    images: PropTypes.object,
    error: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};

export default memo(ArrayEditor);
