import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from '../../components/Breadcrumbs';
import showNotification from '@utils/showNotification';
import Form from '../../components/Form';
import mainFormat from '../../formats/component';
import { Button } from '../../components/Button';
import styles from './Component.module.css';
import FloatPanels from '../../components/FloatPanels';
import ComponentEditor from '../../components/pageEditor/ComponentEditor';
import Operations from '../../components/pageEditor/Operations';
import ComponentRender from '../../components/pageEditor/Component';
import OperationsHelper from '../../components/pageEditor/operationsHelper';
import ComponentSelect from '../../components/pageEditor/ComponentSelect';
import Header from '../../components/Header';
import axios from 'axios';

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
        this.updateComponent();
    }

    render() {
        const { openedPanelId, data } = this.state;

        // TODO
        return data && data.config.componentsData ? (
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
        const { data } = this.state;
        const { components } = data.config;

        return (
            <>
                {components ? components.map((componentId, index) => this.renderComponentByIndex(index)) : null}
                {(!components || !components.length) ? this.renderAddComponent() : null}
            </>
        );
    }

    renderSettingsBlock = () => {
        const { data } = this.state;
        const { match } = this.props;
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
        const { addComponentPosition, data } = this.state;

        const addComponent = (componentId, props) => {
            const id = Math.floor(Math.random() * (99999999 - 10000000) + 10000000);
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

        return <ComponentSelect onSelect={addComponent} type='forPage' />;
    };

    renderComponentByIndex = (index) => {
        const { operations, data } = this.state;

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
                            const id = Math.floor(Math.random() * (99999999 - 10000000) + 10000000);
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
                        componentImages={componentData.images}
                        type='forPage' />
                </Operations>
                {operations[index] && operations[index].propsFormVisible ? (
                    <ComponentEditor
                        componentId={componentData.componentId}
                        componentProps={componentData.props}
                        componentImages={componentData.images}
                        type='forPage'
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
        const { data } = this.state;

        this.setState({
            data: {
                ...data,
                config: {
                    ...data.config,
                    ...newConfig
                }
            }
        });
    };

    handleChange = (data, errors) => {
        this.setState({ errors, data });
    };

    handleSave = async () => {
        const { match } = this.props;
        const { data: component } = this.state;

        let res;
        if (component['_id']) {
            res = await axios.put(`/api/components/${component['_id']}`, { component });
        } else {
            res = await axios.post(`/api/components`, { component });
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
                    window.location = '/admin/components';
                }
        }
    };

    handleDelete = async () => {
        const { data } = this.state;

        if (window.confirm('Вы действительно хотите удалить компонент?')) {
            const res = await axios.delete(`/api/components/${data['_id']}`);
            const { message, status } = res.data;

            showNotification({ message, status });

            if (status === 'success') {
                window.location = '/admin/components';
            }
        }
    };

    updateComponent = async () => {
        const { match } = this.props;
        const { id } = match.params;

        if (id === 'add') {
            this.setState({
                data: {
                    config: {
                        components: [],
                        componentsData: {}
                    }
                }
            });
        } else {
            const res = await axios.get(`/api/components/${id}`);

            if (res.data && res.data.status === 'error') {
                showNotification({ status: 'error', message: res.data.message });
                return;
            }

            this.setState({ data: res.data.data })
        }
    }

    setOpenedPanel = (id) => {
        this.setState({ openedPanelId: id })
    }
}

export default Component;
