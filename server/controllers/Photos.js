const Layouts = require('./Layouts');
const Categories = require('./Categories');
const Photos = require('../models/Photos');
const Projects = require('./Projects');
const Status = require('./Status');
const prepareErrors = require('./prepareErrors');
const fs = require('fs');
const shell = require('shelljs');
const rimraf = require('rimraf');

const prepareImages = (data) => {
    const regexp = /^\/buffer\//;
    const newFolderPath = `/uploads/photos/${data.projectId}/${data.created}/`;

    const moveImage = (image) => {
        const newImagePath = image.replace(regexp, newFolderPath);
        const fullNewFolderPath = './public' + newFolderPath;

        shell.mkdir('-p', fullNewFolderPath);

        fs.renameSync('./public' + image, './public' + newImagePath);

        return newImagePath;
    };

    if (regexp.test(data.mainPhoto)) {
        data.mainPhoto = moveImage(data.mainPhoto);
    }

    if (data.photos) {
        data.photos.forEach(photo => {
            if (photo.image && regexp.test(photo.image)) {
                photo.image = moveImage(photo.image);
            }
        });
    }
};

const removeImages = (data) => {
    rimraf.sync(`./public/uploads/photos/${data.projectId}/${data.created}`);
};

class PhotoReports {
    static async getAll(options) {
        const promise = Photos.find({});

        if (options) {
            const { withProject } = options;

            if (withProject) {
                promise.populate('projectId');
            }
        }

        const items = await promise;

        if (options && options.withProject) {
            const { withLayout, withCategory } = options;

            for (let i = 0; i < items.length; i++) {
                if (withLayout) {
                    const { data: layout } = await Layouts.get(items[i].projectId.layoutId);
                    items[i].projectId.layoutId = layout;
                }

                if (withCategory) {
                    const { data: category } = await Categories.get(items[i].projectId.categoryId);
                    items[i].projectId.categoryId = category;
                }
            }
        }

        return Status.success(items);
    };

    static async getAllForCategory(categoryId, options) {
        const { data: photos } = await this.getAll({
            ...options,
            withProject: true
        });

        return Status.success(photos.filter(photo => {
            return (photo.projectId.categoryId._id || photo.projectId.categoryId).toString() === categoryId;
        }));
    };

    static async getAllForCategoryByName(categoryName, options) {
        const { data: category } = await Categories.getByName(categoryName);
        return category ? await PhotoReports.getAllForCategory(category.get('_id').toString(), options) : Status.error(`Фотоотчет не найден!`);
    };

    static async getAllForProjectByCategoryAndLayout(categoryName, layoutName, options) {
        const { status, data: project } = await Projects.getByName(categoryName, layoutName);

        if (status === 'success' && project) {
            return PhotoReports.getAllForProjectId(project._id, options);
        } else {
            return Status.error(`Фотоотчет не найден!`);
        }
    };

    static async getAllForProjectId(projectId, options) {
        const promise = Photos.find({ projectId });

        if (options) {
            const { withProject } = options;

            if (withProject) {
                promise.populate('projectId');
            }
        }

        const items = await promise;

        if (options && options.withProject) {
            const { withLayout, withCategory } = options;

            for (let i = 0; i < items.length; i++) {
                if (withLayout) {
                    const { data: layout } = await Layouts.get(items[i].projectId.layoutId);
                    items[i].projectId.layoutId = layout;
                }

                if (withCategory) {
                    const { data: category } = await Categories.get(items[i].projectId.categoryId);
                    items[i].projectId.categoryId = category;
                }
            }
        }

        return Status.success(items);
    };

    static async get(id, options) {
        const promise = Photos.findOne({ _id: id });
        let project;

        if (options) {
            const { withLayout, withCategory, withProject } = options;

            if (withProject) {
                promise.populate('projectId');

                project = await promise;

                if (project) {
                    if (withLayout) {
                        const { data: layout } = await Layouts.get(project.projectId.layoutId);
                        project.projectId.layoutId = layout;
                    }

                    if (withCategory) {
                        const { data: category } = await Categories.get(project.projectId.categoryId);
                        project.projectId.categoryId = category;
                    }
                }
            }
        }

        // TODO
        if (!project) {
            project = await promise;
        }

        if (!project) {
            return Status.error(`Фотоотчет не найден!`);
        }

        return Status.success(project);
    };

    static async create(projectId, report) {
        try {
            const fullData = { ...report, projectId };

            fullData.updated = new Date();
            const photo = new Photos(fullData);

            await photo.validate();

            prepareImages(fullData);

            await Photos.create(fullData);

            return Status.success();
        } catch(err) {
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
    };

    static async update(id, report) {
        const match = await Photos.findOne({ _id: id });

        if (!match) {
            return Status.error(`Вы пытаетесь изменить несуществующий фотоотчет!`);
        }

        try {
            report.updated = new Date();
            const photo = new Photos(report);

            await photo.validate();

            prepareImages(report);

            await Photos.updateOne({ _id: id }, report, { runValidators: true });
            return Status.success();
        } catch(err) {
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
    };

    static async delete(id) {
        const data = await Photos.findOne({ _id: id });

        if (!data) {
            return Status.error(`Фотоотчет не найден!`);
        }

        try {
            removeImages(data);
            await Photos.deleteOne({ _id: id });
            return Status.success();
        } catch(err) {
            return Status.error(err);
        }
    };
}

module.exports = PhotoReports;
