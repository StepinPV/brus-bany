import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { get, set, save, reset, deleteData } from './actions';
import withNotification from '../../../plugins/Notifications/withNotification';
import Form from '../../components/Form';
import configFormat from '../../formats/component';
import { Button } from '../../../components/Button';
import styles from './Component.module.css';
import FloatPanels from '../../components/FloatPanels';
import ComponentRender from '../../components/pageEditor/Component';
import withComponentInstances from '../../components/hocs/withComponentInstances';
import withComponentMetas from '../../components/hocs/withComponentMetas';
import Header from '../../components/Header';

const breadcrumbsDefault = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Компоненты',
    link: '/admin/components'
}];

class Component extends PureComponent {
    static propTypes = {
        data: PropTypes.object,
        isError: PropTypes.string,
        isFetch: PropTypes.bool,

        actions: PropTypes.object,
        match: PropTypes.object,
        showNotification: PropTypes.func,
        history: PropTypes.object,

        componentInstances: PropTypes.object,
        componentMetas: PropTypes.object,

        loadComponentInstances: PropTypes.func,
        loadAllComponentMetas: PropTypes.func,
        loadComponentMetas: PropTypes.func
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.breadcrumbs) {
            const { match } = nextProps;
            return {
                breadcrumbs: [
                    ...breadcrumbsDefault,
                    { title: match.params.id === 'add' ? 'Создание компонента' : 'Редактирование компонента' }
                ]
            }
        }

        return null;
    }

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
                caption: 'Настройки',
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
        };
    }

    state = {
        errors: {},
        operations: {},
        breadcrumbs: null,
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

        this.props.loadAllComponentMetas();
    }

    componentDidUpdate(prevProps) {
        const { data } = this.props;
        const { data: prevData } = prevProps;

        if (data && (!prevData || data.config.components !== prevData.config.components)) {
            data.config.components.forEach(({ componentId }) => {
                this.props.loadComponentInstances(data.config.components);
                this.props.loadComponentMetas(data.config.components);
            });
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.reset();
    }

    render() {
        const { isError, data } = this.props;
        const { openedPanelId } = this.state;

        if (isError) {
            return <div className={styles.error}>{isError}</div>;
        }

        return data ? (
            <FloatPanels
                panels={this.floatPanels}
                onChangeOpenedPanel={this.setOpenedPanel}
                openedPanelId={openedPanelId}>
                <>
                    <Header />
                    {this.renderData()}
                </>
            </FloatPanels>
        ) : null;
    }

    renderData = () => {
        const { data } = this.props;
        const { components } = data.config;

        return (
            <>
                {components ? components.map((component, index) => this.renderComponentByIndex(index)) : null}
                {(!components || !components.length) ? this.renderAddComponent() : null}
            </>
        );
    }

    renderSettingsBlock = () => {
        const { data, match } = this.props;
        const { breadcrumbs } = this.state;
        const { id } = match.params;

        return (
            <div className={styles['settings-block']}>
                <div className={styles['settings-block-content']}>
                    <Breadcrumbs items={breadcrumbs} />
                    <div className={styles['form-container']}>
                        <Form
                            format={configFormat}
                            value={data.config}
                            onChange={this.setConfig}
                            errors={{}} />
                    </div>
                </div>
                <div className={styles['settings-block-buttons']}>
                    <Button
                        caption='Сохранить компонент'
                        type='yellow'
                        onClick={this.handleSave}
                        size='s'
                        className={styles['settings-block-button']}
                    />
                    {id !== 'add' ? (
                        <Button
                            caption='Удалить компонент'
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

    renderComponentSelect = () => {
        const { data, componentMetas } = this.props;
        const { addComponentPosition } = this.state;

        const { components } = data.config;

        const addComponent = (componentId) => {
            const newComponents = [...components];

            newComponents.splice(addComponentPosition, 0, {
                componentId,
                props: componentMetas[componentId].defaultProps || {}
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
            </>
        );
    };

    renderComponentByIndex = (index) => {
        const { data, componentMetas, componentInstances } = this.props;
        const { operations } = this.state;

        const { componentId } = data.config.components[index];

        const Component = componentInstances[componentId];
        if (Component && componentMetas[componentId]) {
            const onChange = (newProps, errors, images) => {
                const newComponents = [...data.config.components];
                newComponents[index].props = newProps;

                this.setConfig({
                    __images__: images,
                    components: newComponents
                });
            }

            const deleteComponent = (e) => {
                e.stopPropagation();

                const newComponents = [...data.config.components];
                newComponents.splice(index, 1);

                this.setConfig({ components: newComponents });
            }

            const cloneComponent = (e) => {
                e.stopPropagation();

                const newComponents = [...data.config.components];
                newComponents.splice(index + 1, 0, JSON.parse(JSON.stringify(data.config.components[index])));

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

                const newComponents = [...data.config.components];
                const temp = newComponents[index - 1];
                newComponents[index - 1] = newComponents[index];
                newComponents[index] = temp;

                this.setConfig({ components: newComponents });
                this.setState({ operations: {} });
            };

            const moveBottom = (e) => {
                e.stopPropagation();

                const newComponents = [...data.config.components];
                const temp = newComponents[index + 1];
                newComponents[index + 1] = newComponents[index];
                newComponents[index] = temp;

                this.setConfig({ components: newComponents });
                this.setState({ operations: {} });
            }

            return (
                <ComponentRender
                    componentId={componentId}
                    propsFormat={componentMetas[componentId].props}
                    componentProps={data.config.components[index].props}
                    onChangeProps={onChange}
                    editorMode={operations[index] && operations[index].propsFormVisible}
                    toggleEditorMode={togglePropsFormVisible}
                    instances={componentInstances}
                    operations={{
                        addComponent: () => {
                            this.enableAddComponentMode(index + 1);
                        },
                        moveBottom: index !== data.config.components.length - 1 ? moveBottom : null,
                        moveUp: index !== 0 ? moveUp : null,
                        clone: cloneComponent,
                        delete: deleteComponent
                    }}
                />
            );
        }

        return null;
    };

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

    handleSave = async () => {
        const { showNotification, actions, match, history } = this.props;

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
                    history.push('/admin/components');
                }
        }
    };

    handleDelete = async () => {
        const { showNotification, actions, history } = this.props;

        if (window.confirm('Вы действительно хотите удалить компонент?')) {
            const { message, status } = await actions.deleteData();

            showNotification({ message, status });

            if (status === 'success') {
                history.push('/admin/components');
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
            deleteData
        }, dispatch),
        dispatch
    };
}

function mapStateToProps(state) {
    const { data, isFetch, isError } = state['admin-component'];

    return { data, isFetch, isError };
}

export default connect(mapStateToProps, mapDispatchToProps)(withComponentMetas(withComponentInstances(withNotification(Component))));
