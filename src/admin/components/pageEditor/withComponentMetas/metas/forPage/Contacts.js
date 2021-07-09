import { props as containerProps, defaultProps as defaultContainerProps } from './Container';

export const props = [...containerProps, {
    _id: 'map',
    title: 'Карта',
    type: 'object',
    format: [{
        _id: 'title',
        title: 'Подсказка',
        type: 'string'
    }, {
        _id: 'link',
        title: 'Ссылка на карту',
        type: 'string'
    }]
}, {
    _id: 'info',
    title: 'Информация',
    type: 'text'
}, {
    _id: 'button',
    title: 'Кнопка',
    type: 'object',
    format: [{
        _id: 'caption',
        title: 'Текст',
        type: 'string'
    }, {
        _id: 'link',
        title: 'Ссылка',
        type: 'string'
    }, {
        _id: 'color',
        title: 'Цвет текста',
        type: 'color-select'
    }, {
        _id: 'background',
        title: 'Цвет фона',
        type: 'color-select'
    },]
}, {
    _id: 'socialNetworks',
    title: 'Социальные сети',
    type: 'object',
    format: [{
        _id: 'vk',
        title: 'ВК',
        type: 'string'
    }, {
        _id: 'fb',
        title: 'Facebook',
        type: 'string'
    }, {
        _id: 'ok',
        title: 'Одноклассники',
        type: 'string'
    }, {
        _id: 'inst',
        title: 'Instagram',
        type: 'string'
    }, {
        _id: 'youtube',
        title: 'Youtube',
        type: 'string'
    }]
}];
export const name = 'Блок контактов';
export const key = 'Contacts';
export const defaultProps = {
    ...defaultContainerProps
};
