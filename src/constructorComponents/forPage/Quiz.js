import React, { PureComponent }from 'react';
import PropTypes from "prop-types";
import Form from '../components/Form';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import ContainerComponent from './Container';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin: 0 auto;
    box-sizing: border-box;
    ${props => css`
        max-width: ${props.theme['max-width']['m'].v};
    `}
`;

const Number = styled.div`
    color: #91001e;
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 32px;
`;

const Question = styled.div`
    font-size: 32px;
    margin-bottom: 16px;
    text-align: center;
    max-width: 600px;
`;

const Items = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Item = css`
    width: 160px;
    border-radius: 6px;
    cursor: pointer;
    margin: 16px;
    box-sizing: border-box;
`;

const ImageItem = styled.div`
    ${Item}
`;

const TextItem = styled.div`
    ${Item}
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid  #efefef;
    text-align: center;
    padding: 16px;
    font-weight: bold;
    background: #f7f5f5;
    color: #91001e;
    &:hover {
        background: #91001e;
        border-color: #91001e;
        color: #f7f5f5;
    }
`;

const ImageItemImage = styled.img`
    width: 100%;
    height: 140px;
    border-radius: 6px;
    margin-bottom: 8px;
`;

const ImageItemTitle = styled.div`
    text-align: center;
`;

class Quiz extends PureComponent {
    static propTypes = {
        paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
        paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
        items: PropTypes.array,
        resultText: PropTypes.string
    };

    static defaultProps = {
        paddingTop: 'm',
        paddingBottom: 'm',
        items: []
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
        const { items, resultText, id, paddingBottom, paddingTop, containerBackground } = this.props;

        return (
            <ContainerComponent
                paddingLeft
                paddingRight
                id={id}
                paddingBottom={paddingBottom}
                paddingTop={paddingTop}
                background={containerBackground}>
                <Container>
                    {questionIndex === items.length ? (
                        <>
                            <Number>Спасибо!</Number>
                            <Question dangerouslySetInnerHTML={{ __html: resultText }} />
                            <Form source='Квиз' data={this.getAnswersData()} onSuccess={this.handleFormSuccess} buttonCaption='Отправить результаты опроса' />
                        </>
                    ) : (
                        <>
                            <Number>{`Вопрос ${questionIndex + 1} из ${items.length}`}</Number>
                            <Question dangerouslySetInnerHTML={{ __html: items[questionIndex].title }} />
                            <Items>
                                {this.renderItems(items[questionIndex])}
                            </Items>
                        </>
                    )}
                </Container>
            </ContainerComponent>
        )
    };

    renderItems = (item) => {
        const { __images__ } = this.props;
        if (item.items) {
            return item.items.map(question => {
                if (question.image) {
                    return (
                        <ImageItem
                            key={question.title}
                            onClick={() => { this.handleChoose(question.title, item.title)}}>
                            <ImageItemImage src={__images__[question.image]} alt={question.title} loading='lazy' />
                            <ImageItemTitle dangerouslySetInnerHTML={{ __html: question.title }} />
                        </ImageItem>
                    );
                }

                return (
                    <TextItem
                        key={question.title}
                        onClick={() => { this.handleChoose(question.title, item.title)}}
                        dangerouslySetInnerHTML={{ __html: question.title }} />
                );
            });
        }

        return null;
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
