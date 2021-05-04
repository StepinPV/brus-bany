// custom
const projectBlockItemFormat = [{
    _id: 'id',
    title: 'Идентификатор',
    type: 'string',
    required: true
}, {
    _id: 'title',
    title: 'Название',
    type: 'string',
    required: true
}, {
    _id: 'name',
    title: 'Название 2',
    type: 'string',
    required: true
}, {
    _id: 'price',
    title: 'Цена',
    type: 'string'
}, {
    _id: 'description',
    title: 'Описание',
    type: 'text-simple'
}, {
    _id: 'image',
    title: 'Изображение',
    type: 'image',
    props: {
        withoutLogo: true,
        width: 600,
        globalStore: true
    }
}, {
    _id: 'imageAlt',
    title: 'Alt изображения',
    type: 'string',
    required: true
}];

const complectationBlocksFormat = [{
    _id: 'name',
    title: 'Название',
    type: 'string',
    required: true
}, {
    _id: 'description',
    title: 'Описание',
    type: 'text-simple'
}, {
    _id: 'itemTitle',
    title: 'Имя сущности',
    type: 'string',
    required: true
}, {
    _id: 'defaultItemId',
    title: 'ID записи выбранной по умолчанию',
    type: 'string'
}, {
    _id: 'items',
    title: 'Карточки',
    type: 'array',
    itemTitleField: 'name',
    format: projectBlockItemFormat
}];

const projectBlocksFormat = [{
    _id: 'id',
    title: 'Идентификатор',
    type: 'string',
    required: true
}, {
    _id: 'name',
    title: 'Название',
    type: 'string',
    required: true
}, {
    _id: 'itemTitle',
    title: 'Имя сущности',
    type: 'string',
    required: true
}, {
    _id: 'description',
    title: 'Описание',
    type: 'text-simple'
}, {
    _id: 'items',
    title: 'Карточки',
    itemTitleField: 'name',
    type: 'array',
    format: projectBlockItemFormat
}];

const baseEquipment = {
    _id: 'baseEquipment',
    title: 'Комплектация',
    itemTitleField: 'name',
    copy: true,
    type: 'array',
    format: [{
        _id: 'name',
        title: 'Имя группы',
        type: 'string',
        required: true
    }, {
        _id: 'condition',
        title: 'Условие показа',
        type: 'text-simple',
        required: true
    }, {
        _id: 'value',
        title: 'Элементы',
        type: 'array',
        itemTitleField: 'name',
        required: true,
        format: [{
            _id: 'name',
            title: 'Наименование',
            type: 'string'
        }, {
            _id: 'condition',
            title: 'Условие показа',
            type: 'text-simple',
            required: true
        }, {
            _id: 'value',
            title: 'Тип',
            type: 'oneOf',
            variants: [{
                id: 'base',
                typeTitle: 'Стандартный элемент',
                title: 'Наименование',
                type: 'text-simple'
            }, {
                id: 'select',
                typeTitle: 'Элемент с возможностью выбора',
                title: 'Элементы',
                itemTitleField: 'name',
                type: 'array',
                format: [{
                    _id: 'name',
                    title: 'Наименование',
                    type: 'string'
                }, {
                    _id: 'price',
                    title: 'Формула цены',
                    type: 'text-simple'
                }, {
                    _id: 'default',
                    title: 'Выбрано по умолчанию',
                    type: 'boolean'
                }, {
                    _id: 'condition',
                    title: 'Условие показа',
                    type: 'text-simple',
                    required: true
                }]
            }, {
                id: 'number',
                typeTitle: 'Элемент счетчик',
                title: 'Данные',
                type: 'object',
                format: [{
                    _id: 'name',
                    title: 'Наименование',
                    type: 'string'
                }, {
                    _id: 'default',
                    title: 'Значение',
                    type: 'string'
                }, {
                    _id: 'price',
                    title: 'Формула цены',
                    type: 'text-simple'
                }]
            }, {
                id: 'list',
                typeTitle: 'Список',
                title: 'Список',
                type: 'object',
                format: [{
                    _id: 'source',
                    title: 'Источник списка',
                    type: 'string'
                }, {
                    _id: 'default',
                    title: 'Значение по умолчанию',
                    type: 'string'
                }, {
                    _id: 'values',
                    title: 'Значения и цены',
                    type: 'array',
                    format: [{
                        _id: 'value',
                        title: 'Значение',
                        type: 'string'
                    }, {
                        _id: 'price',
                        title: 'Формула цены',
                        type: 'string'
                    }]
                }]
            }]
        }]
    }]
};

const additions = {
    _id: 'additions',
    title: 'Дополнения',
    itemTitleField: 'name',
    type: 'array',
    format: [{
        _id: 'name',
        title: 'Наименование',
        type: 'string',
        required: true
    }, {
        _id: 'type',
        title: 'Тип',
        type: 'select',
        items: [{
            id: 'boolean',
            title: 'Еденичный'
        }, {
            id: 'count',
            title: 'Множественный'
        }]
    }, {
        _id: 'price',
        title: 'Формула цены',
        type: 'text-simple',
        required: true
    }]
};

export const props = [{
    _id: 'complectationBlocks',
    title: 'Описание комплектаций',
    type: 'object',
    format: complectationBlocksFormat
}, {
    _id: 'projectBlocks',
    title: 'Дополнительные блоки',
    itemTitleField: 'name',
    type: 'array',
    format: projectBlocksFormat
}, baseEquipment, {
    _id: 'deliveryData',
    title: 'Информация о доставке',
    type: 'object',
    format: [{
        _id: 'delivery',
        title: 'Формула стоимости доставки',
        type: 'string'
    }]
}, additions, {
    _id: 'cpSettings',
    title: 'Настройки кп/договора',
    type: 'object',
    format: [{
        _id: 'type',
        title: 'Тип договора',
        type: 'select',
        items: [{
            id: '0',
            title: 'Разборный объект'
        }, {
            id: '1',
            title: 'Готовый объект'
        }]
    }, {
        _id: 'pravila',
        title: 'Правила эксплуатации бани',
        type: 'boolean'
    }, {
        _id: 'product-dogovor-name',
        title: 'Название продукта в договоре (Брусовое сооружение из хвойных пород 6х6)',
        type: 'string'
    }, {
        _id: 'product-cp-name',
        title: 'Название продукта в кп (Баня из бруса 6х6 "Алексин")',
        type: 'string'
    }, {
        _id: 'mainImage',
        title: 'Титульное изображение',
        type: 'image',
        props: {
            withoutLogo: true,
            width: 800,
            globalStore: true
        }
    }, {
        _id: 'schemeImage',
        title: 'Изображение схемы',
        type: 'image',
        props: {
            withoutLogo: true,
            width: 800,
            globalStore: true
        }
    }]
}];
export const name = 'Калькулятор бани/дома';
export const key = 'Calculator';
export const defaultProps = {
};
