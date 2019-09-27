import React, {memo} from 'react';
import Page from '../../components/Page';
import Top from './resources/Top';
import FormBlock from "../../components/FormBlock";

function CustomProject() {
    return (
        <Page opacityHeader>
            <Top />
            <FormBlock source='Индивидуальный проект' />
        </Page>
    );
}

export default memo(CustomProject);
