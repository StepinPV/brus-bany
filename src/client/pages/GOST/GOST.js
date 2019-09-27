import React, {memo} from 'react';
import Page from '../../components/Page';
import { Link } from '../../components/Button';
import Top from './resources/Top';
import Breadcrumbs from '../../../components/Breadcrumbs';
import styles from "./GOST.module.css";
import FormBlock from "../../components/FormBlock";

const items = [{
    title: 'ГОСТ 30974-2002',
    description: 'СОЕДИНЕНИЯ УГЛОВЫЕ ДЕРЕВЯННЫХ БРУСЧАТЫХ И ДЕРЕВЯННЫХ МАЛОЭТАЖНЫХ ЗДАНИЙ',
    link: 'https://yadi.sk/i/tYzuTTLLXrfWKQ'
}, {
    title: 'ГОСТ 8242-88',
    description: 'ДЕТАЛИ ПРОФИЛИРОВАННЫЕ ИЗ ДРЕВЕСИНЫ И ДРУГИХ ДРЕВЕСНЫХ МАТЕРИАЛОВ',
    link: 'https://yadi.sk/i/cDy4mJpEg5ZjpA'
}, {
    title: 'ГОСТ 11047-90',
    description: 'ДЕТАЛИ И ИЗДЕЛИЯ ДЕРЕВЯННЫЕ ДЛЯ МАЛОЭТАЖНЫХ ЖИЛЫХ И ОБЩЕСТВЕННЫХ ЗДАНИЙ',
    link: 'https://yadi.sk/i/Dxhi-wgFKbA5hg'
}, {
    title: 'ГОСТ 19804-2012',
    description: 'СВАИ ЖЕЛЕЗОБЕТОННЫЕ ЗАВОДСКОГО ИЗГОТОВЛЕНИЯ',
    link: 'https://yadi.sk/i/w0EIykvwM3bPPw'
}, {
    title: 'СНиП 2-25-80',
    description: 'ДЕРЕВЯННЫЕ КОНСТРУКЦИИ',
    link: 'https://yadi.sk/i/dXpRPePBvzmweg'
}, {
    title: 'СНиП 53.13330.2011',
    description: 'ПЛАНИРОВКА И ЗАСТРОЙКА ТЕРРИТОРИЙ САДОВОДЧЕСКИХ (ДАЧНЫХ) ОБЪЕДИНЕНИЙ ГРАЖДАН, ЗДАНИЯ И СООРУЖЕНИЯ',
    link: 'https://yadi.sk/i/OPbn6UgQ8Mv5IQ'
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
            <Top />
            <Breadcrumbs className={styles.breadcrumbs} items={breadcrumbs} />
            <div id='list' className={styles.items}>
                {items.map(({ title, description, link }) => {
                    return (
                        <div className={styles.item}>
                            <div className={styles.title}>{title}</div>
                            <div className={styles.description}>{description}</div>
                            <Link href={link} target='_blank' rel='noopener noreferrer' caption='Скачать' />
                        </div>
                    );
                })}
            </div>
            <FormBlock source='Страница ГОСТ' />
        </Page>
    );
}

export default memo(GOST);
