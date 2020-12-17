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

const values = {
    'max-width': { s: '728px', m: '1200px', l: '100%' },
    'padding-top': { s: '16px', m: '32px', l: '48px' },
    'padding-bottom': { s: '16px', m: '32px', l: '48px' },
    'caption': {
        'font-size': {
            'standard': { s: '26px', m: '42px', l: '52px' },
            '640': { s: '22px', m: '30px', l: '38px' },
            '400': { s: '16px', m: '24px', l: '32px' },
            '350': { s: '14px', m: '22px', l: '28px' }
        }
    },
    'text': {
        'font-size': {
            'standard': { s: '15px', m: '19px', l: '24px' },
            '640': { s: '13px', m: '16px', l: '20px' },
            '400': { s: '12px', m: '14px', l: '16px' },
            '350': { s: '12px', m: '14px', l: '16px' }
        },
        'line-height': {
            'standard': { s: '20px', m: '24px', l: '30px' },
            '640': { s: '16px', m: '18px', l: '20px' },
            '400': { s: '16px', m: '18px', l: '20px' },
            '350': { s: '16px', m: '18px', l: '20px' }
        }
    }
};

export default {
    colors: colors
};

export function getTheme() {
    const theme = { ...values };

    colors.forEach(({ id, value }) => {
        theme.colors = theme.colors || {};
        theme.colors[id] = value;
    });

    return theme;
}
