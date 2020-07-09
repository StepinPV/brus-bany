import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as components from '@constructor-components';
import withCustomComponents from '../withCustomComponents';

class Component extends PureComponent {
    static propTypes = {
        componentId: PropTypes.string,
        componentProps: PropTypes.object,
        componentImages: PropTypes.object,

        // withCustomComponents
        customComponents: PropTypes.array,
        loadCustomComponents: PropTypes.func
    };

    componentDidMount() {
        const { customComponents, loadCustomComponents } = this.props;

        if (!customComponents) {
            loadCustomComponents();
        }
    }

    render = () => {
        const { componentId, componentProps, componentImages } = this.props;

        return this.renderComponent(componentId, componentProps, componentImages);
    };

    renderComponent = (componentId, props, images) => {
        const { customComponents } = this.props;

        if (components[componentId]) {
            const Component = components[componentId];

            return <Component {...props} __images__={images || {}} />;
        }

        if (customComponents) {
            const customComponent = customComponents.find(c => c['_id'] === componentId);

            if (customComponent && customComponent.config && customComponent.config.components) {
                return customComponent.config.components.map(componentId => {
                    const componentData = customComponent.config.componentsData[componentId];

                    const finalProps = { ...componentData.props };

                    if (props) {
                        Object.keys(props).forEach(propKey => {
                            const [_componentId, paramId] = propKey.split(':');
                            if (_componentId === componentId.toString() && componentData.props['__editable-options__'] && componentData.props['__editable-options__'][paramId]) {
                                finalProps[paramId] = props[propKey];
                            }
                        });
                    }

                    return this.renderComponent(componentData.componentId, finalProps, {
                        ...componentData.images,
                        ...images
                    });
                });
            }
        }

        return null;
    };
}

export default withCustomComponents(Component);
