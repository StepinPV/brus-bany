const request = require('request');

module.exports.send = ({ name, phone, source, data }, host, utmParams) => {
    let message = '';

    function addTitle(title) {
        message += `${title}:\n\n`;
    }

    function addField(id, name, value) {
        message += `${name}: ${value}\n`;
    }

    function addFields(fields) {
        fields.forEach(({ id, name, value }) => addField(id, name, value));
        message += '\n';
    }

    if (data) {
        data = JSON.parse(data);
        data.forEach(elem => {
            switch(elem.type) {
                case 'fields':
                    addTitle(elem.title);
                    addFields(elem.fields);
                    message += `---\n\n`;
                    break;
                default:
                    break;
            }
        });
    }

    const utmData = [];
    if (utmParams) {
        utmParams.forEach(({ name, value }) => {
            switch(name) {
                case 'utm_source':
                    utmData.push({
                        id: 221267,
                        values: [{ value }]
                    });
                    break;
                case 'utm_medium':
                    utmData.push({
                        id: 221269,
                        values: [{ value }]
                    });
                    break;
                case 'utm_content':
                    utmData.push({
                        id: 221277,
                        values: [{ value }]
                    });
                    break;
                case 'utm_campaign':
                    utmData.push({
                        id: 221279,
                        values: [{ value }]
                    });
                    break;
                case 'utm_term':
                    utmData.push({
                        id: 221281,
                        values: [{ value }]
                    });
                    break;
            }
        });
    }



    const amoDataJson = {
        json: {
            add: [
                {
                    source_name: 'Заявка с сайта',
                    created_at: Date.now() / 1000,
                    incoming_entities: {
                        leads: [
                            {
                                name: "Заявка с сайта",
                                custom_fields: [{
                                    id: 187315,
                                    values: [{
                                        value: message
                                    }]
                                }, {
                                    id: 221103,
                                    values: [{
                                        value: host
                                    }]
                                }, ...utmData]
                            }
                        ],
                        contacts: [
                            {
                                name: name,
                                custom_fields: [{
                                    id: 186903,
                                    values: [{
                                        value: phone,
                                        enum: "WORK"
                                    }]
                                }]
                            }
                        ]
                    },
                    incoming_lead_info: {
                        form_id: "1",
                        form_page: 'Заявка с сайта',
                        add_note: 'Заявка с сайта'
                    }
                }
            ]
        }
    }

    request.post('https://' + 'brusbany' + '.amocrm.ru/api/v2/incoming_leads/form?login=' + 'admin@brus-bany.ru' + '&api_key=' + '1dce4c770e2e0bd53e31de4d319eebf32134b276' + '&', amoDataJson, function (error, response, body) {
        console.log('error', error);
    });
};
