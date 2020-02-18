import React, {memo} from 'react';
import Page from '../../components/Page';
import Top from './resources/Top';
import FormBlock from '../../components/FormBlock';
import { Helmet } from 'react-helmet';

const META = {
    title: 'Индивидуальный проект бани',
    description: 'Купить индивидуальный проект бани. Накопили достаточно опыта, чтобы построить баню любой сложности. Гарантия 3 года, срок строительства от 7 дней.',
    keywords: 'Индивидуальный проект бани, построить баню по индивидуальному проекту, заказать индивидуальный проект бани'
};

function CustomProject() {
    return (
        <Page opacityHeader>
            <Helmet>
                <title>{META.title}</title>
                <meta name='description' content={META.description} />
                <meta name='keywords' content={META.keywords} />
                <meta property='og:title' content={META.title} />
                <meta property='og:description' content={META.description} />
            </Helmet>
            <Top />
            <FormBlock source='Индивидуальный проект' />
        </Page>
    );
}

export default memo(CustomProject);
