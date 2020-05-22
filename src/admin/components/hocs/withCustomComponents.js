import React, { memo, useState } from 'react';
import axios from 'axios';

let customComponents;

async function getCustomComponents() {
    if (customComponents) {
        return customComponents;
    }

    const res = await axios.get('/api/components');

    if (res.data && res.data.status === 'error') {
        alert(res.data.message);
        return;
    }

    customComponents = res.data.data;

    return customComponents;
}

export default function withCustomComponents(Component) {
    function CustomComponents(props) {
        const [components, setComponents] = useState(customComponents);

        async function load() {
            setComponents(await getCustomComponents());
        }

        return (
            <Component
                {...props}
                customComponents={components}
                loadCustomComponents={load} />
        );
    }

    const memoComponent = memo(CustomComponents);

    memoComponent.initialAction = Component.initialAction;

    return CustomComponents;
}
