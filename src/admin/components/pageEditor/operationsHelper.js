export default {
    setProps: (components, index, newProps, errors, images) => {
        const newComponents = [...components];
        newComponents[index].props = newProps;

        return { __images__: images, components: newComponents };
    },

    add: (components, index, component) => {
        const newComponents = [...components];

        newComponents.splice(index, 0, component);

        return newComponents;
    },

    delete: (components, index) => {
        const newComponents = [...components];
        newComponents.splice(index, 1);

        return newComponents;
    },

    clone: (components, index) => {
        const newComponents = [...components];
        newComponents.splice(index + 1, 0, JSON.parse(JSON.stringify(components[index])));

        return newComponents;
    },

    moveUp: (components, index) => {
        const newComponents = [...components];
        const temp = newComponents[index - 1];
        newComponents[index - 1] = newComponents[index];
        newComponents[index] = temp;

        return newComponents;
    },

    moveBottom: (components, index) => {
        const newComponents = [...components];
        const temp = newComponents[index + 1];
        newComponents[index + 1] = newComponents[index];
        newComponents[index] = temp;

        return newComponents;
    }
};
