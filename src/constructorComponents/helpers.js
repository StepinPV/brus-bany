import replaceAll from '@utils/replaceAll';
import renderDate from '@utils/RenderDate';

export function applyFields(fields, text) {
    return fields ? Object.keys(fields).reduce((text, fieldId) => {
        let value;

        switch(fields[fieldId].type) {
            case 'date':
                value = fields[fieldId].value ? renderDate(new Date(fields[fieldId].value)) : '';
                break;
            default:
                value = fields[fieldId].value || '';
        }

        return replaceAll(`{{${fieldId}}}`, value, text);
    }, text) : text;
}
