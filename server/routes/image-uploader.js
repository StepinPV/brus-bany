const express = require('express');
const multer  = require('multer');
const fs = require('fs');
const path = require('path');
const addWatermark = require('../addWatermark');

const router = express.Router();
const FOLDER_PATH = './public/buffer';

const MAX_FILE_SIZE = 1024 * 1024 * 2;

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(FOLDER_PATH)){
            fs.mkdirSync(FOLDER_PATH, { recursive: true });
        }

        cb(null, FOLDER_PATH)
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
            addWatermark({
                source: path.join(__dirname, `../../public/buffer/${req.imageName}`),
                logo: path.join(__dirname, '../../public/watermark.png'),
                logoSize: {
                    width: 400,
                    height: 150
                }
            }, function() {
                send(res, {
                    message: `Изображение загружено!`,
                    data: `/buffer/${req.imageName}`,
                    status: 'success'
                });
            }, function(err) {
                const message = `Не удалось применить водяной знак: ${err}`;
                send(res, { status: 'error', message });
                console.log(message);
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
