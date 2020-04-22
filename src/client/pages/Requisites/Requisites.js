import React, {memo} from 'react';
import Page from '../../components/Page';
import Caption from '../../components/Caption';
import Text from '../../components/Text';
import styles from './Requisites.module.css';
import FormBlock from '../../components/FormBlock';
import Meta from '../../components/Meta';

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Реквизиты компании'
}];

const META = {
    title: 'Реквизиты компании | Брус бани',
    description: '🏠 Реквизиты компании Брус бани 💨 Строительство бань brus-bany.ru 💨 Звоните 📳 8(800)201-07-29'
};

function Requisites() {
    return (
        <Page breadcrumbs={breadcrumbs}>
            <Meta meta={META} />
            <div className={styles.container}>
                <Caption className={styles.caption} align='center' tag='h1'>Реквизиты компании</Caption>
                <Text align='center'>ООО «Русская Баня»</Text>
                <Text align='center'>ИНН 5313015082</Text>
                <Text align='center'>ОГРН 1185321002910</Text>
                <Text align='center'>Р/С 40702810001090000294</Text>
                <Text align='center'>К/С 30101810900000000746</Text>
                <Text align='center'>174510, Новгородская область, г. Пестово, ул. Курганная 12</Text>
            </div>
            <FormBlock source='Страница реквизитов' />
        </Page>
    );
}

export default memo(Requisites);
