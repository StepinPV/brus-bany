import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Select from '../../../components/Select';
import { useTheme } from '@emotion/react';

const ThemeParamSelect = ({ title, value, required, error, onChange, typeId }) => {
    const theme = useTheme();

    const types = typeId.split(':');
    const itemsMap = types.reduce((val, type) => val[type], theme);

    return (
        <Select
            title={title}
            items={Object.keys(itemsMap).map(key => ({
                id: key,
                title: itemsMap[key].n
            }))}
            displayProperty='title'
            keyProperty='id'
            selectedKey={value}
            onChange={onChange}
            required={required}
            error={error} />
    );
};

ThemeParamSelect.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};

export default memo(ThemeParamSelect);
