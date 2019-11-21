import article from './article';

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
    _id: 'filters',
    title: 'Фильтр',
    type: 'array',
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
    }]
}, {
    _id: 'article',
    title: 'Статья',
    type: 'object',
    format: article
}, {
    _id: 'additions',
    title: 'Дополнения',
    type: 'array',
    format: [{
        _id: 'name',
        title: 'Имя группы',
        type: 'string',
        required: true
    }, {
        _id: 'value',
        title: 'Дополнение',
        type: 'array',
        required: true,
        format: [{
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
            _id: 'name',
            title: 'Наименование',
            type: 'string',
            required: true
        }, {
            _id: 'price',
            title: 'Формула цены',
            type: 'string',
            required: true
        }]
    }]
}, {
    _id: 'projectBlocks',
    title: 'Блок дополнений к цене проекта',
    type: 'array',
    format: [{
        _id: 'id',
        title: 'ИД блока',
        type: 'string',
        required: true
    }, {
        _id: 'order',
        title: 'Порядок',
        type: 'integer number',
        required: true
    }, {
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
        _id: 'useInBuildingPrice',
        title: 'Цена учавствует в вычислениии стоимости строительства',
        type: 'boolean'
    }, {
        _id: 'required',
        title: 'Обязательное для выбора',
        type: 'boolean'
    }, {
        _id: 'defaultItemId',
        title: 'ID записи выбранной по умолчанию',
        type: 'string'
    }, {
        _id: 'items',
        title: 'Карточка',
        type: 'array',
        format: [{
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
            _id: 'order',
            title: 'Порядок',
            type: 'integer number',
            required: true
        }, {
            _id: 'image',
            title: 'Изображение',
            type: 'image'
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
            title: 'Тип',
            type: 'oneOf',
            variants: [{
                id: 'layout_fix',
                typeTitle: 'Общая цена в зависимости от планировки',
                title: 'Формула',
                type: 'text'
            }, {
                id: 'material_fix',
                typeTitle: 'Цена в зависимости от материала (указывается позже)'
            }, {
                id: 'fix',
                typeTitle: 'Фиксированная цена',
                type: 'integer number'
            }]
        }]
    }]
}];
