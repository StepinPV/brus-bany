const monthA = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

module.exports = function(date) {
    return `${date.getDate()} ${monthA[date.getMonth()]} ${date.getFullYear()}`;
}
