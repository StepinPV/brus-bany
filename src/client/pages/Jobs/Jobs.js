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
                        <Caption className={styles.subCaption} size='s' tag='h2'>Обязанности:</Caption>
                        <Text>
                            <ul>
                                <li>Выполнение отделочных и строительных работ в соответствии с действующими нормами</li>
                                <li>Соблюдение требований проекта и плана производства работ</li>
                                <li>Выполнение указаний прораба и вышестоящего начальства</li>
                                <li>Соблюдение техники безопасности и правил поведения на объекте</li>
                            </ul>
                        </Text>
                    </div>
                    <div className={styles.data}>
                        <Caption className={styles.subCaption} size='s' tag='h2'>Требования:</Caption>
                        <Text>
                            <ul>
                                <li>Знание технологии выполнения строительных и отделочных работ</li>
                                <li>Отсутствие проблем с алкоголем</li>
                                <li>Релевантный опыт работы от 5 лет</li>
                            </ul>
                        </Text>
                    </div>
                    <div className={styles.data}>
                        <Caption className={styles.subCaption} size='s' tag='h2'>Что мы вам предлагаем:</Caption>
                        <Text>
                            <ul>
                                <li>Постоянный объем работы</li>
                                <li>Предоставление всего необходимого инструмента, спецодежды</li>
                                <li>Сдельная оплата, аванс до первой выплаты</li>
                                <li>Оформление по договору ГПХ, с возможность оформления в штат компании по ТК</li>
                            </ul>
                        </Text>
                    </div>
                    <Text className={styles.data}>Ждем ваше резюме на почту <a href="mailto:mailto:info@brus-bany.ru">info@brus-bany.ru</a></Text>
                </div>
                <FormBlock source='Страница вакансий' />
            </Page>
        );
    }
}

export default Jobs;
