import React, { memo, useState } from 'react';
import componentsPaths from '../../../constructorComponents/meta';

export default function withComponentInstances(Component) {
    function ComponentInstances(props) {
        const [metas, setMetas] = useState({});

        async function loadMeta(componentId) {
            return await componentsPaths[componentId].loadMeta();
        }

        async function _loadMetas(componentMetas, components, customComponents) {
            for (const { componentId } of components) {
                if (componentMetas[componentId]) {
                    continue;
                }

                if (componentsPaths[componentId]) {
                    componentMetas[componentId] = await loadMeta(componentId);
                    continue;
                }

                const component = customComponents.find(c => c['_id'] === componentId);
                componentMetas = await _loadMetas(componentMetas, component.config.components, customComponents);
            }

            return componentMetas;
        }

        async function loadMetas(components, customComponents) {
            setMetas(await _loadMetas({ ...metas }, components, customComponents));
        }

        async function loadAll() {
            const newMetas = { ...metas };

            for (const componentId of Object.keys(componentsPaths)) {
                if (newMetas[componentId]) {
                    continue;
                }

                newMetas[componentId] = await loadMeta(componentId);
            }

            setMetas(newMetas);
        }

        return (
            <Component
                {...props}
                componentMetas={metas}
                loadAllComponentMetas={loadAll}
                loadComponentMetas={loadMetas} />
        );
    }

    const memoComponent = memo(ComponentInstances);

    memoComponent.initialAction = Component.initialAction;

    return ComponentInstances;
}
