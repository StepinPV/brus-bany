import metas from './meta';

export default async function getComponents(componentsInfo, needIds= true) {
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

    for (const { componentId } of componentsInfo) {
        if (needIds) {
            addId(componentId);
            await checkDeps(componentId);
        }

        constructors[componentId] = (await metas[componentId].load()).default;
    }

    return { constructors, ids, simple };
}
