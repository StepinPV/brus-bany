import wordByNumber from './wordByNumber';

const words = [
    [
        '', 'один', 'два', 'три', 'четыре', 'пять', 'шесть',
        'семь', 'восемь', 'девять', 'десять', 'одиннадцать',
        'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать',
        'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'
    ],
    [
        '', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят',
        'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'
    ],
    [
        '', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот',
        'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'
    ]
];

const toFloat = function(number) {
    return parseFloat(number);
};

const parseNumber = function(number, count) {
    let first;
    let second;
    let numeral = '';

    if (number.length === 3) {
        first = number.substr(0, 1);
        number = number.substr(1, 3);
        numeral = '' + words[2][first] + ' ';
    }

    if (number < 20) {
        numeral = numeral + words[0][toFloat(number)] + ' ';
    } else {
        first = number.substr(0, 1);
        second = number.substr(1, 2);
        numeral = numeral + words[1][first] + ' ' + words[0][second] + ' ';
    }

    if (count === 1) {
        if (numeral !== '  ') {
            numeral = numeral + wordByNumber(number, 'тысяча ', 'тысячи ', 'тысяч ');
            numeral = numeral.replace('один ', 'одна ').replace('два ', 'две ');
        }
    } else if (count === 2) {
        if (numeral !== '  ') {
            numeral = numeral + wordByNumber(number, 'миллион ', 'миллиона ', 'миллионов ');
        }
    } else if (count === 3) {
        numeral = numeral + wordByNumber(number, 'миллиард ', 'миллиарда ', 'миллиардов ');
    }

    return numeral;
};

export default function(number) {
    if (!number) {
        return false;
    }

    const type = typeof number;
    if (type !== 'number' && type !== 'string') {
        return false;
    }

    if (type === 'string') {
        number = toFloat(number.replace(',', '.'));

        if (isNaN(number)) {
            return false;
        }
    }

    if (number <= 0) {
        return false;
    }

    number = number.toString();

    let numeral = '';
    let length = number.length - 1;
    let parts = '';
    let count = 0;
    let digit;

    while (length >= 0) {
        digit = number.substr(length, 1);
        parts = digit + parts;

        if ((parts.length === 3 || length === 0) && !isNaN(toFloat(parts))) {
            numeral = parseNumber(parts, count) + numeral;
            parts = '';
            count++;
        }

        length--;
    }

    numeral = numeral.replace(/\s+/g, ' ');

    return numeral;
};
