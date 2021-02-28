import replaceAll from '@utils/replaceAll';
import renderDate from '@utils/RenderDate';

export function applyFields(fields, text) {
    let res = fields ? Object.keys(fields).reduce((text, fieldId) => {
        let value;
        switch(fields[fieldId].type) {
            case 'date':
                value = fields[fieldId].value ? renderDate(new Date(fields[fieldId].value)) : '';
                break;
            case 'boolean':
                value = fields[fieldId].value || false;
                break;
            default:
                value = fields[fieldId].value || '';
        }

        return replaceAll(`{{${fieldId}}}`, value, text);
    }, text) : text;

    return res ? res.replace(/{{(.*?)}}/g, '') : res;
}
