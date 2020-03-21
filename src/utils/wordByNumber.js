/**
 * Функция возвращает слово в зависимости от числа
 * @param {number} number
 * @param {string} word1
 * @param {string} word2
 * @param {string} word3
 * @returns {string}
 */
export default function(number, word1, word2, word3) {
    const tens = number % 100;
    const ones = tens % 10;
    if (ones === 0 || ones >= 5 || tens > 10 && tens < 20) {
        return word3 || word2 || word1;
    }
    if (ones > 1 && ones < 5) {
        return word2 || word1;
    }

    return word1;
}
