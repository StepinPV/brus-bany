import React, {memo} from 'react';
import Page from '../../components/Page';
import Caption from '../../components/Caption';
import Text from '../../components/Text';
import H1Block from '../../components/H1Block';
import styles from './Jobs.module.css';
import FormBlock from "../../components/FormBlock";
import Meta from '../../components/Meta';

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Вакансии'
}];

const META = {
    title: 'Вакансии компании | Брус бани',
    description: 'В строительную компанию ООО "Русская баня" в связи с ростом объемов работ требуется бригада на строительство бань из 3 человек. Основное направление - частное строительство бань и домов.'
};

const items = [{
    caption: 'Обязанности:',
    items: [
        'Выполнение отделочных и строительных работ в соответствии с действующими нормами',
        'Соблюдение требований проекта и плана производства работ',
        'Выполнение указаний прораба и вышестоящего начальства',
        'Соблюдение техники безопасности и правил поведения на объекте'
    ]
}, {
    caption: 'Требования:',
    items: [
        'Знание технологии выполнения строительных и отделочных работ',
        'Отсутствие проблем с алкоголем',
        'Релевантный опыт работы от 5 лет'
    ]
}, {
    caption: 'Что мы вам предлагаем:',
    items: [
        'Постоянный объем работы',
        'Предоставление всего необходимого инструмента, спецодежды',
        'Сдельная оплата, аванс до первой выплаты',
        'Оформление по договору ГПХ, с возможность оформления в штат компании по ТК'
    ]
}];

function Jobs() {
    return (
        <Page breadcrumbs={breadcrumbs}>
            <Meta meta={META} />
            <div className={styles.container}>
                <H1Block caption='Вакансии' />
                <Text className={styles.data}>
                    В строительную компанию ООО "Русская баня" в связи с ростом объемов работ требуется бригада на строительство бань из 3 человек. Основное направление - частное строительство бань и домов.
                </Text>
                {items.map(item => (
                    <div className={styles.data}>
                        <Caption className={styles.subCaption} size='s' tag='h2'>{item.caption}</Caption>
                        <Text>
                            <ul>
                                {item.items.map(item => <li>{item}</li>)}
                            </ul>
                        </Text>
                    </div>
                ))}
                <Text className={styles.data}>Ждем ваше резюме на почту <a href="mailto:info@brus-bany.ru">info@brus-bany.ru</a></Text>
            </div>
            <FormBlock source='Страница вакансий' />
        </Page>
    );
}

export default memo(Jobs);
