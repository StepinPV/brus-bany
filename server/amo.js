const request = require('request');
const logger = require('../utils/logger');
const { get: getSettings } = require('./settings');

module.exports.send = async ({ name, phone, source }, host, utmParams) => {
    const settings = await getSettings();

    if (!(settings.amo && settings.amo.name && settings.amo.login && settings.amo.apiKey)) {
        return;
    }

    // Временная защита от спама
    if (!host) {
        return;
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

    request.post('https://' + settings.amo.name + '.amocrm.ru/api/v2/incoming_leads/form?login=' + settings.amo.login + '&api_key=' + settings.amo.apiKey + '&', amoDataJson, function (error) {
        if (error) {
            logger.error(`Amo sending error: ${error}`);
        }
    });
};
