import React, { PureComponent } from 'react';
import Page from '../client/components/Page';

class PageGenerator extends PureComponent {
    static defaultProps = {
        components: [],
        componentConstructors: {}
    };

    render() {
        const { components } = this.props;

        return (
            <Page>
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
