import React, {PureComponent} from 'react';
import Page from '../../components/Page';
import Caption from '../../components/Caption';
import Text from '../../components/Text';
import styles from './Jobs.module.css';

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Вакансии'
}];

class Jobs extends PureComponent {
    render() {
        return (
            <Page breadcrumbs={breadcrumbs}>
                <div className={styles.container}>
                    <Caption className={styles.caption} align='center'>Вакансии</Caption>
                    <Text className={styles.data}>
                        В строительную компанию ООО "Русская баня" в связи с ростом объемов работ требуется бригада на строительство бань из 3 человек. Основное направление - частное строительство бань и домов.
                    </Text>
                    <div className={styles.data}>
                        <Caption size='s' className={styles.subCaption}>Обязанности:</Caption>
                        <Text>
                            1) Выполнение отделочных и строительных работ в соответствии с действующими нормами<br />
                            2) Соблюдение требований проекта и плана производства работ<br />
                            3) Выполнение указаний прораба и вышестоящего начальства<br />
                            4) Соблюдение техники безопасности и правил поведения на объекте<br />
                        </Text>
                    </div>
                    <div className={styles.data}>
                        <Caption size='s' className={styles.subCaption}>Требования:</Caption>
                        <Text>
                            1) Знание технологии выполнения строительных и отделочных работ<br />
                            2) Отсутствие проблем с алкоголем<br />
                            3) Релевантный опыт работы от 5 лет<br />
                        </Text>
                    </div>
                    <div className={styles.data}>
                        <Caption size='s' className={styles.subCaption}>Что мы вам предлагаем:</Caption>
                        <Text>
                            1) Постоянный объем работы<br />
                            2) Предоставление всего необходимого инструмента, спецодежды<br />
                            3) Сдельная оплата, аванс до первой выплаты<br />
                            4) Оформление по договору ГПХ, с возможность оформления в штат компании по ТК<br />
                        </Text>
                    </div>
                    <Text className={styles.data}>Ждем ваше резюме на почту <a href="mailto:mailto:info@brus-bany.ru">info@brus-bany.ru</a></Text>
                </div>
            </Page>
        );
    }
}

export default Jobs;
