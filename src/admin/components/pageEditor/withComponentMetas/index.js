import React, { memo, useState, useEffect } from 'react';
import withCustomComponents from '../withCustomComponents';
import baseMetas from './metas';

export default function withComponentInstances(Component) {
    function ComponentInstances(props) {
        const [metas, setMetas] = useState(baseMetas);

        useEffect(() => {
            if (props.hasCustomComponents) {
                props.loadCustomComponents();
            }
        }, [])

        useEffect(() => {
            if (props.customComponents) {
                setMetas({
                    ...metas,
                    ...(props.customComponents.reduce((calc, component) => {
                        if (!metas[component['_id']]) {
                            let props = [], defaultProps = {};

                            if (component.config.components && component.config.componentsData) {
                                component.config.components.forEach(componentId => {
                                    const componentData = component.config.componentsData[componentId];

                                    if (componentData.props['__editable-options__']) {
                                        Object.keys(componentData.props['__editable-options__']).forEach(key => {
                                            if (componentData.props['__editable-options__'][key]) {
                                                const prop = metas[componentData.componentId].props.find(prop => prop['_id'] === key);
                                                const _id = `${componentId}:${prop['_id']}`;

                                                props.push({
                                                    ...prop,
                                                    '_id': _id
                                                });

                                                defaultProps[_id] = componentData.props[prop['_id']];
                                            }
                                        });
                                    }
                                });
                            }

                            calc[component['_id']] = {
                                key: component['_id'],
                                defaultProps,
                                props
                            }

                            return calc;
                        }
                    }, {}))
                });
            }
        }, [props.customComponents])

        return (
            <Component
                {...props}
                componentMetas={metas} />
        );
    }

    const memoComponent = memo(withCustomComponents(ComponentInstances));

    memoComponent.initialAction = Component.initialAction;

    return memoComponent;
}
