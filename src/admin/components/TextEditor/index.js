import React, { memo, useEffect, useState } from 'react';
import loadable from '@loadable/component';

const TextEditor = loadable(() => import('./TextEditor'));

export default memo(({ value, title, onChange, props={} }) => {
    const [componentDidMount, setComponentDidMount] = useState(false);

    useEffect(() => {
        setComponentDidMount(true);
    }, []);

    return componentDidMount ? (
        <TextEditor
            value={value}
            title={title}
            props={props}
            onChange={onChange}
        />
    ) : null;
});

