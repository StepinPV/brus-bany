const Status = require('./Status');
const Projects = require('./Projects');
const Materials = require('./Materials');
const Layouts = require('./Layouts');
const Categories = require('./Categories');
const Photos = require('./Photos');

class Safety {
    static async deleteMaterial(id) {
        const { data: projects } = await Projects.getAll();

        const projectWithMaterial = projects.find(project => {
            return project.material && project.material.some(material => material.id.toString() === id);
        });

        if (projectWithMaterial) {
            return Status.error(`Материал используется в проекте с id = ${projectWithMaterial._id}!`);
        }

        await Materials.delete(id);

        return Status.success();
    };

    static async deleteLayout(id) {
        const { data: projects } = await Projects.getAll();

        const projectWithLayout = projects.find(project => project.layoutId.toString() === id);

        if (projectWithLayout) {
            return Status.error(`Планировка используется в проекте с id = ${projectWithLayout._id}!`);
        }

        await Layouts.delete(id);

        return Status.success();
    };

    static async deleteCategory(id) {
        const { data: projects } = await Projects.getAll();

        const projectWithLayout = projects.find(project => project.categoryId.toString() === id);

        if (projectWithLayout) {
            return Status.error(`Категория содержит проекты!`);
        }

        await Categories.delete(id);

        return Status.success();
    };

    static async deleteProject(id) {
        const { data: photos } = await Photos.getAll();

        const photosWithLayout = photos.find(photo => photo.projectId.toString() === id);

        if (photosWithLayout) {
            return Status.error(`Проект содержит фотографии готового проекта!`);
        }

        await Projects.delete(id);

        return Status.success();
    };
}

module.exports = Safety;
