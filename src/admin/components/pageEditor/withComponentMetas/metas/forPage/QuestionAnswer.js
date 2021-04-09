import { props as containerProps, defaultProps as defaultContainerProps } from './Container';

export const props = [{
    _id: 'items',
    title: 'Данные',
    type: 'array',
    itemTitleField: 'name',
    format: [{
        _id: 'name',
        title: 'Имя группы',
        type: 'string'
    }, {
        _id: 'items',
        title: 'Вопросы и ответы',
        type: 'array',
        itemTitleField: 'question',
        format: [{
            _id: 'question',
            title: 'Вопрос',
            type: 'text'
        }, {
            _id: 'answer',
            title: 'Ответ',
            type: 'text'
        }]
    }]
}, {
    _id: 'width',
    title: 'Ширина',
    type: 'theme-param',
    typeId: 'max-width'
}, ...containerProps];

export const name = 'Вопрос-Ответ';
export const key = 'QuestionAnswer';
export const defaultProps = {
    ...defaultContainerProps,
    width: 's',
    items: [{
        name: 'Группа 1',
        items: [{
            question: 'Вопрос 1',
            answer: 'Ответ 1'
        }, {
            question: 'Вопрос 2',
            answer: 'Ответ 2'
        }]
    }, {
        name: 'Группа 2',
        items: [{
            question: 'Вопрос 1',
            answer: 'Ответ 1'
        }, {
            question: 'Вопрос 2',
            answer: 'Ответ 2'
        }]
    }]
};
