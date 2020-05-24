import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Breadcrumbs from '../../../components/Breadcrumbs';
import PageRender from '../../../client/components/PageRender';
import { getPage, setPage, savePage, reset, deletePage, getTemplates } from './actions';
import withNotification from '../../../plugins/Notifications/withNotification';
import Form from '../../components/Form';
import { main as mainFormat, config as configFormat } from '../../formats/page';
import { Button } from "../../../components/Button";
import Select from '../../../components/Select';
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
        templates: PropTypes.array
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
                    components: []
                }
            });
        } else {
            actions.getPage(id);
        }

        actions.getTemplates();
    }

    componentDidUpdate() {
        const { page } = this.props;

        if (page && Array.isArray(page.config.components)) {
            this.setConfig({
                ...page.config,
                components: {
                    ['__content__(main)']: page.config.components
                }
            });

            setTimeout(() => {
                this.handleSave();
            }, 2000);
        }
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

        return page ? (
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
        const { page, match, templates } = this.props;
        const { errors } = this.state;
        const { id } = match.params;

        return (
            <div className={styles['settings-block']}>
                <div className={styles['settings-block-content']}>
                    <Breadcrumbs items={breadcrumbs} />
                    <div className={styles['form-container']}>
                        {templates ? (
                            <div className={styles['form-container-select']}>
                                <Select
                                    title='Шаблон страницы'
                                    items={templates}
                                    hasEmpty
                                    keyProperty='_id'
                                    displayProperty='_id'
                                    selectedKey={page.config.template}
                                    onChange={key => {
                                        if (confirm('Смена шаблона приведет к сбросу страницы')) {
                                            this.setConfig({
                                                template: key,
                                                components: {}
                                            });
                                        }
                                    }}
                                />
                            </div>
                        ) : null}
                        <Form
                            format={mainFormat}
                            value={page}
                            onChange={this.handleChange}
                            errors={errors} />
                        <Form
                            format={configFormat}
                            value={page.config}
                            onChange={this.handleChangeConfig}
                            errors={{}} />
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

        let templateComponents = [{
            componentId: '__content__(main)'
        }];
        let __images__ = page.config['__images__'];

        if (!templates) {
            return;
        }

        if (page.config.template) {
            const templateData = templates.find((item => item['_id'] === page.config.template));

            templateComponents = templateData.config.components;
            __images__ = templateData.config['__images__'];
        }

        return (
            <>
                {templateComponents.map(tComponent => {
                    if (tComponent.componentId.includes('__content__')) {
                        const components = (page.config.components || {})[tComponent.componentId];

                        return (
                            <>
                                {components ? components.map((component, index) => this.renderComponentByIndex(tComponent.componentId, index)) : null}
                                {(!components || !components.length) ? this.renderAddComponent('Добавить новый компонент', `${tComponent.componentId}:0`) : null}
                            </>
                        );
                    }

                    return (
                        <ComponentRender
                            componentId={tComponent.componentId}
                            componentProps={tComponent.props}
                            __images__={__images__} />
                    );
                })}
            </>
        )
    };

    renderSpecialComponent = (id, addTitle) => {
        const { page, templates } = this.props;
        const { operations } = this.state;

        let component = page.config[id];
        let __images__ = page.config['__images__'];
        let isTemplateComponent = false;

        if (!templates) {
            return;
        }

        if (page.config.template) {
            const templateData = templates.find((item => item['_id'] === page.config.template));

            if (templateData.config[id]) {
                component = templateData.config[id];
                __images__ = templateData.config['__images__'];
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

        const renderComponent = () => {
            return (
                <ComponentRender
                    componentId={component.componentId}
                    componentProps={component.props}
                    __images__={__images__} />
            );
        }

        return component ? (
            <Fragment>
                {isTemplateComponent ? renderComponent() : (
                    <Operations
                        onClick={togglePropsFormVisible}
                        operations={{
                            delete: () => {
                                this.setConfig({ [id]: null });
                            }
                        }}>
                        {renderComponent()}
                    </Operations>
                )}
                {operations[id] && operations[id].propsFormVisible ? (
                    <ComponentEditor
                        componentId={component.componentId}
                        componentProps={component.props}
                        onChangeProps={(newProps, errors, images) => {
                            this.setConfig({
                                [id]: {
                                    ...page.config[id],
                                    props: newProps
                                },
                                __images__: images
                            });
                        }} />
                ) : null}
            </Fragment>
        ) : this.renderAddComponent(addTitle, id);
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

            const newComponentData = { componentId, props };

            if (addComponentPosition === 'header') {
                this.setConfig({ header: newComponentData });
                return;
            }

            if (addComponentPosition === 'footer') {
                this.setConfig({ footer: newComponentData });
                return;
            }

            const [blockId, position] = addComponentPosition.split(':');

            const components = page.config.components || {};

            return this.setConfig({
                components: {
                    ...components,
                    [blockId]: OperationsHelper.add(components[blockId] || [], position, newComponentData)
                }
            });
        }

        return <ComponentSelect onSelect={addComponent} hasCustomComponents />;
    };

    renderComponentByIndex = (blockId, index) => {
        const { page } = this.props;
        const { operations } = this.state;

        const components = page.config.components[blockId];
        const component = components[index];

        const togglePropsFormVisible = () => {
            const newOperations = { ...this.state.operations };
            newOperations[`${blockId}:${index}`] = {
                ...newOperations[`${blockId}:${index}`],
                propsFormVisible: newOperations[`${blockId}:${index}`] ? !newOperations[`${blockId}:${index}`].propsFormVisible : true
            };

            this.setState({ operations: newOperations });
        }

        return (
            <Fragment key={`${component.componentId}-${index}`}>
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
                            this.setConfig({
                                components: {
                                    ...page.config.components,
                                    [blockId]: OperationsHelper.clone(components, index)
                                }
                            });
                        },
                        delete: () => {
                            this.setConfig({
                                components: {
                                    ...page.config.components,
                                    [blockId]: OperationsHelper.delete(components, index)
                                }
                            });
                        }
                    }}
                    onClick={togglePropsFormVisible}>
                    <ComponentRender
                        componentId={component.componentId}
                        componentProps={component.props}
                        __images__={page.config['__images__']} />
                </Operations>
                { operations[`${blockId}:${index}`] && operations[`${blockId}:${index}`].propsFormVisible ? (
                    <ComponentEditor
                        componentId={component.componentId}
                        componentProps={component.props}
                        onChangeProps={(newProps, errors, images) => {
                            const newData = OperationsHelper.setProps(components, index, newProps, errors, images);
                            this.setConfig({
                                __images__: newData.__images__,
                                components: {
                                    ...page.config.components,
                                    [blockId]: newData.components
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
                    history.push('/admin/pages');
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
                history.push('/admin/pages');
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
            getTemplates
        }, dispatch),
        dispatch
    };
}

function mapStateToProps(state) {
    const { page, isPageFetch, isPageError, templates } = state['admin-page'];

    return { page, isPageFetch, isPageError, templates };
}

export default connect(mapStateToProps, mapDispatchToProps)(withNotification(Page));
