import metas from './meta';

export default async function getComponents(components, needIds= true, customComponents) {
    const constructors = {};
    const ids = [];
    let simple = true;

    const addId = (id) => {
        if (!ids.includes(id)) {
            ids.push(id);
        }
    };

    const checkDeps = async (id) => {
        const meta = await metas[id].loadMeta();

        if (meta.notSimple) {
            simple = false;
        }

        const dependencies = meta.dependencies;

        if (dependencies) {
            for (const depId of dependencies) {
                addId(depId);
                await checkDeps(depId);
            }
        }
    };

    const addComponents = async (components) => {
        for (const { componentId } of components) {
            if (needIds && metas[componentId]) {
                addId(componentId);
                await checkDeps(componentId);
            }

            if (metas[componentId]) {
                constructors[componentId] = (await metas[componentId].load()).default;
            }

            const customComponent = customComponents.find(c => c['_id'] === componentId);

            if (customComponent && customComponent.config && customComponent.config.components) {
                await addComponents(customComponent.config.components);
            }
        }
    };

    await addComponents(components);

    return { constructors, ids, simple };
}
