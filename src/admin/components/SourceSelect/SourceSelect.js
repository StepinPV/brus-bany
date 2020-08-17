import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from '../../../components/Select';
import getData from './getData';

const SourceSelect = ({ title, source, selectedKey, onChange, error, hasEmpty, images, required }) => {
    const [items, setItems] = useState(null);

    useEffect(function() {
        async function fetchItems() {
            setItems(await getData(source));
        }

        fetchItems(source);
    }, []);

    return (
        <Select
            title={title}
            items={items || []}
            displayProperty='title'
            keyProperty='id'
            hasEmpty={hasEmpty}
            selectedKey={selectedKey}
            onChange={val => onChange(val, null, images)}
            required={required}
            error={error} />
    );
};

SourceSelect.propTypes = {
    title: PropTypes.string,
    selectedKey: PropTypes.string,
    onChange: PropTypes.func,
    images: PropTypes.object,
    required: PropTypes.bool,
    hasEmpty: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};

export default memo(SourceSelect);
