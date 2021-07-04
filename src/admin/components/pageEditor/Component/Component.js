import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import components from '@constructor-components';
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
        componentFieldValues: PropTypes.object,
        type: PropTypes.string,

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
        const { componentId, componentProps, componentImages, componentFieldValues } = this.props;

        return this.state.data ? this.renderComponent(componentId, componentProps, componentImages, componentFieldValues) : null;
    };

    renderComponent = (componentId, props, images, fieldValues) => {
        const { customComponents, type } = this.props;

        const Component = components[type][componentId];

        if (Component) {
            return (
                <Component
                    {...props}
                    __pages__={this.state.data[0].data.data}
                    __pageFolders__={this.state.data[1].data.data}
                    __images__={images || {}}
                    __fieldsValue__={fieldValues}
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

                    return (
                        <Fragment key={componentId}>
                            {this.renderComponent(componentData.componentId, finalProps, {
                                ...componentData.images,
                                ...images
                            })}
                        </Fragment>
                    );
                });
            }
        }

        return null;
    };
}

export default withCustomComponents(Component);
