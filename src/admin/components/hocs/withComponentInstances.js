import React, { memo, useState } from 'react';
import componentsPaths from '../../../constructorComponents/meta';

export default function withComponentInstances(Component) {
    function ComponentInstances(props) {
        const [instances, setInstances] = useState({});

        async function loadInstance(componentId) {
            return (await componentsPaths[componentId].load()).default;
        }

        async function _loadInstances(instances, components, customComponents) {
            for (const { componentId } of components) {
                if (instances[componentId]) {
                    continue;
                }

                if (componentsPaths[componentId]) {
                    instances[componentId] = await loadInstance(componentId);
                    continue;
                }

                const component = customComponents.find(c => c['_id'] === componentId);
                instances = await _loadInstances(instances, component.config.components, customComponents);
            }

            return instances;
        }

        async function loadInstances(components, customComponents) {
            setInstances(await _loadInstances({ ...instances }, components, customComponents));
        }

        return (
            <Component
                {...props}
                componentInstances={instances}
                loadComponentInstances={loadInstances}/>
        );
    }

    const memoComponent = memo(ComponentInstances);

    memoComponent.initialAction = Component.initialAction;

    return ComponentInstances;
}
