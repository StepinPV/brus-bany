const express = require('express');
const DB = require('../db');
const multer  = require('multer');
const fs = require('fs');

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
    const collection = getCollection();
    const categoryId = req.params.categoryId;
    const layoutId = req.params.layoutId;
    const imageId = req.params.imageId;
    const projectId = `${categoryId}.${layoutId}`;

    const project = await collection.findOne({ '_id': projectId });

    if (!project) {
        cb(null, false);
        return;
    }

    await collection.updateOne({ '_id': projectId }, {
        $set: {
            ...project,
            images: {
                ...project.images,
                [imageId]: `/uploads/${categoryId}/${layoutId}/${imageId}.jpg`
            }
        }
    });

    cb(null, true);
}

const upload = multer({ storage: fileStorage, fileFilter });

const router = express.Router();
const getCollection = () => DB.getCollection('projects');
const getLayoutsCollection = () => DB.getCollection('layouts');

const send = (res, { status, code, message, data }) => {
    res.json({ status, code, message, data });
    res.end();
};

router.get('/:categoryId', async function(req, res, next) {
    try {
        const collection = getCollection();
        const layoutsCollection = getLayoutsCollection();
        const categoryId = req.params.categoryId;

        const projects = await collection.find({ categoryId }).toArray();

        const preparedProjects = await projects.reduce(async (previousPromise, { categoryId, layoutId }) => {
            const projects = await previousPromise;
            const layout = await layoutsCollection.findOne({ _id: layoutId });

            projects.push({
                categoryId,
                layoutId,
                name: layout.name
            });

            return projects;
        }, Promise.resolve([]));

        send(res, { data: preparedProjects, status: 'success' });

    } catch(err) {
        next(err);
    }
});

//CREATE
router.post('/:categoryId/:layoutId', async function(req, res, next) {
    try {
        const collection = getCollection();
        const project = req.body.project;
        const categoryId = req.params.categoryId;
        const layoutId = req.params.layoutId;

        if (await collection.findOne({ categoryId, layoutId })) {
            send(res, { status: 'error', message: `Проект с планировкой = ${project.layoutId} уже существует!` });
            return;
        }

        await collection.insertOne({
            ...project,
            '_id': `${categoryId}.${layoutId}`,
            categoryId,
            layoutId
        });

        send(res, { message: `Проект успешно создан!`, status: 'success' });
    } catch(err) {
        next(err);
    }
});

//READ
router.get('/:categoryId/:layoutId', async function(req, res, next) {
    try {
        const collection = getCollection();
        const categoryId = req.params.categoryId;
        const layoutId = req.params.layoutId;

        const project = await collection.findOne({ '_id': `${categoryId}.${layoutId}` });

        if (!project) {
            send(res, { status: 'error', message: `Проект не найден!` });
            return;
        }

        send(res, { data: project, status: 'success' });
    } catch(err) {
        next(err);
    }
});

//UPDATE
router.put('/:categoryId/:layoutId', async function(req, res, next) {
    try {
        const collection = getCollection();
        const { project } = req.body;
        const categoryId = req.params.categoryId;
        const layoutId = req.params.layoutId;
        const projectId = `${categoryId}.${layoutId}`;

        if (project.categoryId !== categoryId) {
            send(res, { status: 'error', message: `Поле categoryId менять запрещено!` });
            return;
        }

        if (project.layoutId !== layoutId) {
            send(res, { status: 'error', message: `Поле layoutId менять запрещено!` });
            return;
        }

        if (project._id !== projectId) {
            send(res, { status: 'error', message: `Поле _id менять запрещено!` });
            return;
        }

        if (!await collection.findOne({ '_id': projectId })) {
            send(res, { status: 'error', message: `Проект не найден!` });
            return;
        }

        await collection.updateOne({ '_id': projectId }, { $set: project });

        send(res, { message: `Проект успешно обновлен!`, status: 'success' });
    } catch(err) {
        next(err);
    }
});

router.put('/:categoryId/:layoutId/:imageId/upload-file', upload.single('file'), async function(req, res, next) {
    try {
        const categoryId = req.params.categoryId;
        const layoutId = req.params.layoutId;
        const imageId = req.params.imageId;

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


        const collection = getCollection();
        const categoryId = req.params.categoryId;
        const layoutId = req.params.layoutId;
        const imageId = req.params.imageId;
        const projectId = `${categoryId}.${layoutId}`;

        const project = await collection.findOne({ '_id': projectId });

        await collection.updateOne({ '_id': projectId }, {
            $set: {
                ...project,
                images: {
                    ...project.images,
                    [imageId]: null
                }
            }
        });

        send(res, { message: `Изображение удалено!`, status: 'success' });
    } catch(err) {
        next(err);
    }
});

module.exports = router;
