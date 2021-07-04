const express = require('express');
const multer  = require('multer');
const shell = require('shelljs');
const prepareImage = require('../prepareImage');
const path = require('path');

const router = express.Router();

const MAX_FILE_SIZE = 1024 * 1024 * 2;

const TYPES = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/x-icon': 'ico',
    'image/vnd.microsoft.icon': 'ico',
    'image/svg+xml': 'svg'
}

const PREPARED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folderPath = `./sites/${process.env.NAME}/uploads/global`;
        shell.mkdir('-p', folderPath);
        cb(null, folderPath)
    },
    filename: function (req, file, cb) {
        const id = Math.floor(Math.random() * (99999999 - 10000000) + 10000000);
        req.imageName = `${id}.${TYPES[file.mimetype]}`;
        cb(null, req.imageName);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype.match('image.*')){
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};

const upload = multer({
    storage: fileStorage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter
});

const send = (res, { status, code, message, data }) => {
    res.json({ status, code, message, data });
    res.end();
};

router.put('/', upload.single('file'), async function(req, res, next) {
    const sendSuccess = () => {
        send(res, {
            message: `Изображение загружено!`,
            data: `/uploads/global/${req.imageName}`,
            status: 'success'
        });
    };

    try {
        if (req.imageName) {
            if (PREPARED_IMAGE_TYPES.includes(req.file.mimetype)) {
                prepareImage(path.join(__dirname, `../../${req.file.path}`),function () {
                    sendSuccess();
                }, function (err) {
                    const message = `Не удалось обработать изображение: ${err}`;
                    send(res, { status: 'error', message });
                    console.log(message);
                }, {
                    withLogo: !(req.body.withoutLogo === 'true'),
                    width: req.body.width,
                    withoutCompression: req.body.withoutCompression
                });
            } else {
                sendSuccess();
            }
        } else {
            send(res, { status: 'error', message: 'Изображение не загружено. Недопустимый формат!' });
        }
    } catch(err) {
        next(err);
    }
});

router.use(function (err, req, res, next) {
    if (err.code === 'LIMIT_FILE_SIZE') {
        send(res, { status: 'error', message: 'Загрузите изображениие меньшего размера' });
    }

    next();
});

module.exports = router;
