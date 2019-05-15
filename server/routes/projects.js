const express = require('express');
const Projects = require('../models/Projects');
const Layouts = require('../models/Layouts');
const multer  = require('multer');
const fs = require('fs');

const router = express.Router();

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = `./public/uploads/${req.params.categoryId}/${req.params.layoutId}`;

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, `${req.params.imageId}.jpg`);
    }
});

async function fileFilter (req, file, cb) {
    const { categoryId, layoutId, imageId } = req.params;

    const { status } = await Projects.updateImage(categoryId, layoutId, imageId, `/uploads/${categoryId}/${layoutId}/${imageId}.jpg`);

    switch(status) {
        case 'success':
            cb(null, true);
            break;
        case 'error':
            cb(null, false);
            break;
        default:
            break;
    }
}

const upload = multer({ storage: fileStorage, fileFilter });

const send = (res, { status, code, message, data }) => {
    res.json({ status, code, message, data });
    res.end();
};

router.get('/:categoryId', async function(req, res, next) {
    try {
        const { status, data: projects, message } = await Projects.getAll(req.params.categoryId);

        switch(status) {
            case 'success':
                // TODO Это тоже можно вынести
                const preparedProjects = await projects.reduce(async (previousPromise, project) => {
                    const projects = await previousPromise;

                    const { data: layout } = await Layouts.get(project.layoutId);

                    projects.push({ ...project, layout });

                    return projects;
                }, Promise.resolve([]));

                send(res, { data: preparedProjects, status });
                break;
            case 'error':
                send(res, { message, status });
                break;
            default:
                break;
        }
    } catch(err) {
        next(err);
    }
});

//CREATE
router.post('/:categoryId/:layoutId', async function(req, res, next) {
    try {
        const { categoryId, layoutId } = req.params;
        const { project } = req.body;

        const { status, data, message } = await Projects.create(categoryId, layoutId, project);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Проект успешно создан!` });
                break;
            case 'error':
                send(res, { message, status });
                break;
            default:
                break;
        }
    } catch(err) {
        next(err);
    }
});

//READ
router.get('/:categoryId/:layoutId', async function(req, res, next) {
    try {
        const { categoryId, layoutId } = req.params;

        const { status, data: project, message } = await Projects.get(categoryId, layoutId);

        switch(status) {
            case 'success':
                // TODO Это тоже можно вынести
                const { data: layout } = await Layouts.get(layoutId);
                send(res, { data: { ...project, layout }, status });
                break;
            case 'error':
                send(res, { message, status });
                break;
            default:
                break;
        }
    } catch(err) {
        next(err);
    }
});

//UPDATE
router.put('/:categoryId/:layoutId', async function(req, res, next) {
    try {
        const { categoryId, layoutId } = req.params;
        const { project } = req.body;

        const { status, data, message } = await Projects.update(categoryId, layoutId, project);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Проект успешно обновлен!` });
                break;
            case 'error':
                send(res, { message, status });
                break;
            default:
                break;
        }
    } catch(err) {
        next(err);
    }
});

router.put('/:categoryId/:layoutId/:imageId/upload-file', upload.single('file'), async function(req, res, next) {
    try {
        const { categoryId, layoutId, imageId } = req.params;

        send(res, {
            message: `Изображение загружено!`,
            status: 'success',
            data: `/uploads/${categoryId}/${layoutId}/${imageId}.jpg`
        });
    } catch(err) {
        next(err);
    }
});

router.put('/:categoryId/:layoutId/:imageId/delete-file', async function(req, res, next) {
    try {
        try {
            fs.unlinkSync(`./public/uploads/${req.params.categoryId}/${req.params.layoutId}/${req.params.imageId}.jpg`);
        } catch(err){}


        const { categoryId, layoutId, imageId } = req.params;

        const { status, data, message } = await Projects.updateImage(categoryId, layoutId, imageId, null);

        switch(status) {
            case 'success':
                send(res, { data, status, message: `Изображение удалено!` });
                break;
            case 'error':
                send(res, { message, status });
                break;
            default:
                break;
        }
    } catch(err) {
        next(err);
    }
});

module.exports = router;
