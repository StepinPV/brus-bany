import React, {memo} from 'react';
import components from '@constructor-components';
import NotFoundComponent from '../../client/components/NotFound';
import Meta from '../../client/components/Meta';

const META = {
    title: '404 | Брус бани',
    description: 'Страница не найдена или не существует'
};

function NotFound({ customComponents, staticContext }) {
    const headerComponent = customComponents.find(component => component['_id'] === '5eca90f2003e3d332650c6ea');
    const footerComponent = customComponents.find(component => component['_id'] === '5eca9461003e3d332650c862');

    if (staticContext) {
        staticContext.data = staticContext.data || {};
        staticContext.data.customComponents = staticContext.data.customComponents || [];
        staticContext.data.customComponents.push(headerComponent);
        staticContext.data.customComponents.push(footerComponent);
    }

    return (
        <>
            <Meta meta={META} />
            <components.forPage.Header
                {...headerComponent.config.componentsData['8488'].props}
                button={{
                    caption: 'Обратный звонок',
                    link: '/#requestForm'
                }}
            />
            <NotFoundComponent />
            <components.forPage.Footer {...footerComponent.config.componentsData['3912'].props} />
        </>
    );
}

export default memo(NotFound);
