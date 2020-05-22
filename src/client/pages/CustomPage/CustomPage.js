import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Page from '../../components/Page';
import Meta from "../../components/Meta";
import * as Components from '@constructor-components/meta';

class CustomPage extends PureComponent {
    static propTypes = {
        seoMeta: PropTypes.object,
        headerProps: PropTypes.object,
        __images__: PropTypes.object,
        customComponents: PropTypes.array,
        components: PropTypes.array,
        staticContext: PropTypes.object
    };

    static defaultProps = {
        headerProps: {},
        seoMeta: {},
        __images__: {},
        components: [],
        customComponents: []
    };

    render() {
        const { components, seoMeta, headerProps } = this.props;

        return (
            <Page headerProps={headerProps}>
                <Meta meta={seoMeta} />
                {components ? this.renderComponents(components) : null}
            </Page>
        );
    }

    renderComponents = (components) => {
        return components.map(component => this.renderComponent(component));
    };

    renderComponent = ({ componentId, props }) => {
        const { customComponents, __images__, staticContext } = this.props;

        if (Components[componentId]) {
            const Component = Components[componentId];

            return <Component {...props} __images__={__images__} staticContext={staticContext} />;
        }

        const customComponent = customComponents.find(c => c['_id'] === componentId);

        if (customComponent && customComponent.config && customComponent.config.components) {
            return this.renderComponents(customComponent.config.components);
        }

        return null;
    };
}

export default CustomPage;
