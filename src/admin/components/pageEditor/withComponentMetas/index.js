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
                            calc[component['_id']] = {
                                key: component['_id'],
                                defaultProps: {}
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
