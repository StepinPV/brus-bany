export default [{
    _id: 'name',
    title: 'Имя',
    type: 'string',
    required: true
}, {
    _id: 'folder',
    title: 'Папка',
    type: 'source-select',
    source: 'page-folders'
}, templateFields];
