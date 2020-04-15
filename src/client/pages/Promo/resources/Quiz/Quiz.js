import React, {PureComponent} from 'react';
import Page from '../../../../components/Page';
import Caption from '../../../../components/Caption';
import styles from './Quiz.module.css';
import FormBlock from "../../../../components/FormBlock";
import Form from "../../../../components/Form";
import Meta from '../../../../components/Meta';

import img2_1 from './resources/2/1.jpg';
import img2_2 from './resources/2/2.jpg';
import img2_3 from './resources/2/3.jpg';
import img2_4 from './resources/2/4.jpg';

import img5_1 from './resources/5/1.jpg';
import img5_2 from './resources/5/2.jpg';
import img5_3 from './resources/5/3.jpg';
import img5_4 from './resources/5/4.jpg';

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Скидки и акции',
    link: '/akcii'
}, {
    title: 'Пройдите опрос и получите подарок'
}];

const META = {
    title: 'Пройдите опрос и получите подарок | Брус бани',
    description: '🏠 Ответьте на 5 вопросов и получите скидку на строительство бани или подарок 💨 Звоните 📳 8(800)201-07-29'
};

const questions = [{
    type: 'select',
    question: 'Есть ли у вас участок под строительство бани?',
    items: ['Да', 'Нет', 'Купим в ближайшее время']
}, {
    type: 'images',
    question: 'Какой тип бани для вас предпочтительнее?',
    items: [{
        img: img2_1,
        title: 'Из бруса'
    }, {
        img: img2_2,
        title: 'Каркасная'
    }, {
        img: img2_3,
        title: 'Готовая'
    }, {
        img: img2_4,
        title: 'Еще не определился'
    }]
}, {
    type: 'select',
    question: 'Какую общую площадь бани рассматриваете?',
    items: ['До 16м2', 'До 36м2', 'Больше 36м2', 'Еще не определился']
}, {
    type: 'select',
    question: 'Какой у вас бюджет на приобретение бани?',
    items: ['До 150 000 руб', 'До 300 000 руб', 'До 500 000 руб', 'До 750 000 руб', 'До 1 000 000 руб']
}, {
    type: 'images',
    question: 'Выберите ваш подарок',
    items: [{
        img: img5_1,
        title: 'Лавочка'
    }, {
        img: img5_2,
        title: 'Стол'
    }, {
        img: img5_3,
        title: 'Комплект парильщика'
    }, {
        img: img5_4,
        title: 'Камни банные малиновый кварцит 60кг'
    }]
}];

class Quiz extends PureComponent {
    state = {
        questionIndex: 0,
        answers: []
    };

    render() {
        return (
            <Page breadcrumbs={breadcrumbs}>
                <Meta meta={META} />
                <div className={styles.container}>
                    <Caption className={styles.caption} align='center' tag='h1'>Пройдите опрос и получите подарок</Caption>
                </div>
                {this.renderQuiz()}
                <FormBlock source='Страница акции "Пройдите опрос и получите подарок"' />
            </Page>
        );
    }

    renderQuiz = () => {
        const { questionIndex } = this.state;

        return (
            <div className={styles.quiz}>
                <div className={styles.number}>{questionIndex === questions.length ? 'Спасибо!' : `Вопрос ${questionIndex + 1} из ${questions.length}`}</div>
                <div className={styles.question}>{questionIndex === questions.length ? 'Оставьте ваши контакты и получите бесплатную консультацию по выбору бани и подарок!' : questions[questionIndex].question}</div>
                {questionIndex === questions.length ? (
                    <div className={styles.form}>
                        <Form source='Квиз' data={this.getAnswersData()} onSuccess={this.handleFormSuccess} buttonCaption='Отправить результаты опроса' />
                    </div>
                ) : (
                    <div className={styles.items}>
                        {this.renderItems(questions[questionIndex])}
                    </div>
                )}
            </div>
        )
    };

    renderItems = (question) => {
        switch (question.type) {
            case 'select':
                return question.items.map(title => (
                    <div
                        key={title}
                        onClick={() => { this.handleChoose(question.question, title)}}
                        className={styles['title-item']}>{title}</div>
                ));

            case 'images':
                return question.items.map(item => (
                    <div
                        key={item.title}
                        className={styles['image-item']}
                        onClick={() => { this.handleChoose(question.question, item.title)}}>
                        <img className={styles['image-item-image']} src={item.img} alt={item.title} loading='lazy' />
                        <div className={styles['image-item-title']}>{item.title}</div>
                    </div>
                ));

            default:
                return null;
        }
    };

    handleChoose = (question, title) => {
        this.setState({
            answers: [...this.state.answers, { question, title}],
            questionIndex: this.state.questionIndex + 1
        });
    };

    handleFormSuccess = () => {
        this.setState({ answers: [], questionIndex: 0 });
    };

    getAnswersData = () => {
        const { answers } = this.state;

        const data = [{
            type: 'fields',
            title: 'Выбранные ответы',
            fields: []
        }];

        answers.forEach(answer => {
            data[0].fields.push({
                name: answer.question,
                value: answer.title
            });
        });

        return data;
    }
}

export default Quiz;
