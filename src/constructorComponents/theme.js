const theme = {
    colors: {
        'white': { n: 'Белый', v: '#fff' },
        'black': { n: 'Черный', v: '#000' },
        'red': { n: 'Красный', v: '#91001d' },
        'yellow': { n: 'Желтый', v: '#ffe100' },
        'grey': { n: 'Серый', v: '#efefef' },
    },
    'max-width': {
        s: { n: 'Маленькая', v: '728px' },
        m: { n: 'Средняя', v: '1200px' },
        l: { n: 'На всю ширину', v: '100%' }
    },
    'padding-top': {
        s: { n: 'Маленький', v: '16px' },
        m: { n: 'Средний', v: '32px' },
        l: { n: 'Большой', v: '48px' }
    },
    'padding-bottom': {
        s: { n: 'Маленький', v: '16px' },
        m: { n: 'Средний', v: '32px' },
        l: { n: 'Большой', v: '48px' }
    },
    'caption': {
        'font-size': {
            s: {
                n: 'Маленький',
                v: {
                    'standard': '26px',
                    '640': '22px',
                    '400': '16px',
                    '350': '14px'
                }
            },
            m: {
                n: 'Средний',
                v: {
                    'standard': '42px',
                    '640': '30px',
                    '400': '24px',
                    '350': '22px'
                }
            },
            l: {
                n: 'Большой',
                v: {
                    'standard': '52px',
                    '640': '38px',
                    '400': '32px',
                    '350': '28px'
                }
            }
        }
    },
    'text': {
        'font-size': {
            s: {
                n: 'Маленький',
                v: {
                    'standard': '15px',
                    '640': '13px',
                    '400': '12px',
                    '350': '12px'
                }
            },
            m: {
                n: 'Средний',
                v: {
                    'standard': '19px',
                    '640': '20px',
                    '400': '14px',
                    '350': '14px'
                }
            },
            l: {
                n: 'Большой',
                v: {
                    'standard': '24px',
                    '640': '38px',
                    '400': '16px',
                    '350': '16px'
                }
            }
        },
        'line-height': {
            s: {
                n: 'Маленький',
                v: {
                    'standard': '20px',
                    '640': '16px',
                    '400': '16px',
                    '350': '16px'
                }
            },
            m: {
                n: 'Средний',
                v: {
                    'standard': '24px',
                    '640': '18px',
                    '400': '18px',
                    '350': '18px'
                }
            },
            l: {
                n: 'Большой',
                v: {
                    'standard': '30px',
                    '640': '20px',
                    '400': '20px',
                    '350': '20px'
                }
            }
        }
    }
};

export default {
    colors: colors
};

export function getTheme() {
    return theme;
}
