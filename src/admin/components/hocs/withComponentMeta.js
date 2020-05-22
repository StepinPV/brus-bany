import React, { memo, useState } from 'react';
import componentsPaths from '../../../constructorComponents/meta';

let componentMetas = {};

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
