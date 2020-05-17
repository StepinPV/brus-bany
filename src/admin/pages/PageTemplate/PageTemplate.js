import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { get, set, save, reset, deleteTemplate, getComponents } from './actions';
import withNotification from '../../../plugins/Notifications/withNotification';
import { Button } from "../../../components/Button";
import FloatPanels from '../../components/FloatPanels';
import ComponentRender from '../../components/pageEditor/Component';
import OperationsHelper from '../../components/pageEditor/operations';
import withComponentInstances from '../../components/hocs/withComponentInstances';
import withComponentMetas from '../../components/hocs/withComponentMetas';
import styles from './PageTemplate.module.css';

const breadcrumbs = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Шаблоны страниц',
    link: '/admin/page-templates'
}, {
    title: 'Редактирование'
}];

class PageTemplate extends PureComponent {
    static propTypes = {
        data: PropTypes.object,
        isDataError: PropTypes.string,
        isDataFetch: PropTypes.bool,

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
            actions.set({
                config: {
                    components: []
                }
            });
        } else {
            actions.get(id);
        }

        actions.getComponents();
        this.props.loadAllComponentMetas();
    }

    componentDidUpdate(prevProps) {
        const { data, customComponents } = this.props;
        const { data: prevData } = prevProps;

        if (data && customComponents && ((!prevData || data.config.components !== prevData.config.components) || customComponents !== prevProps.customComponents)) {
            this.props.loadComponentInstances(data.config.components, customComponents);
            this.props.loadComponentMetas(data.config.components, customComponents);
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.reset();
    }

    render() {
        const { isDataError, data, customComponents } = this.props;
        const { openedPanelId } = this.state;

        if (isDataError) {
            return <div className={styles.error}>{isDataError}</div>;
        }

        return data && customComponents ? (
            <FloatPanels
                panels={this.floatPanels}
                onChangeOpenedPanel={this.setOpenedPanel}
                openedPanelId={openedPanelId}>
                {this.renderPage()}
            </FloatPanels>
        ) : null;
    }

    renderSettingsBlock = () => {
        const { data, match } = this.props;
        const { errors } = this.state;
        const { id } = match.params;

        return (
            <div className={styles['settings-block']}>
                <div className={styles['settings-block-content']}>
                    <Breadcrumbs items={breadcrumbs} />
                    <div className={styles['form-container']}>
                    </div>
                </div>
                <div className={styles['settings-block-buttons']}>
                    <Button
                        caption='Сохранить шаблон'
                        type='yellow'
                        onClick={this.handleSave}
                        size='s'
                        className={styles['settings-block-button']}
                    />
                    {id !== 'add' ? (
                        <Button
                            caption='Удалить шаблон'
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
        const { data } = this.props;
        const { components } = data.config;

        return (
            <>
                {components ? components.map((component, index) => this.renderComponentByIndex(index)) : null}
                {(!components || !components.length) ? this.renderAddComponent() : null}
            </>
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
        const { actions, data } = this.props;

        actions.set({
            ...data,
            config: {
                ...data.config,
                ...newConfig
            }
        });
    };

    renderComponentSelect = () => {
        const { addComponentPosition } = this.state;
        const { data, componentMetas, customComponents } = this.props;

        const addComponent = (componentId) => {
            const componentMeta = componentMetas[componentId];
            const component = customComponents.find(component => component['_id'] === componentId);

            this.setConfig(OperationsHelper.add(data.config.components, addComponentPosition, {
                componentId,
                props: componentMeta ? componentMeta.defaultProps : (component ? component.config.defaultProps : {})
            }));
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
        const { data, componentInstances, componentMetas, customComponents } = this.props;
        const { operations } = this.state;

        const { componentId } = data.config.components[index];
        const componentMeta = componentMetas[componentId];

        const togglePropsFormVisible = () => {
            const newOperations = { ...this.state.operations };
            newOperations[index] = {
                ...newOperations[index],
                propsFormVisible: newOperations[index] ? !newOperations[index].propsFormVisible : true
            };

            this.setState({ operations: newOperations });
        }

        return (
            <ComponentRender
                componentId={componentId}
                propsFormat={componentMeta ? componentMeta.props : []}
                componentProps={data.config.components[index].props}
                editorMode={operations[index] && operations[index].propsFormVisible}
                toggleEditorMode={togglePropsFormVisible}
                customComponents={customComponents}
                instances={componentInstances}
                onChangeProps={(newProps, errors, images) => {
                    this.setConfig(OperationsHelper.setProps(data.config.components, index, newProps, errors, images));
                }}
                operations={{
                    addComponent: () => {
                        this.enableAddComponentMode(index + 1);
                    },
                    moveBottom: index !== data.config.components.length - 1 ? () => {
                        this.setConfig(OperationsHelper.moveBottom(data.config.components, index));
                        this.setState({ operations: {} });
                    } : null,
                    moveUp: index !== 0 ? () => {
                        this.setConfig(OperationsHelper.moveUp(data.config.components, index));
                        this.setState({ operations: {} });
                    } : null,
                    clone: () => {
                        this.setConfig(OperationsHelper.clone(data.config.components, index));
                    },
                    delete: () => {
                        this.setConfig(OperationsHelper.delete(data.config.components, index));
                    }
                }}
            />
        );
    };

    handleChange = (data, errors) => {
        const { actions } = this.props;

        this.setState({ errors });
        actions.set(data);
    };

    handleChangeConfig = (config) => {
        const { actions, data } = this.props;
        actions.set({ ...data, config });
    };

    handleSave = async () => {
        const { showNotification, actions, history, match } = this.props;

        const { message, status, data } = await actions.save();

        showNotification({ message, status });

        switch (status) {
            case 'error':
                if (data && data.errors) {
                    this.setState({ errors: data.errors });
                }
                break;
            case 'success':
                if (match.params.id === 'add') {
                    history.push('/admin/page-templates');
                }
                break;
        }
    };

    handleDelete = async () => {
        const { showNotification, actions, history } = this.props;

        if (window.confirm('Вы действительно хотите удалить шаблон?')) {
            const { message, status } = await actions.deleteTemplate();

            showNotification({ message, status });

            if (status === 'success') {
                history.push('/admin/page-templates');
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
            get,
            set,
            save,
            reset,
            deleteTemplate,
            getComponents
        }, dispatch),
        dispatch
    };
}

function mapStateToProps(state) {
    const { data, isDataFetch, isDataError, customComponents } = state['admin-page-template'];

    return { data, isDataFetch, isDataError, customComponents };
}

export default connect(mapStateToProps, mapDispatchToProps)(withComponentMetas(withComponentInstances(withNotification(PageTemplate))));
