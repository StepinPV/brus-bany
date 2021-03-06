const fs = require('fs');
const logger = require('../../utils/logger');
const Folders = require('../controllers/PageFolders');
const Pages = require('../controllers/Pages');
const applyFields = require('../utils/applyFields');

const getIncludedFolders = (folderId, folders) => {
    let includedFolders = [];

    folders.forEach(folder => {
        if (folder.get('folder') === folderId) {
            const id = folder.get('_id').toString();
            includedFolders.push(id);
            includedFolders = [...includedFolders, ...getIncludedFolders(id, folders)];
        }
    });

    return includedFolders;
};

const writeFile = (name, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`./sites/${process.env.NAME}/${name}`, data,
            function (err) {
                if (err) {
                    reject();
                    logger.error(`Ошибка генерации feed ${name} для сайта ${process.env.NAME}: ${err}`, );
                } else {
                    resolve();
                    logger.success(`Feed ${name} для сайта ${process.env.NAME} успешно обновлен`);
                }
            });
    });
};

exports.generate = async function () {
    const { data: folders } = await Folders.getAll();
    const { data: pages } = await Pages.getAll();

    logger.info(`\nГенерация feeds для сайта ${process.env.NAME}...`);

    for (const folder of folders) {
        const folderFeeds = folder.get('feeds');

        if (folderFeeds && folderFeeds.length) {
            const folderId = folder.get('_id').toString();
            const folderFields = folder.get('page-fields');

            const neededFolders = [folderId, ...getIncludedFolders(folderId, folders)];

            for (const feed of folderFeeds) {
                let items = ``;

                pages.forEach(page => {
                    const pageConfig = page.get('config');
                    if (neededFolders.includes(pageConfig.folder) && !page.get('test')) {
                        const folderFieldValues = pageConfig['folder-fields'][folderId];
                        const pageFolder = folders.find(f => f.get('_id').toString() === pageConfig.folder);

                        const fieldValues = {
                            pageId: { type: 'string', value: page.get('_id').toString() },
                            pageUrl: { type: 'string', value: page.get('url') },
                            folderName: { type: 'string', value: pageFolder.get('name') },
                            folderId: { type: 'string', value: pageConfig.folder },
                        };

                        folderFields.forEach(field => {
                            fieldValues[field.id] = {
                                type: field.type,
                                value: folderFieldValues[field.id]
                            }
                        });

                        if (feed.filter ? eval(applyFields(fieldValues, feed.filter, folderFieldValues['__images__'])) : true) {
                            items += applyFields(fieldValues, feed.body, folderFieldValues['__images__']);
                        }
                    }
                });

                const feedData = applyFields({
                    items: {
                        type: 'string',
                        value: items
                    }
                }, feed.container);

                await writeFile(feed['file-name'], feedData);
            }
        }
    }

    logger.info(`Генерация feeds для сайта ${process.env.NAME} закончена`);
};
