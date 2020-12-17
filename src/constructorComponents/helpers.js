import replaceAll from '@utils/replaceAll';

export function applyFields(fields, text) {
    return fields ? Object.keys(fields).reduce((text, fieldId) => {
        return replaceAll(`{{${fieldId}}}`, fields[fieldId] || '', text);
    }, text) : text;
}
