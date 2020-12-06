import React, { memo, useEffect, useState } from 'react';
import loadable from '@loadable/component';

const TextEditor = loadable(() => import('./TextEditor'));

export default memo(({ value, title, onChange, required }) => {
    const [componentDidMount, setComponentDidMount] = useState(false);

    useEffect(() => {
        setComponentDidMount(true);
    }, []);

    return componentDidMount ? (
        <TextEditor
            value={value}
            title={title}
            onChange={onChange}
        />
    ) : null;
});

