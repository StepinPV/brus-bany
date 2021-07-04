const fs = require('fs');
const logger = require('../utils/logger');

const Pages = require('./controllers/Pages');
const Components = require('./controllers/Components');
const Templates = require('./controllers/PageTemplates');
const Settings = require('./controllers/Settings');

module.exports = async function() {
    logger.info(`\nПроцесс чистки изображений для сайта ${process.env.NAME}...`);

    const usedImages = [];

    const addImages = (imagesMap) => {
        Object.keys(imagesMap).forEach(key => {
            if (imagesMap[key]) {
                const image = imagesMap[key].split('/').pop();

                if (/^\d+\.\w+$/.test(image) && !usedImages.includes(image)){
                    usedImages.push(image);
                }
            }
        });
    };

    const { data: pages } = await Pages.getAll();

    for (const page of pages) {
        const config = page.get('config');

        if (config.componentsData) {
            Object.keys(config.componentsData).forEach(key => {
                if (config.componentsData[key].images) {
                    addImages(config.componentsData[key].images);
                }
            });
        }

        if (config['folder-fields']) {
            Object.keys(config['folder-fields']).forEach(key => {
                if (config['folder-fields'][key]['__images__']) {
                    addImages(config['folder-fields'][key]['__images__']);
                }
            });
        }

        if (config['template-fields']) {
            if (config['template-fields']['__images__']) {
                addImages(config['template-fields']['__images__']);
            }
        }
    }

    const { data: components } = await Components.getAll();

    for (const component of components) {
        const config = component.get('config');

        if (config.componentsData) {
            Object.keys(config.componentsData).forEach(key => {
                if (config.componentsData[key].images) {
                    addImages(config.componentsData[key].images);
                }
            });
        }
    }

    const { data: templates } = await Templates.getAll();

    for (const template of templates) {
        const config = template.get('config');

        if (config.componentsData) {
            Object.keys(config.componentsData).forEach(key => {
                if (config.componentsData[key].images) {
                    addImages(config.componentsData[key].images);
                }
            });
        }
    }

    let { data: settings } = await Settings.get('main');

    if (settings) {
        settings = JSON.parse(settings);

        if (settings['__images__']) {
            addImages(settings['__images__']);
        }
    }

    const imagesFolderName = `./sites/${process.env.NAME}/uploads/global`;
    fs.readdir(imagesFolderName, (err, images) => {
        if (images) {
            images.filter(image => {
                if (!usedImages.includes(image)) {
                    fs.unlinkSync(`${imagesFolderName}/${image}`);
                    logger.success(`Изображение ${image} удалено`);
                }
            });
        }

        logger.success(`Процесс чистки изображений для сайта ${process.env.NAME} завершен`);
    });
}
