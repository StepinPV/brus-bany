import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Page from '../../components/Page';
import Meta from "../../components/Meta";

class CustomPage extends PureComponent {
    static propTypes = {
        seoMeta: PropTypes.object,
        headerProps: PropTypes.object,
        __images__: PropTypes.object,
        customComponents: PropTypes.array,
        componentConstructors: PropTypes.object,
        components: PropTypes.array
    };

    static defaultProps = {
        headerProps: {},
        seoMeta: {},
        __images__: {},
        components: [],
        customComponents: [],
        componentConstructors: {}
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
        const { componentConstructors, customComponents, __images__ } = this.props;

        if (componentConstructors[componentId]) {
            const Component = componentConstructors[componentId];

            return <Component {...props} __images__={__images__} />;
        }

        const customComponent = customComponents.find(c => c['_id'] === componentId);

        if (customComponent && customComponent.config && customComponent.config.components) {
            return this.renderComponents(customComponent.config.components);
        }

        return null;
    };
}

export default CustomPage;
