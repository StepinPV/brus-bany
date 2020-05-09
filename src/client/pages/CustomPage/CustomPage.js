import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Page from '../../components/Page';
import Meta from "../../components/Meta";

class CustomPage extends PureComponent {
    static propTypes = {
        seoMeta: PropTypes.object,
        __images__: PropTypes.object,
        componentConstructors: PropTypes.object,
        components: PropTypes.array
    };

    static defaultProps = {
        seoMeta: {},
        __images__: {},
        components: [],
        componentConstructors: {}
    };

    render() {
        const { components, seoMeta } = this.props;

        return (
            <Page>
                <Meta meta={seoMeta} />
                {components ? components.map(component => this.renderComponent(component)) : null}
            </Page>
        );
    }

    renderComponent = ({ componentId, props }) => {
        const { componentConstructors, __images__ } = this.props;
        const Component = componentConstructors[componentId];

        return <Component {...props} __images__={__images__} />;
    };
}

export default CustomPage;
