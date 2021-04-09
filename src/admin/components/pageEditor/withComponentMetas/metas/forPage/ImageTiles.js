import { props as containerProps, defaultProps as defaultContainerProps } from './Container';

// custom
export const props = [{
    _id: 'images',
    title: 'Изображения',
    type: 'array',
    itemTitleField: 'alt',
    format: [{
        _id: 'src',
        title: 'Изображение',
        type: 'image',
        props: {
            withoutLogo: true,
            width: 1200,
            globalStore: true,
            withoutCompression: true
        }
    }, {
        _id: 'alt',
        title: 'Alt изображения',
        type: 'string'
    }]
}, ...containerProps];
export const name = 'Плитка изображений';
export const key = 'ImageTiles';
export const defaultProps = {
    ...defaultContainerProps,
    images: []
};
