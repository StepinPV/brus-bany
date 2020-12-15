export const props = [{
    _id: 'firstButton',
    title: 'Текст первой кнопки',
    type: 'text',
    props: {
        withoutEditor: true
    }
}, {
    _id: 'secondButton',
    title: 'Текст второй кнопки',
    type: 'text',
    props: {
        withoutEditor: true
    }
}];

export const name = 'Кнопки для карточки';
export const key = 'ButtonsForCard';
export const defaultProps = {
    firstButton: 'Кнопка1',
    secondButton: 'Кнопка2'
};
