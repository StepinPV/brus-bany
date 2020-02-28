const sortProjects = (projects) => {
    return projects.sort((a, b) => {
        const aW = a.layoutId.width;
        const aL = a.layoutId.length;

        const bW = b.layoutId.width;
        const bL = b.layoutId.length;

        if (aW > bW) return 1;
        if (aW === bW) {
            if (aL > bL) return 1;
            if (aL === bL) return 0;
            if (aL < bL) return -1;
        }
        if (aW < bW) return -1;
    });
};

export default sortProjects;
