import article from './article';

let filters = {
    _id: 'filters',
    title: 'Фильтры',
    type: 'array',
    itemTitleField: 'name',
    format: [{
        _id: 'name',
        title: 'Имя группы',
        type: 'string',
        required: true
    }, {
        _id: 'filters',
        title: 'Фильтры',
        type: 'array',
        itemTitleField: 'name',
        format: [{
            _id: 'id',
            title: 'ID',
            type: 'string',
            required: true
        }, {
            _id: 'name',
            title: 'Имя',
            type: 'string',
            required: true
        }, {
            _id: 'condition',
            title: 'Условие',
            type: 'string',
            required: true
        }, {
            _id: 'h1',
            title: 'H1 заголовок',
            type: 'string',
            required: true
        }, {
            _id: 'seo-title',
            title: 'SEO Title',
            type: 'string',
            required: true
        }, {
            _id: 'article',
            title: 'Статья',
            type: 'object',
            format: article
        }]
    }]
};

filters.format[1].format.push(filters);

const additions = {
    _id: 'additions',
    title: 'Дополнения',
    itemTitleField: 'name',
    type: 'array',
    format: [{
        _id: 'name',
        title: 'Имя группы',
        type: 'string',
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
            type: 'text',
            required: true
        }]
    }]
};

const equipment = {
    _id: 'equipment',
    title: 'Базовая комплектация',
    itemTitleField: 'name',
    type: 'array',
    format: [{
        _id: 'name',
        title: 'Имя',
        type: 'string',
        required: true
    }, {
        _id: 'text',
        title: 'Текст',
        type: 'string',
        required: true
    }]
};
const baseEquipment = {
    _id: 'baseEquipment',
    title: 'Комплектация',
    itemTitleField: 'name',
    type: 'array',
    format: [{
        _id: 'name',
        title: 'Имя группы',
        type: 'string',
        required: true
    }, {
        _id: 'condition',
        title: 'Условие показа',
        type: 'text',
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
            type: 'text',
            required: true
        }, {
            _id: 'value',
            title: 'Тип',
            type: 'oneOf',
            variants: [{
                id: 'base',
                typeTitle: 'Стандартный элемент',
                title: 'Наименование',
                type: 'text'
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
                    type: 'text'
                }, {
                    _id: 'default',
                    title: 'Выбрано по умолчанию',
                    type: 'boolean'
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
                    type: 'text'
                }]
            }]
        }]
    }]
};
const newEquipment = {
    _id: 'newEquipment',
    title: 'Новая комплектация',
    itemTitleField: 'name',
    type: 'array',
    format: [{
        _id: 'name',
        title: 'Имя группы',
        type: 'string',
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
            type: 'string',
            required: true
        }]
    }]
};
const complectationBlocks = {
    _id: 'complectationBlocks',
    title: 'Описание комплектаций',
    type: 'object',
    format: [{
        _id: 'name',
        title: 'Название',
        type: 'string',
        required: true
    }, {
        _id: 'itemTitle',
        title: 'Тайтл для карточки',
        type: 'string',
        required: true
    }, {
        _id: 'itemButtonTitle',
        title: 'Тайтл для кнопки',
        type: 'string',
        required: true
    }, {
        _id: 'description',
        title: 'Описание',
        type: 'text'
    }, {
        _id: 'defaultItemId',
        title: 'ID записи выбранной по умолчанию',
        type: 'string'
    }, {
        _id: 'items',
        title: 'Карточки',
        type: 'array',
        itemTitleField: 'name',
        format: [{
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
            title: 'Название',
            type: 'string',
            required: true
        }, {
            _id: 'image',
            title: 'Изображение',
            type: 'image',
            props: {
                withoutLogo: true,
                width: 600
            }
        }, {
            _id: 'description',
            title: 'Описание',
            type: 'text'
        }]
    }]
};
const projectBlocks = {
    _id: 'projectBlocks',
    title: 'Дополнительные блоки',
    itemTitleField: 'name',
    type: 'array',
    format: [{
        _id: 'name',
        title: 'Название',
        type: 'string',
        required: true
    }, {
        _id: 'itemTitle',
        title: 'Тайтл для карточки',
        type: 'string',
        required: true
    }, {
        _id: 'itemButtonTitle',
        title: 'Тайтл для кнопки',
        type: 'string',
        required: true
    }, {
        _id: 'description',
        title: 'Описание',
        type: 'text'
    }, {
        _id: 'items',
        title: 'Карточки',
        itemTitleField: 'name',
        type: 'array',
        format: [{
            _id: 'title',
            title: 'Название',
            type: 'string',
            required: true
        }, {
            _id: 'name',
            title: 'Название',
            type: 'string',
            required: true
        }, {
            _id: 'image',
            title: 'Изображение',
            type: 'image',
            props: {
                withoutLogo: true,
                width: 600
            }
        }, {
            _id: 'description',
            title: 'Описание',
            type: 'text'
        }, {
            _id: 'condition',
            title: 'Формула показа блока',
            type: 'string'
        }, {
            _id: 'price',
            title: 'Формула цены',
            type: 'string'
        }]
    }]
};

export default [{
    _id: 'translateName',
    title: 'Введите имя на английском',
    type: 'string',
    required: true
}, {
    _id: 'name',
    title: 'Введите имя для шаблона (<<Бани из бруса>> | проекты и цены)',
    type: 'string',
    required: true
}, {
    _id: 'name2',
    title: 'Введите имя для шаблона (<<Баня из бруса>> Алексин)',
    type: 'string',
    required: true
}, {
    _id: 'name3',
    title: 'Введите имя для шаблона (Фотографии готовых <<бань из бруса>>)',
    type: 'string',
    required: true
}, {
    _id: 'name4',
    title: 'Введите имя для шаблона (Заказать <<баню из бруса>>)',
    type: 'string',
    required: true
}, {
    _id: 'name5',
    title: 'Введите имя для шаблона (Проект <<бани из бруса>>)',
    type: 'string',
    required: true
}, {
    _id: 'h1',
    title: 'H1 заголовок',
    type: 'string',
    required: true
}, {
    _id: 'seo-title',
    title: 'SEO Title',
    type: 'string',
    required: true
}, ...[filters], {
    _id: 'article',
    title: 'Статья',
    type: 'object',
    format: article
}, baseEquipment, equipment, newEquipment, complectationBlocks, projectBlocks, additions, {
    _id: 'deliveryData',
    title: 'Информация о доставке',
    type: 'object',
    format: [{
        _id: 'delivery',
        title: 'Формула стоимости доставки',
        type: 'string'
    }, additions]
}];
