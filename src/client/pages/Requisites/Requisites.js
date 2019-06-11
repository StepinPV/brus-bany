import React, {PureComponent} from 'react';
import Page from '../../components/Page';
import Caption from '../../components/Caption';
import Text from '../../components/Text';
import styles from './Requisites.module.css';

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
                    <Text align='center'>
                        ООО «Русская Баня»<br />
                        ИНН 5313015082<br />
                        ОГРН 1185321002910<br />
                        Р/С 40702810001090000294<br />
                        К/С 30101810900000000746<br />
                        174510, Новгородская область, г. Пестово, ул. Курганная 12
                    </Text>
                </div>
            </Page>
        );
    }
}

export default Requisites;
