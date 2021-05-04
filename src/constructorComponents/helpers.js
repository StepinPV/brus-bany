import replaceAll from '@utils/replaceAll';
import renderDate from '@utils/RenderDate';

const fieldRegexp = /{{(.*?)}}/g;

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

    return res ? res.toString().replace(fieldRegexp, '') : res;
}

export function applyImages(fields, images, src) {
    while(/^\d+$/g.test(src)) {
        src = images[src];

        if (fieldRegexp.test(src)) {
            src = applyFields(fields, src);
        }
    }

    return src;
}
