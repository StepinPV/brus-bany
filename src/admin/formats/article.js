const listFormat = [{
    _id: 'caption',
    title: 'Заголовок',
    type: 'string'
}, {
    _id: 'text',
    title: 'Текст',
    type: 'text-simple'
}, {
    _id: 'image',
    title: 'Изображение',
    type: 'image',
    props: {
        withoutLogo: true,
    }
}, {
    _id: 'imageAlt',
    title: 'Alt изображения',
    type: 'string'
}, {
    _id: 'imageDescription',
    title: 'Подпись к изображению',
    type: 'string'
}];

export default [{
    _id: 'name',
    title: 'Название',
    type: 'string',
    required: true
}, {
    _id: 'description',
    title: 'Описание',
    type: 'text-simple',
    required: true
}, {
    _id: 'firstImage',
    title: 'Изображение под описанием',
    type: 'image',
    props: {
        withoutLogo: true,
    },
    required: true
}, {
    _id: 'firstImageAlt',
    title: 'Alt для изображения',
    type: 'string',
    required: true
}, {
    _id: 'firstImageDescription',
    title: 'Подпись к изображению',
    type: 'string'
}, {
    _id: 'image',
    title: 'Изображение для обложки',
    type: 'image',
    props: {
        withoutLogo: true,
        width: 600
    }
}, {
    _id: 'imageAlt',
    title: 'Alt для изображения',
    type: 'string'
}, {
    _id: 'imageDescription',
    title: 'Описание для обложки',
    type: 'text-simple'
}, {
    _id: 'content',
    title: 'Блоки',
    type: 'array',
    itemTitleField: 'caption',
    format: [{
        _id: 'caption',
        title: 'Заголовок',
        type: 'string'
    }, {
        _id: 'content',
        title: 'Элементы',
        type: 'array',
        format: [{
            _id: 'item',
            title: 'Тип',
            type: 'oneOf',
            variants: [{
                id: 'text',
                typeTitle: 'Текстовый блок',
                title: 'Текстовый блок',
                type: 'text-simple'
            }, {
                id: 'image',
                typeTitle: 'Изображение',
                title: 'Изображение',
                type: 'object',
                format: [{
                    _id: 'image',
                    title: 'Ресурс',
                    type: 'image',
                    props: {
                        withoutLogo: true,
                    }
                }, {
                    _id: 'alt',
                    title: 'Alt для изображения',
                    type: 'string'
                }, {
                    _id: 'description',
                    title: 'Подпись к изображению',
                    type: 'string'
                }]
            }, {
                id: 'numeric-list',
                typeTitle: 'Нумерованный список',
                title: 'Элементы списка',
                type: 'array',
                format: listFormat
            }, {
                id: 'marker-list',
                typeTitle: 'Маркерованный список',
                title: 'Элементы списка',
                type: 'array',
                format: listFormat
            }]
        }]
    }]
}];
