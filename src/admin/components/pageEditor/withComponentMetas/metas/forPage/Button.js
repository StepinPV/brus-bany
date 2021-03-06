import { props as containerProps, defaultProps as defaultContainerProps } from './Container';

export const props = [{
    _id: 'caption',
    title: 'Текст',
    type: 'text',
    props: {
        withoutEditor: true
    }
}, {
    _id: 'href',
    title: 'Ссылка',
    type: 'string'
}, {
    _id: 'size',
    title: 'Размер',
    type: 'select',
    items: [{
        id: 's',
        title: 'Маленькая'
    }, {
        id: 'm',
        title: 'Средняя'
    }]
}, {
    _id: 'color',
    title: 'Цвет текста',
    type: 'color-select'
}, {
    _id: 'background',
    title: 'Цвет кнопки',
    type: 'color-select'
}, {
    _id: 'align',
    title: 'Выравнивание',
    type: 'select',
    items: [{
        id: 'left',
        title: 'По левому краю'
    }, {
        id: 'center',
        title: 'По центру'
    }, {
        id: 'right',
        title: 'По правому краю'
    }]
}, {
    _id: 'containerWidth',
    title: 'Ширина блока',
    type: 'theme-param',
    typeId: 'max-width'
}, {
    _id: 'fullWidth',
    title: 'Растянуть кнопку',
    type: 'boolean'
}, {
    _id: 'download',
    title: 'Кнопка для скачивания файла',
    type: 'boolean'
}, {
    _id: 'targetBlank',
    title: 'Открыть в новой вкладке',
    type: 'boolean'
}, {
    _id: 'noOpener',
    title: 'Закрыть от индексации цель, на которую ведет ссылка',
    type: 'boolean'
}, ...containerProps];

export const name = 'Кнопка';
export const key = 'Button';
export const defaultProps = {
    ...defaultContainerProps,
    caption: 'Кнопка',
    size: 'm',
    align: 'center',
    color: 'white',
    background: 'black',
    href: '/',
    containerWidth: 'm',
    fullWidth: false,
    download: false,
    targetBlank: false,
    noOpener: false
};
