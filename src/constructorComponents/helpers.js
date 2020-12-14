export function getColor(props, field='color') {
    let color = props.styles[field];

    if (color) {
        if (color[0] === '{') {
            color = JSON.parse(color);
            if (color.type === 'base') {
                color = props.theme.colors[color.value];
            } else {
                color = color.value;
            }
        } else {
            color = props.theme.colors[color];
        }
    }

    return color || '';
}

export function applyFields(fields, text) {
    return fields ? Object.keys(fields).reduce((text, fieldId) => {
        return text.replaceAll(`{{${fieldId}}}`, fields[fieldId] || '');
    }, text) : text;
}
