import { props as containerProps, defaultProps as defaultContainerProps } from './Container';

// custom
export const props = [...containerProps];
export const name = 'Блок контактов';
export const key = 'Contacts';
export const defaultProps = {
    ...defaultContainerProps
};
