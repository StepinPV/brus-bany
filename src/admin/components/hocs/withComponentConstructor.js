import React, { memo, useState } from 'react';
import componentsPaths from '../../../constructorComponents/meta';
import axios from 'axios';

let customComponents;
let componentConstructors = {};

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

export default function withComponentConstructor(Component) {
    function ComponentConstructor(props) {
        const [componentConstructor, setComponentConstructor] = useState(componentConstructors[props.componentId]);

        async function _load(id) {
            if (componentConstructors[id]) {
                return componentConstructors[id];
            }

            if (componentsPaths[id]) {
                const constructor = (await componentsPaths[id].load()).default;
                componentConstructors[id] = constructor;
                return constructor;
            }

            if (!customComponents) {
                await getCustomComponents();
            }

            const component = customComponents.find(c => c['_id'] === props.componentId);

            for (const c of component.config.components) {
                await _load(c.componentId);
            }

            componentConstructors[id] = memo(function(props) {
                return (
                    <>
                        {component.config.components.map(c => {
                            const Component = componentConstructors[c.componentId];
                            return <Component key={Math.random().toString()} {...props} {...c.props} />
                        })}
                    </>
                );
            });

            return componentConstructors[id];
        }

        async function load() {
            setComponentConstructor(await _load(props.componentId))
        }

        return (
            <Component
                {...props}
                componentConstructor={componentConstructor}
                loadComponentConstructor={load} />
        );
    }

    const memoComponent = memo(ComponentConstructor);

    memoComponent.initialAction = Component.initialAction;

    return ComponentConstructor;
}
