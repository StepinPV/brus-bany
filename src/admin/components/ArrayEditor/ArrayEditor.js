import React, { memo, Fragment } from 'react';
import PropTypes from 'prop-types';
import ObjectEditor from '../../components/ObjectEditor';

const ArrayEditor = ({ title, value, onChange, format, errors }) => (
    <Fragment>
        {
            value ? value.map((val, index) => {
                return <ObjectEditor
                    key={`${title} [${index + 1}]`}
                    title={`${title} [${index + 1}]`}
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
                    }} />
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
    </Fragment>
);

ArrayEditor.propTypes = {
    title: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
    format: PropTypes.array,
    errors: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};

export default memo(ArrayEditor);
