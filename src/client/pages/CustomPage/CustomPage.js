import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PageRender from '../../components/PageRender';
import Meta from "../../components/Meta";
import * as components from '@constructor-components';

class CustomPage extends PureComponent {
    static propTypes = {
        customComponents: PropTypes.array,
        pageTemplates: PropTypes.array,
        staticContext: PropTypes.object,
        page: PropTypes.object
    };

    static defaultProps = {
        customComponents: [],
        pageTemplates: [],
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
        const { page, pageTemplates } = this.props;

        let component = page.config[id];
        let __images__ = page.config['__images__'];

        if (page.config.template) {
            const templateData = pageTemplates.find((item => item['_id'] === page.config.template));

            if (templateData.config[id]) {
                component = templateData.config[id];
                __images__ = templateData.config['__images__'];
            }
        }

        return component ? this.renderComponent(component, __images__) : null;
    };

    renderPageContent = () => {
        const { page, pageTemplates } = this.props;

        let templateComponents = [{
            componentId: '__content__(main)'
        }];
        let __templateImages__ = {};

        if (page.config.template) {
            const templateData = pageTemplates.find((item => item['_id'] === page.config.template));

            templateComponents = templateData.config.components;
            __templateImages__ = templateData.config['__images__'];
        }

        return (
            <>
                {templateComponents.map(tComponent => {
                    if (tComponent.componentId.includes('__content__')) {
                        const components = (page.config.components || {})[tComponent.componentId];

                        return components ? components.map(component => this.renderComponent(component, page.config['__images__'])) : null;
                    }

                    return this.renderComponent(tComponent, __templateImages__);
                })}
            </>
        )
    };

    renderComponent = ({ componentId, props }, __images__) => {
        const { customComponents, staticContext } = this.props;

        if (components[componentId]) {
            const Component = components[componentId];

            return <Component {...props} __images__={__images__} staticContext={staticContext} />;
        }

        const customComponent = customComponents.find(c => c['_id'] === componentId);

        if (customComponent && customComponent.config && customComponent.config.components) {
            return customComponent.config.components.map(component => this.renderComponent(component, __images__));
        }

        return null;
    };
}

export default CustomPage;
