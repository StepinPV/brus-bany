import { props as containerProps, defaultProps as defaultContainerProps } from './Container';

export const props = [{
    _id: 'firstButton',
    title: 'Текст первой кнопки',
    type: 'text',
    props: {
        withoutEditor: true
    }
}, {
    _id: 'firstButtonColor',
    title: 'Цвет текста первой кнопки',
    type: 'color-select'
}, {
    _id: 'firstButtonBg',
    title: 'Цвет первой кнопки',
    type: 'color-select'
}, {
    _id: 'secondButton',
    title: 'Текст второй кнопки',
    type: 'text',
    props: {
        withoutEditor: true
    }
}, ...containerProps];

export const name = 'Две кнопки';
export const key = 'Buttons';
export const defaultProps = {
    ...defaultContainerProps,
    firstButton: 'Кнопка1',
    secondButton: 'Кнопка2'
};
