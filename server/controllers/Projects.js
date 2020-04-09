const Project = require('../models/Project');
const Status = require('./Status');
const Categories = require('./Categories');
const Layouts = require('./Layouts');
const fs = require('fs');
const shell = require('shelljs');
const rimraf = require('rimraf');
const prepareErrors = require('./prepareErrors');

const prepareImages = async (data) => {
    const { data: category } = await Categories.get(data.categoryId);
    const { data: layout } = await Layouts.get(data.layoutId);

    const regexp = /^\/buffer\//;
    const newFolderPath = `/uploads/projects/${category.translateName}/${layout.translateName}/`;

    const moveImage = (image) => {
        const newImagePath = image.replace(regexp, newFolderPath);
        const fullNewFolderPath = './public' + newFolderPath;

        shell.mkdir('-p', fullNewFolderPath);

        fs.renameSync('./public' + image, './public' + newImagePath);

        return newImagePath;
    };

    Object.keys(data.images).forEach(imageKey => {
        if (regexp.test(data.images[imageKey])) {
            data.images[imageKey] = moveImage(data.images[imageKey]);
        }
    });
};

const removeImages = async (data) => {
    const { data: category } = await Categories.get(data.categoryId);
    const { data: layout } = await Layouts.get(data.layoutId);

    rimraf.sync(`./public/uploads/projects/${category.translateName}/${layout.translateName}`);
};

// Посчитать цену проекта
const calculatePrice = async (project) => {
    const { data: category } = await Categories.get(project.categoryId);

    for (let i = 0; i < category.projectBlocks.length; i++) {
        const block = category.projectBlocks[i];

        for (let j = 0; j < block.items.length; j++) {
            const item = block.items[j];
            let itemPrice = 0;

            switch(item.price.typeId) {
                case 'layout_fix':
                    const { data: params } = await Layouts.get(project.layoutId);
                    itemPrice = eval(item.price.value);
                    break;
                case 'fix':
                    itemPrice = item.price.value;
                    break;
            }

            project.projectBlocks = project.projectBlocks || {};
            project.projectBlocks[block.id] = project.projectBlocks[block.id] || {};
            project.projectBlocks[block.id][item.id] = project.projectBlocks[block.id][item.id] || {};
            project.projectBlocks[block.id][item.id].price = itemPrice;
        }
    }

    return {
        price: project.prices ? project.prices[category.complectationBlocks.defaultItemId] || 0 : 0
    };
};

class Projects {
    static async getAll(options) {
        const promise = Project.find({});

        if (options) {
            const { withLayout, withCategory } = options;

            if (withLayout) {
                promise.populate('layoutId');
            }

            if (withCategory) {
                promise.populate('categoryId');
            }
        }

        const projects = await promise;

        return Status.success(projects);
    };

    static async updatePrices() {
        const projects = await Project.find({});

        for (let i = 0; i < projects.length; i++) {
            const project = projects[i].toObject();

            const prices = await calculatePrice(project);
            project.price = prices.price;

            try {
                const projectInst = new Project(project);

                await projectInst.validate();

                const { categoryId, layoutId } = project;

                await Project.updateOne({ categoryId, layoutId }, project, { runValidators: true });
            } catch (err) {
                return Status.error('Ошибка обновления!', { errors: prepareErrors(err.errors) });
            }
        }

        return Status.success();
    }

    static async getAllForCategory(categoryId, options) {
        const promise = Project.find({ categoryId });

        if (options) {
            const { withLayout, withCategory } = options;

            if (withLayout) {
                promise.populate('layoutId');
            }

            if (withCategory) {
                promise.populate('categoryId');
            }
        }

        const projects = await promise;

        return Status.success(projects);
    };

    static async getAllForCategoryByName(categoryName, options) {
        const { data: category } = await Categories.getByName(categoryName);
        return category ? await Projects.getAllForCategory(category.get('_id'), options) : Status.error(`Проект не найден!`);
    };

    static async get(categoryId, layoutId, options) {
        const promise = Project.findOne({ categoryId, layoutId });

        if (options) {
            const { withLayout, withCategory } = options;

            if (withLayout) {
                promise.populate('layoutId');
            }

            if (withCategory) {
                promise.populate('categoryId');
            }
        }

        const project = await promise;

        if (!project) {
            return Status.error(`Проект не найден!`);
        }

        return Status.success(project);
    };

    static async getByName(categoryName, layoutName, options) {
        const { data: category } = await Categories.getByName(categoryName);
        const { data: layout } = await Layouts.getByName(layoutName);

        return category && layout ? await Projects.get(category.get('_id'), layout.get('_id'), options) : Status.error(`Проект не найден!`);
    };

    static async create(categoryId, layoutId, project) {
        if (await Project.findOne({ categoryId, layoutId })) {
            return Status.error(`Проект с выбранной планировкой уже существует!`);
        }

        try {
            const data = {
                images: {},
                ...project,
                categoryId,
                layoutId
            };

            data.created = new Date();
            data.updated = new Date();

            const prices = await calculatePrice(data);
            data.price = prices.price;

            const projectInst = new Project(data);

            await projectInst.validate();

            await prepareImages(data);

            await Project.create(data);

            return Status.success();
        } catch (err) {
            console.log(err);
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
    };

    static async update(categoryId, layoutId, project) {
        if (project.categoryId !== categoryId) {
            return Status.error(`Категорию менять запрещено!`);
        }

        if (project.layoutId !== layoutId) {
            return Status.error(`Планировку менять запрещено!`);
        }

        if (!await Project.findOne({ categoryId, layoutId })) {
            return Status.error(`Проект не найден!`);
        }

        const prices = await calculatePrice(project);
        project.price = prices.price;

        try {
            const data = {
                images: {},
                ...project
            };

            data.updated = new Date();

            const projectInst = new Project(data);

            await projectInst.validate();

            await prepareImages(data);

            await Project.updateOne({ categoryId, layoutId }, data, { runValidators: true });

            return Status.success();
        } catch (err) {
            return Status.error('Исправьте ошибки!', { errors: prepareErrors(err.errors) });
        }
    };

    static async delete(id) {
        const data = await Project.findOne({ _id: id });

        if (!data) {
            return Status.error(`Проект не найден!`);
        }

        try {
            await removeImages(data);
            await Project.deleteOne({ _id: id });
            return Status.success();
        } catch(err) {
            return Status.error(err);
        }
    };
}

module.exports = Projects;
