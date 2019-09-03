import React, {PureComponent} from 'react';
import Page from '../../components/Page';
import Caption from '../../components/Caption';
import Text from '../../components/Text';
import H1Block from '../../components/H1Block';
import styles from './Jobs.module.css';
import FormBlock from "../../components/FormBlock";

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
                    <H1Block caption='Вакансии' />
                    <Text className={styles.data}>
                        В строительную компанию ООО "Русская баня" в связи с ростом объемов работ требуется бригада на строительство бань из 3 человек. Основное направление - частное строительство бань и домов.
                    </Text>
                    <div className={styles.data}>
                        <Caption className={styles.subCaption}>Обязанности:</Caption>
                        <Text>1) Выполнение отделочных и строительных работ в соответствии с действующими нормами</Text>
                        <Text>2) Соблюдение требований проекта и плана производства работ</Text>
                        <Text>3) Выполнение указаний прораба и вышестоящего начальства</Text>
                        <Text>4) Соблюдение техники безопасности и правил поведения на объекте</Text>
                    </div>
                    <div className={styles.data}>
                        <Caption className={styles.subCaption}>Требования:</Caption>
                        <Text>1) Знание технологии выполнения строительных и отделочных работ</Text>
                        <Text>2) Отсутствие проблем с алкоголем</Text>
                        <Text>3) Релевантный опыт работы от 5 лет</Text>
                    </div>
                    <div className={styles.data}>
                        <Caption className={styles.subCaption}>Что мы вам предлагаем:</Caption>
                        <Text>1) Постоянный объем работы</Text>
                        <Text>2) Предоставление всего необходимого инструмента, спецодежды</Text>
                        <Text>3) Сдельная оплата, аванс до первой выплаты</Text>
                        <Text>4) Оформление по договору ГПХ, с возможность оформления в штат компании по ТК</Text>
                    </div>
                    <Text className={styles.data}>Ждем ваше резюме на почту <a href="mailto:mailto:info@brus-bany.ru">info@brus-bany.ru</a></Text>
                </div>
                <FormBlock source='Страница вакансий' />
            </Page>
        );
    }
}

export default Jobs;
