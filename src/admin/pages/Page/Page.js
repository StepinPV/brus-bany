import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Breadcrumbs from '../../../components/Breadcrumbs';
import PageComponent from '../../../client/components/Page';
import { getPage, setPage, savePage, reset, deletePage, getComponents } from './actions';
import withNotification from '../../../plugins/Notifications/withNotification';
import Form from '../../components/Form';
import { main as mainFormat, config as configFormat } from '../../formats/page';
import { Button } from "../../../components/Button";
import FloatPanels from '../../components/FloatPanels';
import ComponentRender from '../../components/pageEditor/Component';
import withComponentInstances from '../../components/hocs/withComponentInstances';
import withComponentMetas from '../../components/hocs/withComponentMetas';
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

        componentInstances: PropTypes.object,
        componentMetas: PropTypes.object,

        loadComponentInstances: PropTypes.func,
        loadAllComponentMetas: PropTypes.func,
        loadComponentMetas: PropTypes.func,

        customComponents: PropTypes.array
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
            actions.getComponents();
        }

        this.props.loadAllComponentMetas();
    }

    componentDidUpdate(prevProps) {
        const { page, customComponents } = this.props;
        const { page: prevPage } = prevProps;

        if (page && customComponents && ((!prevPage || page.config.components !== prevPage.config.components) || customComponents !== prevProps.customComponents)) {
            this.props.loadComponentInstances(page.config.components, customComponents);
            this.props.loadComponentMetas(page.config.components, customComponents);
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.reset();
    }

    render() {
        const { isPageError, page, customComponents } = this.props;
        const { openedPanelId } = this.state;

        if (isPageError) {
            return <div className={styles.error}>{isPageError}</div>;
        }

        return page && customComponents ? (
            <FloatPanels
                panels={this.floatPanels}
                onChangeOpenedPanel={this.setOpenedPanel}
                openedPanelId={openedPanelId}>
                {this.renderPage()}
            </FloatPanels>
        ) : null;
    }

    renderSettingsBlock = () => {
        const { page, match } = this.props;
        const { errors } = this.state;
        const { id } = match.params;

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

    renderPage = () => {
        const { page } = this.props;
        const { components } = page.config;

        return (
            <PageComponent headerProps={page.config.headerProps}>
                {components ? components.map((component, index) => this.renderComponentByIndex(index)) : null}
                {(!components || !components.length) ? this.renderAddComponent() : null}
            </PageComponent>
        );
    }

    renderAddComponent = () => {
        return (
            <div className={styles['add-button']}>
                <div className={styles['add-button-caption']} onClick={this.enableAddComponentMode}>Добавить новый компонент<br/>+</div>
            </div>
        );
    };

    enableAddComponentMode = (position) => {
        this.setState({
            addComponentPosition: position || 0,
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
        const { page, componentMetas, customComponents } = this.props;

        const addComponent = (componentId) => {
            const newComponents = [...page.config.components];

            const componentMeta = componentMetas[componentId];
            const component = this.props.components.find(component => component['_id'] === componentId);

            newComponents.splice(addComponentPosition, 0, {
                componentId,
                props: componentMeta ? componentMeta.defaultProps : (component ? component.config.defaultProps : {})
            });

            this.setConfig({ components: newComponents });
            this.setOpenedPanel(null);
        }

        return (
            <>
                {Object.keys(componentMetas).map(componentKey => {
                    return componentMetas[componentKey].disabled ? null : (
                        <div
                            key={componentMetas[componentKey].name}
                            className={styles['component-select-item']}
                            onClick={() => { addComponent(componentKey) }}>
                            {componentMetas[componentKey].name}
                        </div>
                    );
                })}
                {customComponents.map(component => {
                    return (
                        <div
                            key={component['_id']}
                            className={styles['component-select-item']}
                            onClick={() => { addComponent(component['_id']) }}>
                            {component['_id']}
                        </div>
                    );
                })}
            </>
        );
    };

    renderComponentByIndex = (index) => {
        const { page, componentInstances, componentMetas, customComponents } = this.props;
        const { operations } = this.state;

        const { componentId } = page.config.components[index];
        const componentMeta = componentMetas[componentId];

        const onChange = (newProps, errors, images) => {
            const newComponents = [...page.config.components];
            newComponents[index].props = newProps;

            this.setConfig({
                __images__: images,
                components: newComponents
            });
        }

        const deleteComponent = (e) => {
            e.stopPropagation();

            const newComponents = [...page.config.components];
            newComponents.splice(index, 1);

            this.setConfig({ components: newComponents });
        }

        const cloneComponent = (e) => {
            e.stopPropagation();

            const newComponents = [...page.config.components];
            newComponents.splice(index + 1, 0, JSON.parse(JSON.stringify(page.config.components[index])));

            this.setConfig({ components: newComponents });
        }

        const togglePropsFormVisible = () => {
            const newOperations = { ...this.state.operations };
            newOperations[index] = {
                ...newOperations[index],
                propsFormVisible: newOperations[index] ? !newOperations[index].propsFormVisible : true
            };

            this.setState({ operations: newOperations });
        }

        const moveUp = (e) => {
            e.stopPropagation();

            const newComponents = [...page.config.components];
            const temp = newComponents[index - 1];
            newComponents[index - 1] = newComponents[index];
            newComponents[index] = temp;

            this.setConfig({ components: newComponents });
            this.setState({ operations: {} });
        };

        const moveBottom = (e) => {
            e.stopPropagation();

            const newComponents = [...page.config.components];
            const temp = newComponents[index + 1];
            newComponents[index + 1] = newComponents[index];
            newComponents[index] = temp;

            this.setConfig({ components: newComponents });
            this.setState({ operations: {} });
        }

        return (
            <ComponentRender
                componentId={componentId}
                propsFormat={componentMeta ? componentMeta.props : []}
                componentProps={page.config.components[index].props}
                onChangeProps={onChange}
                editorMode={operations[index] && operations[index].propsFormVisible}
                toggleEditorMode={togglePropsFormVisible}
                customComponents={customComponents}
                instances={componentInstances}
                operations={{
                    addComponent: () => {
                        this.enableAddComponentMode(index + 1);
                    },
                    moveBottom: index !== page.config.components.length - 1 ? moveBottom : null,
                    moveUp: index !== 0 ? moveUp : null,
                    clone: cloneComponent,
                    delete: deleteComponent
                }}
            />
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

/**
 * mapDispatchToProps
 * @param {*} dispatch
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getPage,
            setPage,
            savePage,
            reset,
            deletePage,
            getComponents
        }, dispatch),
        dispatch
    };
}

function mapStateToProps(state) {
    const { page, isPageFetch, isPageError, customComponents } = state['admin-page'];

    return { page, isPageFetch, isPageError, customComponents };
}

export default connect(mapStateToProps, mapDispatchToProps)(withComponentMetas(withComponentInstances(withNotification(Page))));
