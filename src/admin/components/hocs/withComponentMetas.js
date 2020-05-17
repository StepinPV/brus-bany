import React, { memo, useState } from 'react';
import componentsPaths from '../../../constructorComponents/meta';

export default function withComponentInstances(Component) {
    function ComponentInstances(props) {
        const [metas, setMetas] = useState({});

        async function loadMeta(componentId) {
            return await componentsPaths[componentId].loadMeta();
        }

        async function _loadMetas(metas, components, customComponents) {
            for (const { componentId } of components) {
                if (metas[componentId]) {
                    continue;
                }

                if (componentsPaths[componentId]) {
                    metas[componentId] = await loadMeta(componentId);
                    continue;
                }

                const component = customComponents.find(c => c['_id'] === componentId);
                metas = await _loadMetas(metas, component.config.components, customComponents);
            }

            return metas;
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
