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
    type: 'select',
    items: [{
        id: 'l',
        title: 'На всю ширину'
    }, {
        id: 'm',
        title: 'Среднаяя'
    }, {
        id: 's',
        title: 'Маленькая'
    }]
}, {
    _id: 'paddingBottom',
    title: 'Нижний отступ',
    type: 'select',
    items: [{
        id: 'none',
        title: 'Без отступа'
    }, {
        id: 's',
        title: 'Маленький'
    }, {
        id: 'm',
        title: 'Средний'
    }, {
        id: 'l',
        title: 'Большой'
    }]
}, {
    _id: 'paddingTop',
    title: 'Верхний отступ',
    type: 'select',
    items: [{
        id: 'none',
        title: 'Без отступа'
    }, {
        id: 's',
        title: 'Маленький'
    }, {
        id: 'm',
        title: 'Средний'
    }, {
        id: 'l',
        title: 'Большой'
    }]
}];

export const name = 'Вопрос-Ответ';
export const dependencies = ['Caption', 'Text'];
export const defaultProps = {
    paddingBottom: 'm',
    paddingTop: 'm',
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
