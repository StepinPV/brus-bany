const express = require('express');
const multer  = require('multer');
const fs = require('fs');

const router = express.Router();
const FOLDER_PATH = './public/uploads/buffer';

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(FOLDER_PATH)){
            fs.mkdirSync(FOLDER_PATH, { recursive: true });
        }

        cb(null, FOLDER_PATH)
    },
    filename: function (req, file, cb) {
        const id = Math.floor(Math.random() * (9999 - 1000) + 1000);
        req.imageId = id;
        cb(null, `${id}.jpg`);
    }
});

const upload = multer({ storage: fileStorage });

const send = (res, { status, code, message, data }) => {
    res.json({ status, code, message, data });
    res.end();
};

router.put('/', upload.single('file'), async function(req, res, next) {
    try {
        send(res, {
            message: `Изображение загружено!`,
            data: `/uploads/buffer/${req.imageId}.jpg`,
            status: 'success'
        });
    } catch(err) {
        next(err);
    }
});

module.exports = router;
