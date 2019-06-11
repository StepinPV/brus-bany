import React, {PureComponent} from 'react';
import Page from '../../components/Page';
import Top from './resources/Top';

class CustomProject extends PureComponent {
    render() {
        return (
            <Page absoluteHeader>
                <Top />
            </Page>
        );
    }
}

export default CustomProject;
