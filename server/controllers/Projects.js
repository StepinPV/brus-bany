const Project = require('../models/Project');
const Status = require('./Status');
const Materials = require('./Materials');
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

const DEFAULT_VALUES = {
    // Итоговая цена
    price: 0,
    // Процент прибыли
    profitPercentage: 20,
    // Процент зарплаты рабочим
    salaryPercentage: 20,
    // Цена за такси
    taxiPrice: 12000,
};

// Посчитать цену проекта
const calculatePrice = async (project) => {
    let price = 0;
    let materialsPrice = 0;
    let projectBlocksPrice = 0;
    let projectBlocksPriceFixed = 0;

    if (project.material) {
        for (let i = 0; i < project.material.length; i++) {
            const { data: material } = await Materials.get(project.material[i].id);

            if (material) {
                materialsPrice += material.price * project.material[i].count;
            }
        }
    }

    const { data: category } = await Categories.get(project.categoryId);

    for (let i = 0; i < category.projectBlocks.length; i++) {
        const block = category.projectBlocks[i];

        let defaultItemPrice = 0;

        for (let j = 0; j < block.items.length; j++) {
            const item = block.items[j];
            let itemPrice = 0;

            switch(item.price.typeId) {
                case 'material_fix':
                    const items = project.projectBlocks && project.projectBlocks[block.id] && project.projectBlocks[block.id][item.id] ? project.projectBlocks[block.id][item.id].data : [];
                    let sum = 0;
                    for (let i = 0; i < items.length; i++) {
                        const { data: material } = await Materials.get(items[i].id);
                        sum += material.price * items[i].count;
                    }
                    itemPrice = sum;
                    break;
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

            if (block.defaultItemId === item.id) {
                defaultItemPrice = itemPrice;
            }
        }

        if (block.useInBuildingPrice) {
            projectBlocksPrice += defaultItemPrice;
        } else {
            projectBlocksPriceFixed += defaultItemPrice;
        }
    }

    if (materialsPrice || projectBlocksPrice) {
        price += (materialsPrice + projectBlocksPrice) / (1 - DEFAULT_VALUES['salaryPercentage'] / 100 - project.profitPercentage / 100);
    }

    price += DEFAULT_VALUES['taxiPrice'];
    price += projectBlocksPriceFixed;

    // Округляем цену до сотен, возможно стоит делать это на клиенте
    price = Math.round(price / 100) * 100;

    return {
        price: project.fixPrice || price,
        materialsPrice: materialsPrice
    };
};

// Проверить и вернуть валидный profitPercentage
const getValidProfitPercentage = profitPercentage => {
    if (isNaN(parseFloat(profitPercentage)) || profitPercentage < 0 || profitPercentage >= 100 - DEFAULT_VALUES['salaryPercentage']) {
        return DEFAULT_VALUES['profitPercentage'];
    }

    return profitPercentage;
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
            project.materialsPrice = prices.materialsPrice;

            try {
                const projectInst = new Project(project);

                await projectInst.validate();

                const { categoryId, layoutId } = project;

                await Project.updateOne({ categoryId, layoutId }, project, { runValidators: true });
            } catch (err) {
                return Status.error('Ошибка обновлен!', { errors: prepareErrors(err.errors) });
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
        return await Projects.getAllForCategory(category.get('_id'), options);
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
        return await Projects.get(category.get('_id'), layout.get('_id'), options);
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
                layoutId,
                profitPercentage: project['profitPercentage'] || DEFAULT_VALUES['profitPercentage']
            };

            const prices = await calculatePrice(data);
            data.price = prices.price;
            data.materialsPrice = prices.materialsPrice;

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

        project.profitPercentage = getValidProfitPercentage(project.profitPercentage);

        const prices = await calculatePrice(project);
        project.price = prices.price;
        project.materialsPrice = prices.materialsPrice;

        try {
            const data = {
                images: {},
                ...project
            };

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
