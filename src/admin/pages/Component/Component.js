import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { get, set, save, reset, deleteData } from './actions';
import withNotification from '../../../plugins/Notifications/withNotification';
import Form from '../../components/Form';
import mainFormat from '../../formats/component';
import { Button } from '../../../components/Button';
import styles from './Component.module.css';
import FloatPanels from '../../components/FloatPanels';
import ComponentEditor from '../../components/pageEditor/ComponentEditor';
import Operations from '../../components/pageEditor/Operations';
import ComponentRender from '../../components/pageEditor/Component';
import OperationsHelper from '../../components/pageEditor/operationsHelper';
import ComponentSelect from '../../components/pageEditor/ComponentSelect';
import Header from '../../components/Header';
import { getTheme } from '../../../constructorComponents/theme';
import { ThemeProvider } from 'emotion-theming';

const breadcrumbs = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Компоненты',
    link: '/admin/components'
}, {
    title: 'Редактирование'
}];

class Component extends PureComponent {
    static propTypes = {
        data: PropTypes.object,
        isError: PropTypes.string,
        isFetch: PropTypes.bool,

        actions: PropTypes.object,
        match: PropTypes.object,
        showNotification: PropTypes.func,
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
        addComponentPosition: null,
        openedPanelId: null
    };

    componentDidMount() {
        const { match, actions } = this.props;
        const { id } = match.params;

        if (id === 'add') {
            actions.set({
                config: {
                    components: [],
                    componentsData: {}
                }
            });
        } else {
            actions.get(id);
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

        // TODO
        return data && data.config.componentsData ? (
            <ThemeProvider theme={getTheme()}>
                <FloatPanels
                    panels={this.floatPanels}
                    onChangeOpenedPanel={this.setOpenedPanel}
                    openedPanelId={openedPanelId}>
                    <>
                        <Header />
                        {this.renderData()}
                    </>
                </FloatPanels>
            </ThemeProvider>
        ) : null;
    }

    renderData = () => {
        const { data } = this.props;
        const { components } = data.config;

        return (
            <>
                {components ? components.map((componentId, index) => this.renderComponentByIndex(index)) : null}
                {(!components || !components.length) ? this.renderAddComponent() : null}
            </>
        );
    }

    renderSettingsBlock = () => {
        const { data, match } = this.props;
        const { id } = match.params;

        return (
            <div className={styles['settings-block']}>
                <div className={styles['settings-block-content']}>
                    <Breadcrumbs items={breadcrumbs} />
                    <div className={styles['form-container']}>
                        <Form
                            format={mainFormat}
                            value={data}
                            onChange={this.handleChange}
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
        const { data } = this.props;
        const { addComponentPosition } = this.state;

        const addComponent = (componentId, props) => {
            const id = Math.floor(Math.random() * (9999 - 1000) + 1000);
            this.setConfig({
                componentsData: {
                    ...data.config.componentsData,
                    [id]: {
                        componentId,
                        props
                    }
                },
                components: OperationsHelper.add(data.config.components, addComponentPosition, id)
            });
            this.setOpenedPanel(null);
        }

        return <ComponentSelect onSelect={addComponent} />;
    };

    renderComponentByIndex = (index) => {
        const { data } = this.props;
        const { operations } = this.state;

        const componentData = data.config.componentsData[data.config.components[index]];

        const togglePropsFormVisible = () => {
            const newOperations = { ...this.state.operations };
            newOperations[index] = {
                ...newOperations[index],
                propsFormVisible: newOperations[index] ? !newOperations[index].propsFormVisible : true
            };

            this.setState({ operations: newOperations });
        }

        return (
            <Fragment key={`${componentData.componentId}-${index}`}>
                <Operations
                    operations={{
                        addComponentTop: () => {
                            this.enableAddComponentMode(index);
                        },
                        addComponentBottom: () => {
                            this.enableAddComponentMode(index + 1);
                        },
                        moveBottom: index !== data.config.components.length - 1 ? () => {
                            this.setConfig({ components: OperationsHelper.moveBottom(data.config.components, index) });
                            this.setState({ operations: {} });
                        } : null,
                        moveUp: index !== 0 ? () => {
                            this.setConfig({ components: OperationsHelper.moveUp(data.config.components, index) });
                            this.setState({ operations: {} });
                        } : null,
                        clone: () => {
                            const id = Math.floor(Math.random() * (9999 - 1000) + 1000);
                            this.setConfig({
                                componentsData: {
                                    ...data.config.componentsData,
                                    [id]: { ...componentData }
                                },
                                components: OperationsHelper.clone(data.config.components, index)
                            });
                        },
                        options: togglePropsFormVisible,
                        delete: () => {
                            const newComponentsData = {
                                ...data.config.componentsData
                            }

                            delete newComponentsData[data.config.components[index]];

                            this.setConfig({
                                newComponentsData,
                                components: OperationsHelper.delete(data.config.components, index)
                            });
                        }
                    }}
                    onClick={togglePropsFormVisible}>
                    <ComponentRender
                        componentId={componentData.componentId}
                        componentProps={componentData.props}
                        componentImages={componentData.images} />
                </Operations>
                {operations[index] && operations[index].propsFormVisible ? (
                    <ComponentEditor
                        componentId={componentData.componentId}
                        componentProps={componentData.props}
                        componentImages={componentData.images}
                        modifyProps={props => {
                            return [...props, {
                                _id: `__editable-options__`,
                                title: `Редактируемые опции`,
                                type: 'object',
                                format: props.map(prop => {
                                    return {
                                        _id: prop['_id'],
                                        title: prop['title'],
                                        type: 'boolean'
                                    }
                                })
                            }];
                        }}
                        onChangeProps={(newProps, errors, images) => {
                            this.setConfig({
                                componentsData: {
                                    ...data.config.componentsData,
                                    [data.config.components[index]]: {
                                        ...data.config.componentsData[data.config.components[index]],
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

    handleChange = (data, errors) => {
        const { actions } = this.props;

        this.setState({ errors });
        actions.set(data);
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

export default connect(mapStateToProps, mapDispatchToProps)(withNotification(Component));
