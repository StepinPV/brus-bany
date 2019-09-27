import React, { memo } from 'react';
import Page from '../../components/Page';
import DataSection from '../../components/DataSection';
import Caption from '../../components/Caption';
import Text from '../../components/Text';
import styles from './Questions.module.css';
import FormBlock from "../../components/FormBlock";

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Вопросы и ответы'
}];

const items = [{
    name: 'О компании',
    questions: [{
        question: 'Где находится ваша компания?',
        answer: 'Наша организация находится в г. Пестово, Новгородская область. У нас выгодное географическое расположение, это слияние 3-х областей: Вологодской, Новгородской и Тверской область. Работаем мы напрямую без посредников'
    }]
}, {
    name: 'О бригаде',
    questions: [{
        question: 'Какой национальности специалисты ваших бригад?',
        answer: 'Все наши работники славянской внешности, из Новгородской области, в основном из Пестовского района. Но надо сказать, мы не делим людей по национальному признаку.'
    }, {
        question: 'Сколько человек в бригаде?',
        answer: 'В зависимости от сложности и размера объекта. Как правило бригады бывают от 2 до 5 человек.'
    }]
}, {
    name: 'О строительстве',
    questions: [{
        question: 'Из какого дерева строите бани?',
        answer: 'Основной материал для строительства бани это древесина хвойных пород, сосна или Ель. Дерево непосредственно добывается на севере Новгородской и Вологодской области.'
    }, {
        question: 'Электрику делаете в банях?',
        answer: 'Электрика входит в стоимость только готовых бань. При условии строительства бани на участке заказчика плотники не делают электрику. Дополнительно можно сделать и сантехнику и электрику, этот момент обсуждается с менеджером. '
    }, {
        question: 'Из какого материала строите бани?',
        answer: 'Основное направление компании это строительство бань из профилированного бруса камерной сушки и строительство бани из профилированного бруса атмосферной сушки. Так же строим каркасные бани. Развиваем направление по строительству бань из оцилиндрованного бревна.'
    }, {
        question: 'Что мне нужно подготовить для строительства?',
        answer: 'Место для складирования материала, жильё для бригады, электричество.'
    }, {
        question: 'Сколько времени занимает строительство бани?',
        answer: 'В среднем от 3 до 20 дней в зависимости от размера бани. В зимний период дольше из за короткого светового дня.'
    }, {
        question: 'Можно ли вносить изменения в проекты бань?',
        answer: 'Да, можно.'
    }, {
        question: 'Можно ли поставить в баню свою печь?',
        answer: 'На нашем сайте представлены банные печи компании Ермак в разных вариантах. При желании, мы можем установить печь любого другого производителя. Если у вас есть своя печь – прекрасно, установим ее.'
    }, {
        question: 'Можно ли поставить баню на готовый фундамент?',
        answer: 'Да конечно, мы можем поставить баню на ваш фундамент.'
    }, {
        question: 'Можно ли построить баню по индивидуальному проекту?',
        answer: 'Да, можно, присылайте ваш проект к нам на почту info@brus-bany.ru. Прикрепите ваш план бани и техническое задание на строительство, можно все своими словами. '
    }, {
        question: 'Хочу построить баню, но на моем участке нет электричества, как быть?',
        answer: 'Есть решение этого вопроса. Мы привезём генератор, но он оплачивается отдельно. Так же вы можете приобрести его самостоятельно.'
    }, {
        question: 'Какой брус выбрать для бани, которая будет использоваться только в летний период?',
        answer: 'Если планируете париться в бане только весной, летом и осенью то достаточно профилированного бруса сечением 140х90мм. Если и зимой, то конечно брус 140х140мм.'
    }, {
        question: 'Можно ли построить баню из бруса 140х190мм?',
        answer: 'Да, можно.'
    }, {
        question: 'Чем лучше покрасить баню?',
        answer: 'На сегодняшний день представлен огромный выбор антисептиков и красок. Из недорогих можно рассмотреть такие антисептики как Акватекс, Биотекс, Неомид. Если говорить о красках, тут лучше отдать предпочтение Немецким или Финским производителям.'
    }]
}, {
    name: 'Об оплате',
    questions: [{
        question: 'Нужна ли предоплата?',
        answer: 'Работаем без предоплаты. Оплата происходит по факту доставки комплекта бани на ваш участок 70%, остальные 30% по факту сдачи бани и подписания соответствующих документов. Подробнее на странице <a href="/uslovia-oplati">условий оплаты.</a>'
    }, {
        question: 'Строите ли вы в рассрочку?',
        answer: 'Оформление прямой рассрочки всегда обсуждается.'
    }, {
        question: 'Сколько стоит доставка?',
        answer: 'Мы работаем прозрачно, доставка осуществляется за километраж от города Пестово. Более подробно ознакомиться и посчитать стоимость доставки можно в разделе <a href="/dostavka">географии доставки.</a>'
    }]
}, {
    name: 'О гарантии',
    questions: [{
        question: 'Какой срок гарантии на бани?',
        answer: 'Срок гарантийного обслуживания составляет 2 года.'
    }, {
        question: 'На что распространяется гарантия?',
        answer: 'Гарантия распространяется на протекание кровли, на целостность конструкции, на установку печи с соблюдением всех норм.'
    }, {
        question: 'На что не распространяется гарантия?',
        answer: 'На повреждения конструкции в результате неправильной эксплуатации строения. Правила эксплуатации подробно прописаны в договоре.'
    }]
}];

function Questions() {
    return (
        <Page breadcrumbs={breadcrumbs}>
            <DataSection caption='Вопросы и ответы' bgStyle='white' captionTag='h1'>
                <div className={styles.container}>
                    {items.map(({ name, questions }) => {
                        return (
                            <div className={styles.item}>
                                <div className={styles['group-name']}>{name}</div>
                                {questions.map(({ question, answer }) => {
                                    return (
                                        <div className={styles.question}>
                                            <Caption className={styles['question-text']} size='s'>{question}</Caption>
                                            <Text className={styles.answer}>{answer}</Text>
                                        </div>
                                    );
                                })}
                            </div>
                        )
                    })}
                </div>
            </DataSection>
            <FormBlock source='Страница вопрос-ответ' />
        </Page>
    );
}

export default memo(Questions);
