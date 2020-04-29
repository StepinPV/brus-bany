const request = require('request');

module.exports.send = ({ name, phone, source, data }, host, utmParams) => {
    let message = '';

    function addTitle(title) {
        message += `${title}:\n\n`;
    }

    function addField(name, value) {
        message += `${name}: ${value}\n`;
    }

    function addFields(fields) {
        fields.forEach(({ name, value }) => addField(name, value));
        message += '\n';
    }

    addTitle('Данные заявки');
    addFields([{
        name: 'Имя',
        value: name
    }, {
        name: 'Номер телефона',
        value: phone
    }, {
        name: 'Ссылка на страницу',
        value: host
    }]);

    message += `---\n\n`;

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

    if (utmParams) {
        addTitle('UTM Параметры');
        addFields(utmParams);
    }

    const custom_fields_data = {
        id: 187315,
        values: [{
            value: message
        }]
    };

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
                                custom_fields: [ custom_fields_data ]
                            }
                        ],
                        contacts: [
                            {
                                name: name
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

    /*const amoDataJson = {
        json: {
            delete: [{
                id: '187309',
                origin: 'origin'
            }]
        }
    }

    request.post('https://' + 'brusbany' + '.amocrm.ru/api/v2/fields?login=' + 'admin@brus-bany.ru' + '&api_key=' + '1dce4c770e2e0bd53e31de4d319eebf32134b276' + '&', amoDataJson, function (error, response, body) {
        console.log('error', error);
    });*/
};
