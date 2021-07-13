import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from '../../components/Breadcrumbs';
import PageRender from '../../../components/PageRender';
import showNotification from '@utils/showNotification';
import Form from '../../components/Form';
import { main as mainFormat, config as configFormat } from '../../formats/page';
import { Button, Link } from "../../components/Button";
import FloatPanels from '../../components/FloatPanels';
import ComponentRender from '../../components/pageEditor/Component';
import Operations from '../../components/pageEditor/Operations';
import ComponentEditor from '../../components/pageEditor/ComponentEditor';
import OperationsHelper from '../../components/pageEditor/operationsHelper';
import ComponentSelect from '../../components/pageEditor/ComponentSelect';
import { applyFields } from '@constructor-components/helpers';
import styles from './Page.module.css';
import axios from "axios";

const breadcrumbs = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Редактирование'
}];

class Page extends PureComponent {
    static propTypes = {
        match: PropTypes.object,
        history: PropTypes.object
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
        this.update();
    }

    render() {
        const { openedPanelId, page } = this.state;

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
        const { match } = this.props;
        const { errors, page, folders, templates } = this.state;
        const { id } = match.params;

        const prepareFields = (fields, isFolder) => {
            return fields.map(item => {
                const f = {
                    _id: item.id,
                    title: item.name,
                    type: item.type
                };

                switch(item.type) {
                    case 'image': {
                        f.props = {
                            width: isFolder ? 600 : 1200,
                            withoutLogo: true
                        }
                        break;
                    }

                    case 'text': {
                        f.props = {
                            withoutEditor: true
                        }
                        break;
                    }
                }

                return f;
            });
        }

        const renderTemplateFields = (id) => {
            const template = templates.find((item => item['_id'] === id));

            if (template && template['page-fields']) {
                const format = prepareFields(template['page-fields'], false);

                return (
                    <>
                        <div className={styles['settings-block-page-fields-title']}>Поля шаблона: {template.name}</div>
                        <Form
                            format={format}
                            value={page.config['template-fields'] || {}}
                            onChange={(value, error, images) => {
                                this.handleChangeConfig({
                                    ...page.config,
                                    'template-fields': {
                                        ...value,
                                        ['__images__']: images
                                    }
                                })
                            }}
                            images={(page.config['template-fields'] || {})['__images__'] || {}}
                            errors={{}} />
                    </>
                );
            }

            return null;
        };

        const renderFolderFields = (id) => {
            const folder = folders.find(f => f['_id'] === id);

            if (folder) {
                if (folder['page-fields']) {
                    const format = prepareFields(folder['page-fields'], true);

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
                        {templates && page.config.template ? renderTemplateFields(page.config.template) : null}
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
                {page.url ? (
                    <div className={styles['settings-block-buttons']}>
                        <Link
                            caption='Открыть страницу'
                            type='yellow'
                            href={page.url}
                            size='s'
                            className={styles['settings-block-button']}
                        />
                    </div>
                ) : null}
            </div>
        )
    };

    renderPageContent = () => {
        const { operations, componentFieldValues, page, templates } = this.state;

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

                    let tComponentImages = {
                        ...(tComponent.images || {})
                    };

                    if (page.config['template-fields'] && page.config['template-fields']['__images__']) {
                        tComponentImages = {
                            ...tComponentImages,
                            ...page.config['template-fields']['__images__']
                        }
                    }

                    if (tComponentProps['__editable-options__'] && page.config.componentsData[tComponentId]) {
                        Object.keys(tComponentProps['__editable-options__']).forEach(key => {
                            if (tComponentProps['__editable-options__'][key]) {
                                if (page.config.componentsData[tComponentId].props[key] !== undefined) {
                                    tComponentProps[key] = page.config.componentsData[tComponentId].props[key];
                                    tComponentImages = {
                                        ...tComponentImages,
                                        ...(page.config.componentsData[tComponentId].images || {})
                                    }
                                }
                            }
                        });
                    }

                    const togglePropsFormVisible = () => {
                        const newOperations = { ...this.state.operations };
                        newOperations[tComponentId] = {
                            ...newOperations[tComponentId],
                            propsFormVisible: newOperations[tComponentId] ? !newOperations[tComponentId].propsFormVisible : true
                        };

                        this.setState({ operations: newOperations });
                    }

                    if (tComponentProps['__visible__']) {
                        const value = applyFields(componentFieldValues, tComponentProps['__visible__']);
                        if (!value || value === 'false') {
                            return null;
                        }
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
                                    componentImages={tComponentImages}
                                    componentFieldValues={componentFieldValues}
                                    type='forPage' />
                            </Operations>
                            { operations[tComponentId] && operations[tComponentId].propsFormVisible ? (
                                <ComponentEditor
                                    componentId={tComponent.componentId}
                                    componentProps={tComponentProps}
                                    componentImages={tComponentImages}
                                    type='forPage'
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
        const { operations, componentFieldValues, page, templates } = this.state;

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
                            componentImages={component.images}
                            componentFieldValues={componentFieldValues}
                            type='forPage' />
                    </Operations>
                    {operations[id] && operations[id].propsFormVisible ? (
                        <ComponentEditor
                            componentId={component.componentId}
                            componentProps={componentProps}
                            onlyEditableOptions={isTemplateComponent}
                            componentImages={component.images}
                            type='forPage'
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
        const { page } = this.state;

        this.setState({
            page: {
                ...page,
                config: {
                    ...page.config,
                    ...newConfig
                }
            }
        })
    };

    renderComponentSelect = () => {
        const { addComponentPosition, page } = this.state;

        const addComponent = (componentId, props) => {
            this.setOpenedPanel(null);

            const id = Math.floor(Math.random() * (99999999 - 10000000) + 10000000);
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

        return <ComponentSelect onSelect={addComponent} hasCustomComponents type='forPage' />;
    };

    renderComponentByIndex = (blockId, index) => {
        const { operations, componentFieldValues, page } = this.state;

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
                            const id = Math.floor(Math.random() * (99999999 - 10000000) + 10000000);
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
                        componentImages={component.images}
                        componentFieldValues={componentFieldValues}
                        type='forPage' />
                </Operations>
                { operations[`${blockId}:${index}`] && operations[`${blockId}:${index}`].propsFormVisible ? (
                    <ComponentEditor
                        componentId={component.componentId}
                        componentProps={component.props}
                        componentImages={component.images}
                        type='forPage'
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
        this.setState({ errors, page });
    };

    handleChangeConfig = (config) => {
        const { page } = this.state;
        this.setState({
            page: { ...page, config }
        });
    };

    handleSave = async () => {
        const { match } = this.props;
        const { page } = this.state;

        let res;
        if (page['_id']) {
            res = await axios.put(`/api/pages/${page['_id']}`, { page })
        } else {
            res = await axios.post(`/api/pages`, { page });
        }

        const { message, status, data } = res.data;

        showNotification({ message, status });

        switch (status) {
            case 'error':
                if (data && data.errors) {
                    this.setState({ errors: data.errors });
                }
                break;
            case 'success':
                if (match.params.id === 'add') {
                    window.location = '/admin';
                }
                break;
        }
    };

    handleDelete = async () => {
        const { page } = this.state;

        if (window.confirm('Вы действительно хотите удалить страницу?')) {
            const res = await axios.delete(`/api/pages/${page['_id']}`);
            const { message, status } = res.data;

            showNotification({ message, status });

            if (status === 'success') {
                window.location = '/admin';
            }
        }
    };

    setOpenedPanel = (id) => {
        this.setState({ openedPanelId: id })
    }

    update = async () => {
        const { match } = this.props;
        const { id } = match.params;

        let page;
        if (id === 'add') {
            page = {
                config: {
                    components: [],
                    componentsData: {}
                }
            };
        } else {
            const res = await axios.get(`/api/pages/${id}`);

            if (res.data && res.data.status === 'error') {
                showNotification({ status: 'error', message: res.data.message })
                return;
            }

            page = {
                ...res.data.data,
                config: {
                    componentsData: {},
                    components: {},
                    ...res.data.data.config
                }
            };
        }

        this.setState({ page });

        const resTemplates = await axios.get('/api/page-templates');

        if (resTemplates.data && resTemplates.data.status === 'error') {
            showNotification({ status: 'error', message: resTemplates.data.message })
            return;
        }

        this.setState({ templates: resTemplates.data.data });

        const resFolders = await axios.get('/api/page-folders');

        if (resFolders.data && resFolders.data.status === 'error') {
            showNotification({ status: 'error', message: resFolders.data.message })
            return;
        }

        this.setState({ folders: resFolders.data.data });

        const componentFieldValues = {};

        const templates = resTemplates.data.data;

        if (templates && page && page.config.template && page.config['template-fields']) {
            const template = templates.find((item => item['_id'] === page.config.template));

            if (template && template['page-fields']) {
                template['page-fields'].forEach(field => {
                    componentFieldValues[field.id] = {
                        type: field.type,
                        value: page.config['template-fields'][field.id]
                    }
                });
            }
        }

        this.setState({ componentFieldValues });
    }
}

export default Page;
