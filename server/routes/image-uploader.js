const express = require('express');
const multer  = require('multer');
const fs = require('fs');
const path = require('path');
const addWatermark = require('../addWatermark');
const compressImage = require('../compressImage');
const resizeImage = require('../resizeImage');

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
    const folderPath = path.join(__dirname, '../../public/buffer/');

    try {
        if (req.imageName) {
            resizeImage('../public/buffer/', req.imageName, '../public/buffer/cropped/', function () {
                addWatermark({
                    source: `${folderPath}cropped/${req.imageName}`,
                    logo: path.join(__dirname, '../watermark.png'),
                    logoSize: {
                        width: 400,
                        height: 100
                    }
                }, function() {
                    compressImage(`${folderPath}cropped/${req.imageName}`, `${folderPath}compressed/`, function() {
                        send(res, {
                            message: `Изображение загружено!`,
                            data: `/buffer/compressed/${req.imageName}`,
                            status: 'success'
                        });
                    }, function (error){
                        const message = `Не удалось сжать изображение: ${error}`;
                        send(res, { status: 'error', message });
                        console.log(message);
                    });
                }, function(err) {
                    const message = `Не удалось применить водяной знак: ${err}`;
                    send(res, { status: 'error', message });
                    console.log(message);
                });
            }, function (err) {
                const message = `Не удалось обрезать изображение: ${err}`;
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
