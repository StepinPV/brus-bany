const express = require('express');
const multer  = require('multer');
const shell = require('shelljs');
const prepareImage = require('../prepareImage');
const path = require('path');

const router = express.Router();

const MAX_FILE_SIZE = 1024 * 1024 * 2;

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const folderPath = req.body.globalStore === 'true' ? './public/uploads/global' : './public/buffer';
        shell.mkdir('-p', folderPath);
        cb(null, folderPath)
    },
    filename: function (req, file, cb) {
        const id = Math.floor(Math.random() * (9999 - 1000) + 1000);
        req.imageName = `${id}.jpg`;
        cb(null, req.imageName);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }
    else{
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
    try {
        if (req.imageName) {
            const folderPath = req.body.globalStore === 'true' ? '../../public/uploads/global/' : '../../public/buffer/';
            prepareImage(path.join(__dirname, `${folderPath}${req.imageName}`),function () {
                send(res, {
                    message: `Изображение загружено!`,
                    data: `${req.body.globalStore === 'true' ? '/uploads/global/' : '/buffer/'}${req.imageName}`,
                    status: 'success'
                });
            }, function (err) {
                const message = `Не удалось обработать изображение: ${err}`;
                send(res, { status: 'error', message });
                console.log(message);
            }, {
                withLogo: !(req.body.withoutLogo === 'true'),
                width: req.body.width
            });
        } else {
            send(res, { status: 'error', message: 'Изображение не загружено. Допустимый формат: "jpg"' });
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
