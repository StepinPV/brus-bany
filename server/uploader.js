const multer  = require('multer');

const PUBLIC_DIRECTORY = './public';
const IMAGES_FOLDER = '/uploads';

module.exports.PUBLIC_DIRECTORY = PUBLIC_DIRECTORY;
module.exports.IMAGES_FOLDER = IMAGES_FOLDER;

module.exports.getUploader = (fileStorage, fileFilter) => {
    return multer({ storage: fileStorage, fileFilter });
};
