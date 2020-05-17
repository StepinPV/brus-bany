import React, { memo, useState } from 'react';
import componentsPaths from '../../../constructorComponents/meta';
// import axios from 'axios';

// let customComponents;
let componentMetas = {};

/*async function getCustomComponents() {
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
}*/

export default function withComponentMetas(Component) {
    function ComponentMetas(props) {
        const [componentMeta, setComponentMeta] = useState(componentMetas[props.componentId]);

        async function _load(id) {
            if (componentMetas[id]) {
                return componentMetas[id];
            }

            if (componentsPaths[id]) {
                const meta = await componentsPaths[props.componentId].loadMeta()
                componentMetas[id] = meta;
                return meta;
            }

            return {};
        }

        async function load() {
            setComponentMeta(await _load(props.componentId))
        }

        return (
            <Component
                {...props}
                componentMeta={componentMeta}
                loadComponentMeta={load} />
        );
    }

    const memoComponent = memo(ComponentMetas);

    memoComponent.initialAction = Component.initialAction;

    return ComponentMetas;
}
