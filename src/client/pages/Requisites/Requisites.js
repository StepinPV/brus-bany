import React, {PureComponent} from 'react';
import Page from '../../components/Page';
import Caption from '../../components/Caption';
import Text from '../../components/Text';
import styles from './Requisites.module.css';
import FormBlock from "../../components/FormBlock";

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Реквизиты компании'
}];

class Requisites extends PureComponent {
    render() {
        return (
            <Page breadcrumbs={breadcrumbs}>
                <div className={styles.container}>
                    <Caption className={styles.caption} align='center'>Реквизиты компании</Caption>
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
}

export default Requisites;
