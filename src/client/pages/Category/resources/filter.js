const filterProjects = (filter, projects) => {
    return projects.filter(project => {
        // eslint-disable-next-line
        const params = project.layoutId;
        // eslint-disable-next-line
        return eval(filter.condition);
    });
};

export default filterProjects;
