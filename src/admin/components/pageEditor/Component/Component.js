import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as components from '@constructor-components';
import withCustomComponents from '../withCustomComponents';
import axios from 'axios';

let data;

async function getData() {
    if (data) {
        return data;
    }

    data = await Promise.all([
        axios.get(`/api/pages`),
        axios.get('/api/page-folders')
    ]);

    return data;
}

class Component extends PureComponent {
    static propTypes = {
        componentId: PropTypes.string,
        componentProps: PropTypes.object,
        componentImages: PropTypes.object,

        // withCustomComponents
        customComponents: PropTypes.array,
        loadCustomComponents: PropTypes.func
    };

    state = {
        data: data
    }

    async componentDidMount() {
        const { customComponents, loadCustomComponents } = this.props;

        if (!customComponents) {
            loadCustomComponents();
        }

        if (!this.state.data) {
            this.setState({
                data: await getData()
            })
        }
    }

    render = () => {
        const { componentId, componentProps, componentImages } = this.props;

        return this.state.data ? this.renderComponent(componentId, componentProps, componentImages) : null;
    };

    renderComponent = (componentId, props, images) => {
        const { customComponents } = this.props;

        if (components[componentId]) {
            const Component = components[componentId];

            return (
                <Component
                    {...props}
                    __pages__={this.state.data[0].data.data}
                    __pageFolders__={this.state.data[1].data.data}
                    __images__={images || {}}
                />
            );
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
