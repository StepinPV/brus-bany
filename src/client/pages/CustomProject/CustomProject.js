import React, {memo} from 'react';
import Page from '../../components/Page';
import Top from './resources/Top';
import FormBlock from '../../components/FormBlock';
import Meta from '../../components/Meta';

const META = {
    title: 'Индивидуальный проект бани',
    description: 'Купить индивидуальный проект бани. Накопили достаточно опыта, чтобы построить баню любой сложности. Гарантия 3 года, срок строительства от 7 дней.',
    keywords: 'Индивидуальный проект бани, построить баню по индивидуальному проекту, заказать индивидуальный проект бани'
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
