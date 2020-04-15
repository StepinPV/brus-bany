import React, {memo} from 'react';
import Page from '../../components/Page';
import Top from './resources/Top';
import FormBlock from '../../components/FormBlock';
import Meta from '../../components/Meta';

const META = {
    title: 'Индивидуальный проект бани',
    description: '🏠 Купить индивидуальный проект бани 💨 С 2009 года накопили опыт, чтобы построить баню любой сложности 💨 Гарантия 3 года 📳 8(800)201-07-29'
};

function CustomProject() {
    return (
        <Page opacityHeader>
            <Meta meta={META} />
            <Top />
            <FormBlock source='Индивидуальный проект' />
        </Page>
    );
}

export default memo(CustomProject);
