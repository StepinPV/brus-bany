import React, { memo } from 'react';
import PropTypes from "prop-types";
import * as components from '@constructor-components';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const Container = styled.div`
    width: 1200px;
    max-width: 100%;
    margin: 0 auto 32px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    ${props => css`
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? { s: '16px', m: '32px', l: '48px' }[props.styles.paddingTop] : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? { s: '16px', m: '32px', l: '48px' }[props.styles.paddingBottom] : ''};
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

const prepareProps = (componentData, fields, values) => {
    const newProps = { ...componentData.props };
    const newImages = { ...componentData.images };

    if (fields) {
        fields.forEach(field => {
            Object.keys(newProps).forEach(key => {
                if (typeof newProps[key] === 'string' && newProps[key].includes(`{{${field.slug}}}`)) {
                    newProps[key] = newProps[key].replace(new RegExp(`{{${field.slug}}}`, 'g'), values[field.item.id] || '');
                }

                if (newImages[newProps[key]] && newImages[newProps[key]].includes(`{{${field.slug}}}`)) {
                    newImages[newProps[key]] = newImages[newProps[key]].replace(new RegExp(`{{${field.slug}}}`, 'g'), values['__images__'][values[field.item.id]] || '');
                }
            });
        });
    }

    return { props: newProps, images: newImages };
};

function renderNotFound() {
    return <NotFound>Источник списка не выбран</NotFound>;
}

function Pages(props) {
    if (!props.folder) {
        return renderNotFound();
    }

    const folder = props['__pageFolders__'].find(folder => folder['_id'] === props.folder);

    if (!folder) {
        return renderNotFound();
    }

    const allFolders = [props.folder];

    const addChildFolders = (folderId) => {
        props['__pageFolders__'].forEach(folder => {
            if (folder.folder === folderId) {
                allFolders.push(folder['_id']);
                addChildFolders(folder['_id']);
            }
        });
    };

    addChildFolders(folder['_id']);

    const pages = props['__pages__'].filter(page => allFolders.includes(page.config.folder));

    if (props.staticContext) {
        props.staticContext.data = props.staticContext.data || {};
        props.staticContext.data.pages = props.staticContext.data.pages || [];
        props.staticContext.data.pageFolders = props.staticContext.data.pageFolders || [];

        pages.forEach(page => {
            if (!props.staticContext.data.pages.find((p => p['_id'] === page['_id']))) {
                props.staticContext.data.pages.push(page);
            }
        });

        if (!props.staticContext.data.pageFolders.find((f => f['_id'] === folder['_id']))) {
            props.staticContext.data.pageFolders.push(folder);
        }
    }

    return (
        <Container styles={{ paddingTop: props.paddingTop, paddingBottom: props.paddingBottom }}>
            {pages.map(page => {
                return (
                    <Item href={page.url}>
                        <ItemWrapper>
                            {
                                folder.pageViewConfig.components.map(id => {
                                    const componentData = folder.pageViewConfig.componentsData[id];
                                    const Component = components[componentData.componentId];

                                    const newData = prepareProps(componentData, folder['page-fields'], page.config['folder-fields'][props.folder], );

                                    return (
                                        <Component
                                            {...newData.props}
                                            __images__={newData.images}
                                            __pages__={pages}
                                            __pageFolders__={props['__pageFolders__']}
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
    folder: PropTypes.string
};

Pages.defaultProps = {
    paddingTop: 'm',
    paddingBottom: 'm'
};

export default memo(Pages);
