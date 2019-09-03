import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ObjectEditor from '../../components/ObjectEditor';

const getRandomId = () => Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;

const AssociativeArrayEditor = ({ title, value, onChange, format, errors, titleFieldId }) => (
    <>
        {
            value ? Object.keys(value).map(id => {
                return <ObjectEditor
                    key={id}
                    title={value[id][titleFieldId]}
                    value={value[id]}
                    format={format}
                    errors={typeof errors === 'object' && errors !== null ? errors[id] : null}
                    onChange={v => {
                        const newValue = {...value};
                        if (v) {
                            newValue[id] = v;
                        } else {
                            delete newValue[id];
                        }
                        onChange(Object.keys(newValue).length ? newValue : null);
                    }} />
            }) : null
        }
        <ObjectEditor
            key='new'
            title={title}
            format={format}
            onChange={v => {
                const newValue = {...(value || {})};
                newValue[getRandomId()] = v;
                onChange(newValue);
            }} />
    </>
);

AssociativeArrayEditor.propTypes = {
    title: PropTypes.string,
    titleFieldId: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    format: PropTypes.array,
    errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default memo(AssociativeArrayEditor);
