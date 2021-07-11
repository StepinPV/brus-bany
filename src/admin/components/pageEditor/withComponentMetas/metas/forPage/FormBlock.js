import { props as containerProps, defaultProps as defaultContainerProps } from './Container';
import { props as formProps } from './Form';

// custom
export const props = [{
    _id: 'title',
    title: 'Заголовок',
    type: 'string'
}, {
    _id: 'titleColor',
    title: 'Цвет заголовка',
    type: 'color-select'
}, {
    _id: 'description',
    title: 'Текст',
    type: 'string'
}, {
    _id: 'descriptionColor',
    title: 'Цвет текста',
    type: 'color-select'
}, {
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
}, {
    _id: 'imageAlt',
    title: 'Alt изображения',
    type: 'string'
}, ...formProps, ...containerProps];
export const name = 'Блок с изображением и формой';
export const key = 'FormBlock';
export const defaultProps = {
    ...defaultContainerProps
};
