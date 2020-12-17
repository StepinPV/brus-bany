// TODO Удалить после перехода на node 15
export default function replaceAll(find, replace, str) {
    find = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return str.replace(new RegExp(find, 'g'), replace);
}
