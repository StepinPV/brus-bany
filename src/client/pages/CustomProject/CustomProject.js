import React, {PureComponent} from 'react';
import Page from '../../components/Page';
import Top from './resources/Top';
import FormBlock from "../../components/FormBlock";

class CustomProject extends PureComponent {
    render() {
        return (
            <Page fixedHeader>
                <Top />
                <FormBlock source='Индивидуальный проект' />
            </Page>
        );
    }
}

export default CustomProject;
