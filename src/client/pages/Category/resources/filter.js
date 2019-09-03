const filterProjects = (selectedFilters, projects, category) => {
    return projects.filter(project => {
        if (selectedFilters.size) {
            if (`${project.layoutId.width}x${project.layoutId.length}` !== selectedFilters.size) {
                return false;
            }
        }

        if (selectedFilters.additions && selectedFilters.additions.length) {
            return selectedFilters.additions.every(filterId => {
                const filter = category.filters.find(filter => filter.id === filterId);

                // eslint-disable-next-line
                const params = project.layoutId;
                // eslint-disable-next-line
                return eval(filter.condition);
            });
        }

        return true;
    });
};

export default filterProjects;
