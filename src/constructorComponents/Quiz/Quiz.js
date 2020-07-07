import React, { PureComponent }from 'react';
import PropTypes from "prop-types";
import { Form } from '../index';
import styles from './Quiz.module.css';
import cx from 'classnames';

import img2_1 from "./resources/2/1.jpg";
import img2_2 from "./resources/2/2.jpg";
import img2_3 from "./resources/2/3.jpg";
import img2_4 from "./resources/2/4.jpg";
import img5_1 from "./resources/5/1.jpg";
import img5_2 from "./resources/5/2.jpg";
import img5_3 from "./resources/5/3.jpg";
import img5_4 from "./resources/5/4.jpeg";

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
        title: 'Габбро-диабаз 40кг'
    }]
}];

class Quiz extends PureComponent {
    static propTypes = {
        paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
        paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l'])
    };

    static defaultProps = {
        paddingTop: 'm',
        paddingBottom: 'm'
    };

    state = {
        questionIndex: 0,
        answers: []
    };

    render() {
        if (this.props.staticContext && this.props.staticContext.simplePage) {
            this.props.staticContext.simplePage = false;
        }

        const { questionIndex } = this.state;

        const className = cx(
            styles.content,
            this.props.paddingTop !== 'none' ? styles[`padding-top-${this.props.paddingTop}`] : null,
            this.props.paddingBottom !== 'none' ? styles[`padding-bottom-${this.props.paddingBottom}`] : null);

        return (
            <div className={className}>
                {questionIndex === questions.length ? (
                    <>
                        <div className={styles.number}>Спасибо!</div>
                        <div className={styles.question}>Оставьте ваши контакты и получите бесплатную консультацию по выбору бани и подарок!</div>
                        <Form source='Квиз' data={this.getAnswersData()} onSuccess={this.handleFormSuccess} buttonCaption='Отправить результаты опроса' />
                    </>
                ) : (
                    <>
                        <div className={styles.number}>{`Вопрос ${questionIndex + 1} из ${questions.length}`}</div>
                        <div className={styles.question}>{questions[questionIndex].question}</div>
                        <div className={styles.items}>
                            {this.renderItems(questions[questionIndex])}
                        </div>
                    </>
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
