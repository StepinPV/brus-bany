export const props = [{
    _id: 'caption',
    title: 'Текст',
    type: 'string'
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
    title: 'Цвет',
    type: 'select',
    items: [{
        id: 'red',
        title: 'Красный'
    }, {
        id: 'yellow',
        title: 'Желтый'
    }]
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
}, {
    _id: 'containerWidth',
    title: 'Ширина блока',
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
}, {
    _id: 'id',
    title: 'Якорь',
    type: 'string'
}];

export const name = 'Кнопка';
export const key = 'Button';
export const defaultProps = {
    caption: 'Кнопка',
    size: 'm',
    align: 'center',
    color: 'red',
    href: '/',
    paddingBottom: 'm',
    paddingTop: 'm',
    containerWidth: 'm',
    fullWidth: false,
    download: false,
    targetBlank: false,
    noOpener: false
};
