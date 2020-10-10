import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Breadcrumbs from '../../../components/Breadcrumbs';
import PageRender from '../../../client/components/PageRender';
import { getPage, setPage, savePage, reset, deletePage, getTemplates, getFolders } from './actions';
import withNotification from '../../../plugins/Notifications/withNotification';
import Form from '../../components/Form';
import { main as mainFormat, config as configFormat } from '../../formats/page';
import { Button } from "../../../components/Button";
import FloatPanels from '../../components/FloatPanels';
import ComponentRender from '../../components/pageEditor/Component';
import Operations from '../../components/pageEditor/Operations';
import ComponentEditor from '../../components/pageEditor/ComponentEditor';
import OperationsHelper from '../../components/pageEditor/operationsHelper';
import ComponentSelect from '../../components/pageEditor/ComponentSelect';
import styles from './Page.module.css';

const breadcrumbs = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Страницы',
    link: '/admin/pages'
}, {
    title: 'Редактирование'
}];

class Page extends PureComponent {
    static propTypes = {
        page: PropTypes.object,
        isPageError: PropTypes.string,
        isPageFetch: PropTypes.bool,

        actions: PropTypes.object,
        match: PropTypes.object,
        showNotification: PropTypes.func,
        history: PropTypes.object,
        templates: PropTypes.array,
        folders: PropTypes.array
    };

    constructor(props) {
        super(props);

        this.floatPanels = {
            'settings': {
                button: {
                    caption: '☰',
                    style: {
                        top: '100px'
                    }
                },
                caption: 'Настройки страницы',
                containerStyle: {
                    left: 'max(-100%, -600px)',
                    width: '600px'
                },
                content: this.renderSettingsBlock
            },
            'select-component': {
                caption: 'Добавление компонента',
                containerStyle: {
                    left: 'max(-100%, -400px)',
                    width: '400px'
                },
                content: this.renderComponentSelect
            }
        }
    }

    state = {
        errors: {},
        operations: {},
        addComponentPosition: null,
        openedPanelId: null
    };

    componentDidMount() {
        const { match, actions } = this.props;
        const { id } = match.params;

        if (id === 'add') {
            actions.setPage({
                config: {
                    components: [],
                    componentsData: {}
                }
            });
        } else {
            actions.getPage(id);
        }

        actions.getTemplates();
        actions.getFolders();
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.reset();
    }

    render() {
        const { isPageError, page } = this.props;
        const { openedPanelId } = this.state;

        if (isPageError) {
            return <div className={styles.error}>{isPageError}</div>;
        }

        // TODO
        return page && page.config && page.config.componentsData ? (
            <FloatPanels
                panels={this.floatPanels}
                onChangeOpenedPanel={this.setOpenedPanel}
                openedPanelId={openedPanelId}>
                <PageRender
                    header={this.renderSpecialComponent('header', 'Добавить шапку')}
                    footer={this.renderSpecialComponent('footer', 'Добавить подвал')}>
                    {this.renderPageContent()}
                </PageRender>
            </FloatPanels>
        ) : null;
    }

    renderSettingsBlock = () => {
        const { page, match, templates, folders } = this.props;
        const { errors } = this.state;
        const { id } = match.params;

        const renderFolderFields = (id) => {
            const folder = folders.find(f => f['_id'] === id);

            if (folder) {
                if (folder['page-fields']) {
                    const format = folder['page-fields'].map(({ item }) => {
                        const f = {
                            _id: item.id,
                            title: item.value,
                            type: item.typeId
                        };

                        if (item.typeId === 'image') {
                            f.props = {
                                withoutLogo: true,
                                globalStore: true
                            }
                        }

                        return f;
                    });

                    return (
                        <>
                            <div className={styles['settings-block-page-fields-title']}>Поля для папки: {folder.name}</div>
                            <Form
                                format={format}
                                value={(page.config['folder-fields'] || {})[id] || {}}
                                onChange={(value, error, images) => {
                                    this.handleChangeConfig({
                                        ...page.config,
                                        'folder-fields': {
                                            ...(page.config['folder-fields'] || {}),
                                            [id]: {
                                                ...value,
                                                ['__images__']: images
                                            }
                                        }
                                    })
                                }}
                                images={((page.config['folder-fields'] || {})[id] || {})['__images__'] || {}}
                                errors={{}} />
                            {folder.folder ? renderFolderFields(folder.folder) : null}
                        </>
                    );
                } else if (folder.folder) {
                    return renderFolderFields(folder.folder);
                }
            }

            return null;
        };

        return (
            <div className={styles['settings-block']}>
                <div className={styles['settings-block-content']}>
                    <Breadcrumbs items={breadcrumbs} />
                    <div className={styles['form-container']}>
                        <Form
                            format={mainFormat}
                            value={page}
                            onChange={this.handleChange}
                            errors={errors} />
                        <Form
                            format={configFormat}
                            value={page.config}
                            onChange={(config) => {
                                if (page.config.template !== config.template) {
                                    if (confirm('Смена шаблона приведет к сбросу страницы')) {
                                        this.handleChangeConfig({
                                            ...config,
                                            components: {},
                                            componentsData: {},
                                            footer: null,
                                            header: null
                                        });
                                    }
                                    return;
                                }

                                this.handleChangeConfig(config);
                            }}
                            errors={{}} />
                        {folders && page.config.folder ? renderFolderFields(page.config.folder) : null}
                    </div>
                </div>
                <div className={styles['settings-block-buttons']}>
                    <Button
                        caption='Сохранить страницу'
                        type='yellow'
                        onClick={this.handleSave}
                        size='s'
                        className={styles['settings-block-button']}
                    />
                    {id !== 'add' ? (
                        <Button
                            caption='Удалить страницу'
                            type='red'
                            size='s'
                            onClick={this.handleDelete}
                            className={styles['settings-block-button']}
                        />
                    ) : null}
                </div>
            </div>
        )
    };

    renderPageContent = () => {
        const { page, templates } = this.props;
        const { operations } = this.state;

        let templateComponents = [0];
        let templateComponentsData = {
            0: {
                componentId: '__content__(main)'
            }
        };

        if (!templates) {
            return;
        }

        if (page.config.template) {
            const templateData = templates.find((item => item['_id'] === page.config.template));

            templateComponents = templateData.config.components;
            templateComponentsData = templateData.config.componentsData;
        }

        return (
            <>
                {templateComponents.map(tComponentId => {
                    const tComponent = templateComponentsData[tComponentId];

                    if (tComponent.componentId.includes('__content__')) {
                        const components = (page.config.components || {})[tComponent.componentId];

                        return (
                            <Fragment key={tComponentId}>
                                {components ? components.map((componentId, index) => this.renderComponentByIndex(tComponent.componentId, index)) : null}
                                {(!components || !components.length) ? this.renderAddComponent('Добавить новый компонент', `${tComponent.componentId}:0`) : null}
                            </Fragment>
                        );
                    }

                    const tComponentProps = {
                        ...tComponent.props
                    };

                    if (tComponentProps['__editable-options__'] && page.config.componentsData[tComponentId]) {
                        Object.keys(tComponentProps['__editable-options__']).forEach(key => {
                            if (tComponentProps['__editable-options__'][key]) {
                                if (page.config.componentsData[tComponentId].props[key] !== undefined) {
                                    tComponentProps[key] = page.config.componentsData[tComponentId].props[key];
                                }
                            }
                        });
                    }

                    const togglePropsFormVisible = () => {
                        const newOperations = { ...this.state.operations };
                        newOperations[tComponent.componentId] = {
                            ...newOperations[tComponent.componentId],
                            propsFormVisible: newOperations[tComponent.componentId] ? !newOperations[tComponent.componentId].propsFormVisible : true
                        };

                        this.setState({ operations: newOperations });
                    }

                    return (
                        <Fragment key={tComponentId}>
                            <Operations
                                onClick={togglePropsFormVisible}
                                operations={{
                                    options: togglePropsFormVisible
                                }}>
                                <ComponentRender
                                    componentId={tComponent.componentId}
                                    componentProps={tComponentProps}
                                    componentImages={tComponent.images} />
                            </Operations>
                            { operations[tComponent.componentId] && operations[tComponent.componentId].propsFormVisible ? (
                                <ComponentEditor
                                    componentId={tComponent.componentId}
                                    componentProps={tComponentProps}
                                    componentImages={tComponent.images}
                                    onlyEditableOptions
                                    onChangeProps={(newProps, errors, images) => {
                                        this.setConfig({
                                            componentsData: {
                                                ...page.config.componentsData,
                                                [tComponentId]: {
                                                    ...page.config.componentsData[tComponentId],
                                                    props: newProps,
                                                    images
                                                }
                                            }
                                        });
                                    }} />
                            ) : null}
                        </Fragment>
                    );
                })}
            </>
        )
    };

    renderSpecialComponent = (id, addTitle) => {
        const { page, templates, showNotification } = this.props;
        const { operations } = this.state;

        let configId = page.config[id];
        let component = page.config.componentsData[configId];
        let isTemplateComponent = false;

        if (!templates) {
            return;
        }

        if (page.config.template) {
            const templateData = templates.find((item => item['_id'] === page.config.template));

            if (templateData.config[id]) {
                configId = templateData.config[id];
                component = templateData.config.componentsData[configId];
                isTemplateComponent = true;
            }
        }

        const togglePropsFormVisible = () => {
            const newOperations = { ...this.state.operations };
            newOperations[id] = {
                ...newOperations[id],
                propsFormVisible: newOperations[id] ? !newOperations[id].propsFormVisible : true
            };

            this.setState({ operations: newOperations });
        }

        if (component) {
            const componentProps = {
                ...component.props
            };

            if (componentProps['__editable-options__'] && page.config.componentsData[configId]) {
                Object.keys(componentProps['__editable-options__']).forEach(key => {
                    if (componentProps['__editable-options__'][key]){
                        if (page.config.componentsData[configId].props[key] !== undefined) {
                            componentProps[key] = page.config.componentsData[configId].props[key];
                        }
                    }
                });
            }

            return (
                <Fragment>
                    <Operations
                        onClick={togglePropsFormVisible}
                        operations={isTemplateComponent ? {} : {
                            options: togglePropsFormVisible,
                            copy: () => {
                                localStorage.setItem('PAGE_EDITOR_COMPONENT_BUFFER', JSON.stringify(component));
                                showNotification({ message: 'Компонент скопирован', status: 'success' });
                            },
                            delete: () => {
                                const newComponentsData = {
                                    ...page.config.componentsData
                                }

                                delete newComponentsData[page.config[id]];

                                this.setConfig({
                                    componentsData: newComponentsData,
                                    [id]: null
                                });
                            }
                        }}>
                        <ComponentRender
                            componentId={component.componentId}
                            componentProps={componentProps}
                            componentImages={component.images} />
                    </Operations>
                    {operations[id] && operations[id].propsFormVisible ? (
                        <ComponentEditor
                            componentId={component.componentId}
                            componentProps={componentProps}
                            onlyEditableOptions={isTemplateComponent}
                            componentImages={component.images}
                            onChangeProps={(newProps, errors, images) => {
                                this.setConfig({
                                    componentsData: {
                                        ...page.config.componentsData,
                                        [configId]: {
                                            ...page.config.componentsData[configId],
                                            props: newProps,
                                            images
                                        }
                                    }
                                });
                            }} />
                    ) : null}
                </Fragment>
            )
        }

        return this.renderAddComponent(addTitle, id);
    };

    renderAddComponent = (title, position) => {
        return (
            <div className={styles['add-button']}>
                <div className={styles['add-button-caption']} onClick={() => {
                    this.enableAddComponentMode(position)
                }}>{title}</div>
            </div>
        );
    };

    enableAddComponentMode = (position) => {
        this.setState({
            addComponentPosition: position,
            openedPanelId: 'select-component'
        });
    }

    setConfig = (newConfig) => {
        const { actions, page } = this.props;

        actions.setPage({
            ...page,
            config: {
                ...page.config,
                ...newConfig
            }
        });
    };

    renderComponentSelect = () => {
        const { addComponentPosition } = this.state;
        const { page } = this.props;

        const addComponent = (componentId, props) => {
            this.setOpenedPanel(null);

            const id = Math.floor(Math.random() * (9999 - 1000) + 1000);
            const newComponentData = { componentId, props };
            const newComponentsData = {
                ...page.config.componentsData,
                [id]: newComponentData
            };

            if (addComponentPosition === 'header') {
                this.setConfig({ header: id, componentsData: newComponentsData });
                return;
            }

            if (addComponentPosition === 'footer') {
                this.setConfig({ footer: id, componentsData: newComponentsData });
                return;
            }

            const [blockId, position] = addComponentPosition.split(':');

            const components = page.config.components || {};

            return this.setConfig({
                componentsData: newComponentsData,
                components: {
                    ...components,
                    [blockId]: OperationsHelper.add(components[blockId] || [], position, id)
                }
            });
        }

        return <ComponentSelect onSelect={addComponent} hasCustomComponents />;
    };

    renderComponentByIndex = (blockId, index) => {
        const { page, showNotification } = this.props;
        const { operations } = this.state;

        const components = page.config.components[blockId];
        const component = page.config.componentsData[components[index]];

        const togglePropsFormVisible = () => {
            const newOperations = { ...this.state.operations };
            newOperations[`${blockId}:${index}`] = {
                ...newOperations[`${blockId}:${index}`],
                propsFormVisible: newOperations[`${blockId}:${index}`] ? !newOperations[`${blockId}:${index}`].propsFormVisible : true
            };

            this.setState({ operations: newOperations });
        }

        return (
            <Fragment key={page.config.components[blockId][index]}>
                <Operations
                    operations={{
                        addComponentTop: () => {
                            this.enableAddComponentMode(`${blockId}:${index}`);
                        },
                        addComponentBottom: () => {
                            this.enableAddComponentMode(`${blockId}:${index + 1}`);
                        },
                        moveBottom: index !== components.length - 1 ? () => {
                            this.setConfig({
                                components: {
                                    ...page.config.components,
                                    [blockId]: OperationsHelper.moveBottom(components, index)
                                }
                            });
                            this.setState({ operations: {} });
                        } : null,
                        moveUp: index !== 0 ? () => {
                            this.setConfig({
                                components: {
                                    ...page.config.components,
                                    [blockId]: OperationsHelper.moveUp(components, index)
                                }
                            });
                            this.setState({ operations: {} });
                        } : null,
                        clone: () => {
                            const id = Math.floor(Math.random() * (9999 - 1000) + 1000);
                            this.setConfig({
                                componentsData: {
                                    ...page.config.componentsData,
                                    [id]: JSON.parse(JSON.stringify(page.config.componentsData[components[index]]))
                                },
                                components: {
                                    ...page.config.components,
                                    [blockId]: [...(page.config.components[blockId].splice(index, 0, id) && page.config.components[blockId])]
                                }
                            });
                        },
                        copy: () => {
                            localStorage.setItem('PAGE_EDITOR_COMPONENT_BUFFER', JSON.stringify(page.config.componentsData[components[index]]));
                            showNotification({ message: 'Компонент скопирован', status: 'success' });
                        },
                        options: togglePropsFormVisible,
                        delete: () => {
                            const newComponentsData = {
                                ...page.config.componentsData
                            }

                            delete newComponentsData[page.config.components[blockId][index]];

                            this.setConfig({
                                componentsData: newComponentsData,
                                components: {
                                    ...page.config.components,
                                    [blockId]: OperationsHelper.delete(page.config.components[blockId], index)
                                }
                            });
                        }
                    }}
                    onClick={togglePropsFormVisible}>
                    <ComponentRender
                        componentId={component.componentId}
                        componentProps={component.props}
                        componentImages={component.images} />
                </Operations>
                { operations[`${blockId}:${index}`] && operations[`${blockId}:${index}`].propsFormVisible ? (
                    <ComponentEditor
                        componentId={component.componentId}
                        componentProps={component.props}
                        componentImages={component.images}
                        onChangeProps={(newProps, errors, images) => {
                            this.setConfig({
                                componentsData: {
                                    ...page.config.componentsData,
                                    [components[index]]: {
                                        ...page.config.componentsData[components[index]],
                                        props: newProps,
                                        images
                                    }
                                }
                            });
                        }} />
                ) : null}
            </Fragment>
        );
    };

    handleChange = (page, errors) => {
        const { actions } = this.props;

        this.setState({ errors });
        actions.setPage(page);
    };

    handleChangeConfig = (config) => {
        const { actions, page } = this.props;
        actions.setPage({ ...page, config });
    };

    handleSave = async () => {
        const { showNotification, actions, history, match } = this.props;

        const { message, status, data } = await actions.savePage();

        showNotification({ message, status });

        switch (status) {
            case 'error':
                if (data && data.errors) {
                    this.setState({ errors: data.errors });
                }
                break;
            case 'success':
                if (match.params.id === 'add') {
                    window.location = '/admin/pages';
                }
                break;
        }
    };

    handleDelete = async () => {
        const { showNotification, actions, history } = this.props;

        if (window.confirm('Вы действительно хотите удалить страницу?')) {
            const { message, status } = await actions.deletePage();

            showNotification({ message, status });

            if (status === 'success') {
                window.location = '/admin/pages';
            }
        }
    };

    setOpenedPanel = (id) => {
        this.setState({ openedPanelId: id })
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getPage,
            setPage,
            savePage,
            reset,
            deletePage,
            getTemplates,
            getFolders
        }, dispatch),
        dispatch
    };
}

function mapStateToProps(state) {
    const { page, isPageFetch, isPageError, templates, folders } = state['admin-page'];

    return { page, isPageFetch, isPageError, templates, folders };
}

export default connect(mapStateToProps, mapDispatchToProps)(withNotification(Page));
