export default [{
    _id: 'name',
    title: 'Название',
    type: 'string',
    required: true
}, {
    _id: 'description',
    title: 'Описание',
    type: 'text',
    required: true
}, {
    _id: 'firstImage',
    title: 'Изображение под описанием',
    type: 'image',
    withoutLogo: true,
    required: true
}, {
    _id: 'firstImageAlt',
    title: 'Alt для изображения под описанием',
    type: 'string',
    required: true
}, {
    _id: 'image',
    title: 'Изображение для обложки',
    type: 'image',
    withoutLogo: true
}, {
    _id: 'imageAlt',
    title: 'Alt для изображения',
    type: 'string'
}, {
    _id: 'content',
    title: 'Блок',
    type: 'array',
    format: [{
        _id: 'caption',
        title: 'Заголовок',
        type: 'string'
    }, {
        _id: 'content',
        title: 'Элемент',
        type: 'array',
        format: [{
            _id: 'item',
            title: 'Тип',
            type: 'oneOf',
            variants: [{
                id: 'text',
                typeTitle: 'Текстовый блок',
                title: 'Текстовый блок',
                type: 'text'
            }, {
                id: 'image',
                typeTitle: 'Изображение',
                title: 'Изображение',
                type: 'object',
                format: [{
                    _id: 'image',
                    title: 'Ресурс',
                    type: 'image',
                    withoutLogo: true
                }, {
                    _id: 'alt',
                    title: 'Alt для изображения',
                    type: 'string'
                }]
            }, {
                id: 'numeric-list',
                typeTitle: 'Нумерованный список',
                title: 'Элемент списка',
                type: 'array',
                format: [{
                    _id: 'caption',
                    title: 'Заголовок',
                    type: 'string'
                }, {
                    _id: 'text',
                    title: 'Текст',
                    type: 'text'
                }, {
                    _id: 'image',
                    title: 'Изображение',
                    type: 'image',
                    withoutLogo: true
                }, {
                    _id: 'imageAlt',
                    title: 'Alt изображения',
                    type: 'string'
                }]
            }, {
                id: 'marker-list',
                typeTitle: 'Маркерованный список',
                title: 'Элемент списка',
                type: 'array',
                format: [{
                    _id: 'caption',
                    title: 'Заголовок',
                    type: 'string'
                }, {
                    _id: 'text',
                    title: 'Текст',
                    type: 'text'
                }, {
                    _id: 'image',
                    title: 'Изображение',
                    type: 'image',
                    withoutLogo: true
                }, {
                    _id: 'imageAlt',
                    title: 'Alt изображения',
                    type: 'string'
                }]
            }]
        }]
    }]
}];
