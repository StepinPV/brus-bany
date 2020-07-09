import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import PageRender from '../../components/PageRender';
import Meta from "../../components/Meta";
import * as components from '@constructor-components';

class CustomPage extends PureComponent {
    static propTypes = {
        customComponents: PropTypes.array,
        templates: PropTypes.array,
        staticContext: PropTypes.object,
        page: PropTypes.object
    };

    static defaultProps = {
        customComponents: [],
        templates: [],
    };

    render() {
        const { page } = this.props;

        return (
            <PageRender
                header={this.renderSpecialComponent('header')}
                footer={this.renderSpecialComponent('footer')}>
                <>
                    {page.config.seoMeta ? <Meta meta={page.config.seoMeta} /> : null}
                    {this.renderPageContent()}
                </>
            </PageRender>
        );
    }

    renderSpecialComponent = (id) => {
        const { page, templates } = this.props;

        let configId = page.config[id];
        let component = page.config.componentsData[configId];

        if (page.config.template) {
            const templateData = templates.find((item => item['_id'] === page.config.template));

            if (templateData.config[id]) {
                configId = templateData.config[id];
                component = templateData.config.componentsData[configId];
            }
        }

        if (!component) {
            return null;
        }

        const componentProps = {
            ...component.props
        };

        if (componentProps['__editable-options__'] && page.config.componentsData[configId]) {
            Object.keys(componentProps['__editable-options__']).forEach(key => {
                if (componentProps['__editable-options__'][key]){
                    if (page.config.componentsData[configId].props[key] !== undefined) {
                        componentProps[key] = page.config.componentsData[configId].props[key];
                    }
                }
            });
        }

        return this.renderComponent({
            componentId: component.componentId,
            props: componentProps,
            images: component.images
        });
    };

    renderPageContent = () => {
        const { page, templates } = this.props;

        let templateComponents = [0];
        let templateComponentsData = {
            0: {
                componentId: '__content__(main)'
            }
        };

        if (page.config.template) {
            const templateData = templates.find((item => item['_id'] === page.config.template));

            templateComponents = templateData.config.components;
            templateComponentsData = templateData.config.componentsData;
        }

        return (
            <>
                {templateComponents.map(tComponentId => {
                    const tComponent = templateComponentsData[tComponentId];

                    if (tComponent.componentId.includes('__content__')) {
                        const components = (page.config.components || {})[tComponent.componentId];

                        return (
                            <Fragment key={tComponentId}>
                                {components ? components.map((componentId, index) => this.renderComponentByIndex(tComponent.componentId, index)) : null}
                            </Fragment>
                        );
                    }

                    const tComponentProps = {
                        ...tComponent.props
                    };

                    if (tComponentProps['__editable-options__'] && page.config.componentsData[tComponentId]) {
                        Object.keys(tComponentProps['__editable-options__']).forEach(key => {
                            if (tComponentProps['__editable-options__'][key]) {
                                if (page.config.componentsData[tComponentId].props[key] !== undefined) {
                                    tComponentProps[key] = page.config.componentsData[tComponentId].props[key];
                                }
                            }
                        });
                    }

                    return this.renderComponent({
                        componentId: tComponent.componentId,
                        props: tComponentProps,
                        images: tComponent.images
                    });
                })}
            </>
        )
    };

    renderComponentByIndex = (blockId, index) => {
        const { page } = this.props;

        const components = page.config.components[blockId];
        const component = page.config.componentsData[components[index]];

        return this.renderComponent({
            componentId: component.componentId,
            props: component.props,
            images: component.images,
        });
    };

    renderComponent = ({ componentId, props, images }) => {
        const { customComponents, staticContext } = this.props;

        if (components[componentId]) {
            const Component = components[componentId];

            return <Component {...props} __images__={images} staticContext={staticContext} />;
        }

        const customComponent = customComponents.find(c => c['_id'] === componentId);

        if (customComponent && customComponent.config && customComponent.config.components) {
            return customComponent.config.components.map(cId => {
                const componentData = customComponent.config.componentsData[cId];

                const finalProps = { ...componentData.props };

                Object.keys(props).forEach(propKey => {
                    const [_cId, paramId] = propKey.split(':');
                    if (_cId === cId.toString() && componentData.props['__editable-options__'] && componentData.props['__editable-options__'][paramId]) {
                        finalProps[paramId] = props[propKey];
                    }
                });

                return this.renderComponent({
                    componentId: componentData.componentId,
                    props: finalProps,
                    images: {
                        ...componentData.images,
                        ...images
                    }
                });
            });
        }

        return null;
    };
}

export default CustomPage;
