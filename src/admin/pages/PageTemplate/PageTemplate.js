import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { get, set, save, reset, deleteTemplate } from './actions';
import withNotification from '../../../plugins/Notifications/withNotification';
import { Button } from "../../../components/Button";
import PageRender from '../../../client/components/PageRender';
import FloatPanels from '../../components/FloatPanels';
import ComponentEditor from '../../components/pageEditor/ComponentEditor';
import Operations from '../../components/pageEditor/Operations';
import ComponentRender from '../../components/pageEditor/Component';
import OperationsHelper from '../../components/pageEditor/operationsHelper';
import ComponentSelect from '../../components/pageEditor/ComponentSelect';
import Form from '../../components/Form';
import format from '../../formats/page-template';
import styles from './PageTemplate.module.css';
import {config as configFormat, main as mainFormat} from "../../formats/page";

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
        const { isDataError, data } = this.props;
        const { openedPanelId } = this.state;

        if (isDataError) {
            return <div className={styles.error}>{isDataError}</div>;
        }

        return data ? (
            <FloatPanels
                panels={this.floatPanels}
                onChangeOpenedPanel={this.setOpenedPanel}
                openedPanelId={openedPanelId}>
                {this.renderPage()}
            </FloatPanels>
        ) : null;
    }

    renderSettingsBlock = () => {
        const { match, data } = this.props;
        const { errors } = this.state;
        const { id } = match.params;

        return (
            <div className={styles['settings-block']}>
                <div className={styles['settings-block-content']}>
                    <Breadcrumbs items={breadcrumbs} />
                    <div className={styles['form-container']}>
                        <Form
                            format={format}
                            value={data}
                            onChange={this.handleChange}
                            errors={errors} />
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
        const { components, header, footer } = data.config;

        return (
            <PageRender
                header={header ? this.renderSpecialComponent('header') : this.renderAddComponent('Добавить шапку', 'header')}
                footer={footer ? this.renderSpecialComponent('footer') : this.renderAddComponent('Добавить подвал', 'footer')}>
                <>
                    {components ? components.map((component, index) => this.renderComponentByIndex(index)) : null}
                    {(!components || !components.length) ? this.renderAddComponent('Добавить новый компонент', 0) : null}
                </>
            </PageRender>
        );
    }

    renderSpecialComponent = (id) => {
        const { data } = this.props;
        const { operations } = this.state;

        const togglePropsFormVisible = () => {
            const newOperations = { ...this.state.operations };
            newOperations[id] = {
                ...newOperations[id],
                propsFormVisible: newOperations[id] ? !newOperations[id].propsFormVisible : true
            };

            this.setState({ operations: newOperations });
        }

        const componentData = data.config.componentsData[data.config[id]];

        return (
            <Fragment>
                <Operations
                    onClick={togglePropsFormVisible}
                    operations={{
                        operations: togglePropsFormVisible,
                        delete: () => {
                            const newComponentsData = {
                                ...data.config.componentsData
                            }

                            delete newComponentsData[data.config[id]];

                            this.setConfig({
                                componentsData: newComponentsData,
                                [id]: null
                            });
                        }
                    }}>
                    <ComponentRender
                        componentId={componentData.componentId}
                        componentProps={componentData.props}
                        componentImages={componentData.images} />
                </Operations>
                {operations[id] && operations[id].propsFormVisible ? (
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
                                    [data.config[id]]: {
                                        ...data.config.componentsData[data.config[id]],
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
        const { data } = this.props;

        const addComponent = (componentId, props) => {
            this.setOpenedPanel(null);

            const id = Math.floor(Math.random() * (9999 - 1000) + 1000);
            const newComponentData = { componentId, props };
            const newComponentsData = {
                ...data.config.componentsData,
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

            this.setConfig({
                componentsData: newComponentsData,
                components: OperationsHelper.add(data.config.components, addComponentPosition, id)
            });
        }

        return (
            <ComponentSelect
                onSelect={addComponent}
                hasCustomComponents
                additions={addComponentPosition !== 'header' && addComponentPosition !== 'footer' ? [{
                    key: `__content__(${Math.floor(Math.random() * (9999 - 1000) + 1000)})`,
                    name: 'Контентная область'
                }] : null}
            />
        );
    };

    renderComponentByIndex = (index) => {
        const { data } = this.props;
        const { operations } = this.state;

        const togglePropsFormVisible = () => {
            const newOperations = { ...this.state.operations };
            newOperations[index] = {
                ...newOperations[index],
                propsFormVisible: newOperations[index] ? !newOperations[index].propsFormVisible : true
            };

            this.setState({ operations: newOperations });
        }

        const componentData = data.config.componentsData[data.config.components[index]];

        if (componentData.componentId.includes('__content__')) {
            return (
                <div key={componentData.componentId} className={styles['content-block']}>
                    <Operations
                        className={styles['content-block-operations']}
                        operations={{
                            addComponentTop: () => {
                                this.enableAddComponentMode(index);
                            },
                            addComponentBottom: () => {
                                this.enableAddComponentMode(index + 1);
                            }
                        }}>
                        <div className={styles['content-block-content']}>
                            Контентная область
                        </div>
                    </Operations>
                </div>
            );
        }

        return (
            <Fragment key={data.config.components[index]}>
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
                                components: [...(data.config.components.splice(index, 0, id) && data.config.components)]
                            });
                        },
                        delete: () => {
                            const newComponentsData = {
                                ...data.config.componentsData
                            }

                            delete newComponentsData[data.config.components[index]];

                            this.setConfig({
                                componentsData: newComponentsData,
                                components: OperationsHelper.delete(data.config.components, index)
                            });
                        },
                        options: togglePropsFormVisible
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
            deleteTemplate
        }, dispatch),
        dispatch
    };
}

function mapStateToProps(state) {
    const { data, isDataFetch, isDataError } = state['admin-page-template'];

    return { data, isDataFetch, isDataError };
}

export default connect(mapStateToProps, mapDispatchToProps)(withNotification(PageTemplate));
