import React, { memo } from 'react';

import Page from '../../components/Page';
import { Link } from '../../../components/Button';
import Meta from '../../components/Meta';
import Top from './resources/Top';
import Categories from './resources/Categories';
import HowWork from './resources/HowWork';
import WhyMe from './resources/WhyMe';
import OurProduction from './resources/OurProduction';
import DataSection from '../../components/DataSection';
import FormBlock from '../../components/FormBlock';
import styles from './Main.module.css';
import { Pages } from '@constructor-components';

const META = {
    title: 'Купить недорогие бани под ключ от производителя | Брус бани',
    description: '🏠 Строим недорогие бани под ключ по всей России 💨 Более 150 проектов бань с гарантией 3 года 💨 Собственное производство 📳 8(800)201-07-29'
};

export default memo(function({ customComponents, staticContext, pages, pageFolders }) {
    return (
        <Page opacityHeader hasLinkToMain={false} customComponents={customComponents} staticContext={staticContext}>
            <Meta meta={META} />
            <Top />
            <Categories id='categories' />
            <HowWork />
            <DataSection
                captionTag='h2'
                bgStyle='white'
                caption='Фотоотчеты'
                description='За все время работы мы построили огромное количество объектов различной сложности. В данном разделе вы можете просмотреть фотографии, видеообзоры, отзывы и описание данных проектов'>
                <Pages
                    __pages__={pages}
                    __pageFolders__={pageFolders}
                    filter='index < 6'
                    folder='6055baddd48653323019b6aa'
                    paddingBottom='none'
                    paddingTop='none'
                    sort='page1[6162] > page2[6162] ? -1 : (page1[6162] === page2[6162] ? 0 : 1)'
                    staticContext={staticContext}
                />
                <div className={styles['button-container']}>
                    <Link href='/photos' caption='Смотреть все' />
                </div>
            </DataSection>
            <WhyMe />
            <DataSection
                captionTag='h2'
                bgStyle='white'
                caption='Делимся накопленным опытом'
                description='Основываясь на нашем опыте и профессиональной экспертизе, мы ведем свой блог, в котором делимся с вами полезными советами не только о строительстве бань, но и о правилах эксплуатации'>
                <Pages
                    __pages__={pages}
                    __pageFolders__={pageFolders}
                    filter='index < 6'
                    folder='5f3afaae19c6b22d24b5d0a5'
                    paddingBottom='none'
                    paddingTop='none'
                    sort='page1[5242] > page2[5242] ? -1 : (page1[5242] === page2[5242] ? 0 : 1)'
                    staticContext={staticContext}
                />
                <div className={styles['button-container']}>
                    <Link href='/blog' caption='Читать больше' />
                </div>
            </DataSection>
            <OurProduction />
            <FormBlock source='Главная страница' />
        </Page>
    );
});
