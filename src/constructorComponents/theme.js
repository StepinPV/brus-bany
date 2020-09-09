const colors = [{
    id: 'white',
    value: '#fff',
    name: 'Белый'
}, {
    id: 'black',
    value: '#000',
    name: 'Черный'
}, {
    id: 'red',
    value: '#91001d',
    name: 'Красный'
}, {
    id: 'yellow',
    value: '#ffe100',
    name: 'Желтый'
}, {
    id: 'grey',
    value: '#efefef',
    name: 'Серый'
}];

export default {
    colors: colors
};

export function getTheme() {
    const theme = {};

    colors.forEach(({ id, value }) => {
        theme.colors = theme.colors || {};
        theme.colors[id] = value;
    });

    return theme;
}
