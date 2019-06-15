const Status = require('./Status');
const Projects = require('./Projects');
const Materials = require('./Materials');
const Layouts = require('./Layouts');
const Categories = require('./Categories');

class Safety {
    static async deleteMaterial(id) {
        const { data: projects } = await Projects.getAll();

        const projectWithMaterial = projects.find(project => project.materials && project.materials[id]);

        if (projectWithMaterial) {
            return Status.error(`Материал используется в проекте с id = ${projectWithMaterial._id}!`);
        }

        await Materials.delete(id);

        return Status.success();
    };

    static async deleteLayout(id) {
        const { data: projects } = await Projects.getAll();

        const projectWithLayout = projects.find(project => project.layoutId === id);

        if (projectWithLayout) {
            return Status.error(`Планировка используется в проекте с id = ${projectWithLayout._id}!`);
        }

        await Layouts.delete(id);

        return Status.success();
    };

    static async deleteCategory(id) {
        const { data: projects } = await Projects.getAll();

        const projectWithLayout = projects.find(project => project.categoryId === id);

        if (projectWithLayout) {
            return Status.error(`Категория содержит проекты!`);
        }

        await Categories.delete(id);

        return Status.success();
    };
}

module.exports = Safety;
