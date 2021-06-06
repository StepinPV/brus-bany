import { props as containerProps, defaultProps as defaultContainerProps } from './Container';

// custom
export const props = [{
    _id: 'background',
    title: 'Цвет блока',
    type: 'color-select'
}, {
    _id: 'image',
    title: 'Изображение',
    type: 'image',
    props: {
        withoutLogo: true,
        width: 580
    }
}, ...containerProps];
export const name = 'Блок с изображением и формой';
export const key = 'FormBlock';
export const defaultProps = {
    ...defaultContainerProps
};
