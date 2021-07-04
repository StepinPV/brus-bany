export default [{
    _id: 'favicon',
    title: 'Favicon (ICO)',
    type: 'image',
    props: {
        allowedTypes: ['image/vnd.microsoft.icon', 'image/x-icon']
    }
}, {
    _id: 'logo152x152',
    title: 'Icon 152x152 (PNG)',
    type: 'image',
    props: {
        allowedTypes: ['image/png'],
        withoutLogo: true,
        withoutCompression: true
    }
}, {
    _id: 'domain',
    title: 'Домен (https://my-site.ru)',
    type: 'string',
    required: true
}, {
    _id: 'not-found-page-id',
    title: 'ID 404 Страницы',
    type: 'string'
}, {
    _id: 'whatsAppWidget',
    title: 'WhatsApp виджет',
    type: 'object',
    format: [{
        _id: 'phone',
        title: 'Номер в формат (89999999999)',
        type: 'string',
    }]
}, {
    _id: 'code',
    title: 'Дополнительный код',
    type: 'object',
    format: [{
        _id: 'head',
        title: 'Код в head',
        type: 'text-simple'
    }, {
        _id: 'body',
        title: 'Код в body',
        type: 'text-simple'
    }]
},{
    _id: 'theme',
    title: 'Настройки темы',
    type: 'text-simple'
}, {
    _id: 'redirects',
    title: '303 Редиректы',
    type: 'array',
    format: [{
        _id: 'from',
        title: 'Откуда (Относительный URL)',
        type: 'string'
    }, {
        _id: 'to',
        title: 'Куда (Относительный URL)',
        type: 'string'
    }]
}];
