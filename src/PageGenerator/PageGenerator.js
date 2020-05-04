import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Page from '../client/components/Page';
import Meta from "../client/components/Meta";

class PageGenerator extends PureComponent {
    static propTypes = {
        seoMeta: PropTypes.object,
        componentConstructors: PropTypes.object,
        components: PropTypes.array
    };

    static defaultProps = {
        seoMeta: {},
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
        const { componentConstructors } = this.props;
        const Component = componentConstructors[componentId];

        return <Component {...props} />;
    };
}

export default PageGenerator;
