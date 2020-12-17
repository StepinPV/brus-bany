export function getColor(props, field='color') {
    let color = props.styles[field];

    if (color) {
        if (color[0] === '{') {
            color = JSON.parse(color);
            if (color.type === 'base') {
                color = props.theme.colors[color.value].v;
            } else {
                color = color.value;
            }
        } else {
            color = props.theme.colors[color].v;
        }
    }

    return color || '';
}

// TODO Удалить после перехода на node 15
function replaceAll(find, replace, str) {
    find = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return str.replace(new RegExp(find, 'g'), replace);
}

export function applyFields(fields, text) {
    return fields ? Object.keys(fields).reduce((text, fieldId) => {
        return replaceAll(`{{${fieldId}}}`, fields[fieldId] || '', text);
    }, text) : text;
}
