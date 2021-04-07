import React, { memo } from 'react';
import { useLocation } from 'react-router';
import PropTypes from "prop-types";
import * as components from '@constructor-components';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const Container = styled.div`
    width: 1200px;
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    ${props => css`
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? props.theme['padding-top'][props.styles.paddingTop].v : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? props.theme['padding-bottom'][props.styles.paddingBottom].v : ''};
    `}
`;

const Item = styled.a`
    text-decoration: none;
    display: flex;
    flex-grow: 1;
    @media (min-width: 768px) {
        flex-basis: 33%;
    }
    @media (max-width: 768px) and (max-width: 400px) {
        flex-basis: 50%;
    }
    @media (max-width: 400px) {
        flex-basis: 100%;
    }
`;

const ItemWrapper = styled.div`
    flex-basis: 360px;
    max-width: 370px;
    margin: 16px;
    flex-grow: 1;
    cursor: pointer;
    display: flex;
    flex-direction: column;
`;

const NotFound = styled.div`
    text-align: center;
    padding: 16px;
`;

function renderNotFound() {
    return <NotFound>Источник списка не выбран</NotFound>;
}

function Pages(props) {
    // Для фильтра
    const location = useLocation();

    if (!props.folder) {
        return renderNotFound();
    }

    const folder = props['__pageFolders__'].find(folder => folder['_id'] === props.folder);

    if (!folder) {
        return renderNotFound();
    }

    const allFolders = [props.folder];

    const getPageFields = (page, folder) => {
        const fieldValues = {};

        if (folder['page-fields'] && page.config['folder-fields'][folder['_id']]) {
            folder['page-fields'].forEach(field => {
                if (page.config['folder-fields'][folder['_id']][field.id] !== undefined) {
                    let value;
                    const folderFields = page.config['folder-fields'][folder['_id']];

                    switch(field.type) {
                        case 'image':
                            value = folderFields.__images__[folderFields[field.id]];
                            break;
                        default:
                            value = folderFields[field.id];
                    }

                    fieldValues[field.id] = { type: field.type, value }
                }
            });
        }

        return fieldValues;
    }

    const addChildFolders = (folderId) => {
        props['__pageFolders__'].forEach(folder => {
            if (folder.folder === folderId) {
                allFolders.push(folder['_id']);
                addChildFolders(folder['_id']);
            }
        });
    };

    addChildFolders(folder['_id']);

    let pages = props['__pages__'].filter(page => allFolders.includes(page.config.folder));

    let folderForViewed = folder;

    // Ищем шаблон для отображения
    while(!folderForViewed.pageViewConfig.components.length) {
        if (folderForViewed.folder) {
            folderForViewed = props['__pageFolders__'].find(folder => folder['_id'] === folderForViewed.folder);
        } else {
            break;
        }
    }

    const convertFieldsToValues = (fields) => {
        return Object.keys(fields).reduce((values, id) => {
            switch(fields[id].type) {
                case 'date':
                    values[id] = new Date(fields[id].value);
                    break;
                default:
                    values[id] = fields[id].value;
            }

            return values;
        }, {});
    }

    if (props.filter) {
        pages = pages.filter((p) => {
            // eslint-disable-next-line
            const page = convertFieldsToValues(getPageFields(p, folderForViewed));

            try {
                return eval(props.filter);
            } catch(err) {
                return true;
            }
        });
    }

    if (props.sort) {
        pages = pages.sort((p1, p2) => {
            // TODO Вот здесь нужно собирать поля не только папки, которая имеет отображение, а всех по цепочке
            // eslint-disable-next-line
            const page1 = convertFieldsToValues(getPageFields(p1, folderForViewed));
            // eslint-disable-next-line
            const page2 = convertFieldsToValues(getPageFields(p2, folderForViewed));
            try {
                return eval(props.sort);
            } catch(err) {
                return 0;
            }
        });
    }

    if (props.maxCount) {
        pages = pages.slice(0, props.maxCount);
    }

    if (props.staticContext) {
        props.staticContext.data = props.staticContext.data || {};
        props.staticContext.data.pages = props.staticContext.data.pages || [];
        props.staticContext.data.pageFolders = props.staticContext.data.pageFolders || [];

        pages.forEach(page => {
            if (!props.staticContext.data.pages.find((p => p['_id'] === page['_id']))) {
                props.staticContext.data.pages.push(page);
            }
        });

        allFolders.forEach(folderId => {
            const folder = props['__pageFolders__'].find(folder => folder['_id'] === folderId);
            if (!props.staticContext.data.pageFolders.find((f => f['_id'] === folder['_id']))) {
                props.staticContext.data.pageFolders.push(folder);
            }
        });
    }

    return (
        <Container styles={{ paddingTop: props.paddingTop, paddingBottom: props.paddingBottom }}>
            {pages.map(page => {
                const fieldValues = getPageFields(page, folderForViewed);

                return (
                    <Item href={page.url}>
                        <ItemWrapper>
                            {
                                folderForViewed.pageViewConfig.components.map(id => {
                                    const componentData = folderForViewed.pageViewConfig.componentsData[id];
                                    const Component = components[componentData.componentId];

                                    return (
                                        <Component
                                            {...componentData.props}
                                            containerStyles={componentData.props && componentData.props.stretched ? css`flex-grow: 1;` : null}
                                            __images__={componentData.images}
                                            __pages__={pages}
                                            __pageFolders__={props['__pageFolders__']}
                                            __fieldsValue__={fieldValues}
                                            staticContext={props.staticContext} />
                                    );
                                })
                            }
                        </ItemWrapper>
                    </Item>
                )
            })}
            <Item as='div' />
            <Item as='div' />
        </Container>
    );
}

Pages.propTypes = {
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    folder: PropTypes.string,
    filter: PropTypes.string,
    maxCount: PropTypes.number,
    sort: PropTypes.string
};

Pages.defaultProps = {
    paddingTop: 'm',
    paddingBottom: 'm'
};

export default memo(Pages);
