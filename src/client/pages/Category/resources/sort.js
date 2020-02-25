const sortProjects = (projects) => {
    return projects.sort((a, b) => {
        if (a.price > b.price) return 1;
        if (a.price === b.price) return 0;
        if (a.price < b.price) return -1;
    });
};

export default sortProjects;
