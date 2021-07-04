import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import PageRender from '../PageRender';
import Meta from '../Meta';
import components from '@constructor-components';
import { applyFields } from '@constructor-components/helpers';
import styles from './CustomPage.module.css';

class CustomPage extends PureComponent {
    static propTypes = {
        customComponents: PropTypes.array,
        templates: PropTypes.array,
        pages: PropTypes.array,
        pageFolders: PropTypes.array,
        staticContext: PropTypes.object,
        page: PropTypes.object,
        whatsAppWidget: PropTypes.object
    };

    static defaultProps = {
        customComponents: [],
        templates: [],
        pages: [],
        pageFolders: []
    };

    static getDerivedStateFromProps(nextProps) {
        const { page, templates } = nextProps;
        const componentFieldValues = {};

        if (templates && page.config.template && page.config['template-fields']) {
            const template = templates.find((item => item['_id'] === page.config.template));

            if (template && template['page-fields']) {
                template['page-fields'].forEach(field => {
                    componentFieldValues[field.id] = {
                        type: field.type,
                        value: page.config['template-fields'][field.id]
                    }
                });
            }
        }

        return { componentFieldValues };
    }

    state = {};

    constructor(props) {
        super(props);

        if (props.staticContext) {
            props.staticContext.data = props.staticContext.data || {};
            props.staticContext.data.page = props.page;

            if (props.page.config.template) {
                props.staticContext.data.pageTemplates = props.staticContext.data.pageTemplates || [];

                const template = props.templates.find((t => t['_id'] === props.page.config.template));
                props.staticContext.data.pageTemplates.push(template);
            }
        }

        props.page.config.componentsData = props.page.config.componentsData || {};
        props.page.config.components = props.page.config.components || {};
    };

    render() {
        const { whatsAppWidget } = this.props;

        return (
            <PageRender
                header={this.renderSpecialComponent('header')}
                footer={this.renderSpecialComponent('footer')}>
                <>
                    {this.renderMeta()}
                    {this.renderPageContent()}
                    {whatsAppWidget && whatsAppWidget.phone ? (
                        <a
                            href={`https://api.whatsapp.com/send?phone=${whatsAppWidget.phone}`}
                            title='Перейти в WatsApp'
                            target='_blank'
                            rel="noopener noreferrer">
                            <i className={styles['whats-app']} />
                        </a>
                    ) : null}
                </>
            </PageRender>
        );
    }

    renderMeta = () => {
        const { page, templates } = this.props;
        const { componentFieldValues } = this.state;
        const meta = page.config.seoMeta || {};

        if (page.config.template) {
            const templateData = templates.find((t => t['_id'] === page.config.template));
            const templateMeta = templateData.seoMeta;

            if (templateMeta) {
                Object.keys(templateMeta).forEach(metaKey => {
                    if (!meta[metaKey] && typeof templateMeta[metaKey] === 'string') {
                        meta[metaKey] = componentFieldValues ? applyFields(componentFieldValues, templateMeta[metaKey]) : templateMeta[metaKey];
                    }
                });
            }
        }

        return (
            <Meta meta={meta} />
        );
    };

    renderSpecialComponent = (id) => {
        const { page, templates } = this.props;

        let configId = page.config[id];

        let component = configId ? page.config.componentsData[configId] : null;

        if (page.config.template) {
            const templateData = templates.find((t => t['_id'] === page.config.template));

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

        return (
            <Fragment key={id}>
                {this.renderComponent({
                    componentId: component.componentId,
                    props: componentProps,
                    images: component.images
                })}
            </Fragment>
        )
    };

    renderPageContent = () => {
        const { page, templates } = this.props;
        const { componentFieldValues } = this.state;

        let templateComponents = [0];
        let templateComponentsData = {
            0: {
                componentId: '__content__(main)'
            }
        };

        if (page.config.template) {
            const templateData = templates.find((t => t['_id'] === page.config.template));

            templateComponents = templateData.config.components;
            templateComponentsData = templateData.config.componentsData;
        }

        return (
            <>
                {templateComponents.map(tComponentId => {
                    const tComponent = templateComponentsData[tComponentId];

                    if (tComponent.componentId.includes('__content__')) {
                        const components = page.config.components[tComponent.componentId];

                        return (
                            <Fragment key={tComponentId}>
                                {components ? components.map((componentId, index) => {
                                    return this.renderComponentByIndex(tComponent.componentId, index);
                                }) : null}
                            </Fragment>
                        );
                    }

                    const tComponentProps = {
                        ...tComponent.props
                    };

                    let tComponentImages = {
                        ...(tComponent.images || {})
                    };

                    if (page.config['template-fields'] && page.config['template-fields']['__images__']) {
                        tComponentImages = {
                            ...tComponentImages,
                            ...page.config['template-fields']['__images__']
                        }
                    }

                    if (tComponentProps['__editable-options__'] && page.config.componentsData[tComponentId]) {
                        Object.keys(tComponentProps['__editable-options__']).forEach(key => {
                            if (tComponentProps['__editable-options__'][key]) {
                                if (page.config.componentsData[tComponentId].props[key] !== undefined) {
                                    tComponentProps[key] = page.config.componentsData[tComponentId].props[key];
                                    tComponentImages = {
                                        ...tComponentImages,
                                        ...(page.config.componentsData[tComponentId].images || {})
                                    }
                                }
                            }
                        });
                    }

                    if (tComponentProps['__visible__']) {
                        const value = applyFields(componentFieldValues, tComponentProps['__visible__']);
                        if (!value || value === 'false') {
                            return null;
                        }
                    }

                    return (
                        <Fragment key={tComponentId}>
                            {this.renderComponent({
                                componentId: tComponent.componentId,
                                props: tComponentProps,
                                images: tComponentImages
                            })}
                        </Fragment>
                    )
                })}
            </>
        )
    };

    renderComponentByIndex = (blockId, index) => {
        const { page } = this.props;

        const components = page.config.components[blockId];
        const component = page.config.componentsData[components[index]];

        return (
            <Fragment key={components[index]}>
                {this.renderComponent({
                    componentId: component.componentId,
                    props: component.props,
                    images: component.images,
                })}
            </Fragment>
        )
    };

    renderComponent = ({ componentId, props, images }) => {
        const { customComponents, staticContext, pages, pageFolders } = this.props;
        const { componentFieldValues } = this.state;

        if (components['forPage'][componentId]) {
            const Component = components['forPage'][componentId];

            return (
                <Component
                    {...props}
                    __images__={images || {}}
                    __pages__={pages}
                    __pageFolders__={pageFolders}
                    __fieldsValue__={componentFieldValues}
                    staticContext={staticContext} />
            );
        }

        const customComponent = customComponents.find(c => c['_id'] === componentId);

        if (staticContext) {
            staticContext.data = staticContext.data || {};
            staticContext.data.customComponents = staticContext.data.customComponents || [];

            if (!staticContext.data.customComponents.find(c => c['_id'] === componentId)) {
                staticContext.data.customComponents.push(customComponent);
            }
        }

        if (customComponent && customComponent.config && customComponent.config.components) {
            return (
                <>
                    {customComponent.config.components.map(cId => {
                        const componentData = customComponent.config.componentsData[cId];

                        const finalProps = { ...componentData.props };

                        Object.keys(props).forEach(propKey => {
                            const [_cId, paramId] = propKey.split(':');
                            if (_cId === cId.toString() && componentData.props['__editable-options__'] && componentData.props['__editable-options__'][paramId]) {
                                finalProps[paramId] = props[propKey];
                            }
                        });

                        return (
                            <Fragment key={cId}>
                                {this.renderComponent({
                                    componentId: componentData.componentId,
                                    props: finalProps,
                                    images: {
                                        ...componentData.images,
                                        ...images
                                    }
                                })}
                            </Fragment>
                        )
                    })}
                </>
            );
        }

        return null;
    };
}

export default CustomPage;
