import { props as containerProps, defaultProps as defaultContainerProps } from './Container';

export const props = [{
    _id: 'folder',
    title: 'Папка',
    type: 'source-select',
    source: 'page-folders'
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
}, ...containerProps];
export const name = 'Список страниц';
export const key = 'Pages';
export const defaultProps = {
    ...defaultContainerProps
};
