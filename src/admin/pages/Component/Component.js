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
import ComponentEditor from '../../components/pageEditor/ComponentEditor';
import Operations from '../../components/pageEditor/Operations';
import ComponentRender from '../../components/pageEditor/Component';
import OperationsHelper from '../../components/pageEditor/operationsHelper';
import ComponentSelect from '../../components/pageEditor/ComponentSelect';
import Header from '../../components/Header';

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
                    components: []
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
        const { data } = this.props;
        const { addComponentPosition } = this.state;

        const addComponent = (componentId, props) => {
            this.setConfig(OperationsHelper.add(data.config.components, addComponentPosition, {
                componentId,
                props
            }));
            this.setOpenedPanel(null);
        }

        return <ComponentSelect onSelect={addComponent} />;
    };

    renderComponentByIndex = (index) => {
        const { data } = this.props;
        const { operations } = this.state;

        const { componentId } = data.config.components[index];

        const togglePropsFormVisible = () => {
            const newOperations = { ...this.state.operations };
            newOperations[index] = {
                ...newOperations[index],
                propsFormVisible: newOperations[index] ? !newOperations[index].propsFormVisible : true
            };

            this.setState({ operations: newOperations });
        }

        return (
            <Fragment key={`${componentId}-${index}`}>
                <Operations
                    operations={{
                        addComponentTop: () => {
                            this.enableAddComponentMode(index);
                        },
                        addComponentBottom: () => {
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
                    onClick={togglePropsFormVisible}>
                    <ComponentRender
                        componentId={componentId}
                        componentProps={data.config.components[index].props}
                        __images__={data.config['__images__']} />
                </Operations>
                {operations[index] && operations[index].propsFormVisible ? (
                    <ComponentEditor
                        componentId={componentId}
                        componentProps={data.config.components[index].props}
                        onChangeProps={(newProps, errors, images) => {
                            this.setConfig(OperationsHelper.setProps(data.config.components, index, newProps, errors, images));
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
