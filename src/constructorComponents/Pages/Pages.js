import React, { memo } from 'react';
import PropTypes from "prop-types";
import * as components from '@constructor-components';
import styles from './Pages.module.css';
import cx from 'classnames';

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
    return <div className={styles['not-found']}>Источник списка не выбран</div>;
}

function Pages(props) {
    const className = cx(
        styles.container,
        props.paddingTop !== 'none' ? styles[`padding-top-${props.paddingTop}`] : null,
        props.paddingBottom !== 'none' ? styles[`padding-bottom-${props.paddingBottom}`] : null
    );

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
        <div className={className}>
            {pages.map(page => {
                return (
                    <a href={page.url} className={styles['item']}>
                        <div className={styles['item-wrapper']}>
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
                        </div>
                    </a>
                )
            })}
            <div className={styles['item']} />
            <div className={styles['item']} />
        </div>
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
