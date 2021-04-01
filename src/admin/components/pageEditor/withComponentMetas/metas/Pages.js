export const props = [{
    _id: 'folder',
    title: 'Папка',
    type: 'source-select',
    source: 'page-folders'
}, {
    _id: 'paddingBottom',
    title: 'Нижний отступ',
    type: 'theme-param',
    typeId: 'padding-bottom'
}, {
    _id: 'paddingTop',
    title: 'Верхний отступ',
    type: 'theme-param',
    typeId: 'padding-top'
}, {
    _id: 'sort',
    title: 'Сортировка',
    type: 'string'
}, {
    _id: 'filter',
    title: 'Фильтр',
    type: 'string'
}, {
    _id: 'maxCount',
    title: 'Максимальное количество элементов',
    type: 'integer number'
}];
export const name = 'Список страниц';
export const key = 'Pages';
export const defaultProps = {
    paddingBottom: 'm',
    paddingTop: 'm'
};
