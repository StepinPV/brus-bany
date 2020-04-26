const filterProjects = (projects, filters) => {
    return projects.filter(project => {
        // eslint-disable-next-line
        return filters.every(filter => eval(filter.condition));
    });
};

export default filterProjects;
