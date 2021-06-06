// TODO Удалить после перехода на node 15
module.exports = function replaceAll(find, replace, str) {
    find = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return str ? str.replace(new RegExp(find, 'g'), replace) : str;
}
