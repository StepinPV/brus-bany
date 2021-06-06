const renderDate = require('./renderDate');
const replaceAll = require('./replaceAll');

function applyImages(fields, images, src) {
    while(/^\d+$/g.test(src)) {
        src = images[src];

        if (/{{(.*?)}}/g.test(src)) {
            src = applyFields(fields, src, images);
        }
    }

    return src;
}

function applyFields(fields, text, images) {
    let res = fields ? Object.keys(fields).reduce((text, fieldId) => {
        let value;
        switch(fields[fieldId].type) {
            case 'date':
                value = fields[fieldId].value ? renderDate(new Date(fields[fieldId].value)) : '';
                break;
            case 'boolean':
                value = fields[fieldId].value || false;
                break;
            case 'float number':
                value = fields[fieldId].value || 0;
                break;
            case 'image':
                value = applyImages(fields, images, fields[fieldId].value);
                break;
            default:
                value = fields[fieldId].value || '';
        }

        return replaceAll(`{{${fieldId}}}`, value, text);
    }, text) : text;

    return res ? res.toString().replace(/{{(.*?)}}/g, '') : res;
}

module.exports = applyFields;
