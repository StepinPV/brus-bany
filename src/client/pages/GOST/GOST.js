import React, {memo} from 'react';
import Page from '../../components/Page';
import { Link } from '../../../components/Button';
import Top from './resources/Top';
import Breadcrumbs from '../../../components/Breadcrumbs';
import styles from "./GOST.module.css";
import FormBlock from "../../components/FormBlock";
import Meta from '../../components/Meta';

const META = {
    title: 'ГОСТы и СНиПы | Брус бани',
    description: '🏠 При возведении строительных объектов мы руководствуемся самыми актуальными стандартами и нормами строительства 📳 8(800)201-07-29'
};

const items = [{
    title: 'ГОСТ 30974-2002',
    description: 'СОЕДИНЕНИЯ УГЛОВЫЕ ДЕРЕВЯННЫХ БРУСЧАТЫХ И ДЕРЕВЯННЫХ МАЛОЭТАЖНЫХ ЗДАНИЙ',
    link: '/documents/GOST-30974-2002.pdf'
}, {
    title: 'ГОСТ 8242-88',
    description: 'ДЕТАЛИ ПРОФИЛИРОВАННЫЕ ИЗ ДРЕВЕСИНЫ И ДРУГИХ ДРЕВЕСНЫХ МАТЕРИАЛОВ',
    link: '/documents/GOST-8242-88.pdf'
}, {
    title: 'ГОСТ 11047-90',
    description: 'ДЕТАЛИ И ИЗДЕЛИЯ ДЕРЕВЯННЫЕ ДЛЯ МАЛОЭТАЖНЫХ ЖИЛЫХ И ОБЩЕСТВЕННЫХ ЗДАНИЙ',
    link: '/documents/GOST-11047-90.pdf'
}, {
    title: 'ГОСТ 19804-2012',
    description: 'СВАИ ЖЕЛЕЗОБЕТОННЫЕ ЗАВОДСКОГО ИЗГОТОВЛЕНИЯ',
    link: '/documents/GOST-19804-2012.pdf'
}, {
    title: 'СНиП 2-25-80',
    description: 'ДЕРЕВЯННЫЕ КОНСТРУКЦИИ',
    link: '/documents/SNIP-2-25-80.pdf'
}, {
    title: 'СНиП 53.13330.2011',
    description: 'ПЛАНИРОВКА И ЗАСТРОЙКА ТЕРРИТОРИЙ САДОВОДЧЕСКИХ (ДАЧНЫХ) ОБЪЕДИНЕНИЙ ГРАЖДАН, ЗДАНИЯ И СООРУЖЕНИЯ',
    link: '/documents/SNIP-53.13330.2011.pdf'
}];

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'ГОСТЫ И СНИПЫ'
}];

function GOST() {
    return (
        <Page opacityHeader>
            <Meta meta={META} />
            <Top />
            <Breadcrumbs items={breadcrumbs} />
            <div id='list' className={styles.items}>
                {items.map(({ title, description, link }) => {
                    return (
                        <div className={styles.item}>
                            <div className={styles.title}>{title}</div>
                            <div className={styles.description}>{description}</div>
                            <Link href={link} download target='_blank' rel='noopener noreferrer' caption='Скачать' />
                        </div>
                    );
                })}
            </div>
            <FormBlock source='Страница ГОСТ' />
        </Page>
    );
}

export default memo(GOST);
