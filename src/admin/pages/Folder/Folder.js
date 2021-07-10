import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from '../../components/Breadcrumbs';
import showNotification from '@utils/showNotification';
import Form from '../../components/Form';
import { Button } from '../../components/Button';
import styles from './Folder.module.css';
import FloatPanels from '../../components/FloatPanels';
import ComponentEditor from '../../components/pageEditor/ComponentEditor';
import Operations from '../../components/pageEditor/Operations';
import ComponentRender from '../../components/pageEditor/Component';
import OperationsHelper from '../../components/pageEditor/operationsHelper';
import ComponentSelect from '../../components/pageEditor/ComponentSelect';
import Header from '../../components/Header';
import formData from '../../formats/page-folder';
import FieldsProvider from '@plugins/Fields/Provider';
import axios from 'axios';

const breadcrumbs = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Редактирование папки'
}];

class Folder extends PureComponent {
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
                    left: 'max(-100%, -900px)',
                    width: '900px'
                },
                content: this.renderSettingsBlock
            },
            'select-component': {
                caption: 'Добавление папки',
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
        this.update();
    }

    render() {
        const { openedPanelId, data } = this.state;

        // TODO
        return data ? (
            <FloatPanels
                panels={this.floatPanels}
                onChangeOpenedPanel={this.setOpenedPanel}
                openedPanelId={openedPanelId}>
                <>
                    <Header />
                    {this.renderPageView()}
                </>
            </FloatPanels>
        ) : null;
    }

    renderPageView = () => {
        const { data } = this.state;
        const { components } = data.pageViewConfig || {};

        const render = () => (
            <div className={styles['sub-container']}>
                <div className={styles.caption}>Шаблон карточки</div>
                <div className={styles.pageViewComponents}>
                    {components ? components.map((componentId, index) => this.renderComponentByIndex(index)) : null}
                    {(!components || !components.length) ? this.renderAddComponent() : null}
                </div>
            </div>
        );

        return data['page-fields'] ? (
            <FieldsProvider fields={data['page-fields'].reduce((acc, field) => ({ ...acc, [field.id]: field.name }), {})}>
                {render()}
            </FieldsProvider>
        ) : render();
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
                            format={formData}
                            value={data}
                            onChange={newData => {
                                if (newData['page-fields']) {
                                    newData['page-fields'] = newData['page-fields'].map((item) => {
                                        return item.id ? item : {
                                            ...item,
                                            id: Math.floor(Math.random() * (99999999 - 10000000) + 10000000)
                                        }
                                    });
                                }

                                this.setState({
                                    data: {
                                        ...data,
                                        ...newData
                                    }
                                });
                            }}
                            errors={{}} />
                    </div>
                </div>
                <div className={styles['settings-block-buttons']}>
                    <Button
                        caption='Сохранить папку'
                        type='yellow'
                        onClick={this.handleSave}
                        size='s'
                        className={styles['settings-block-button']}
                    />
                    {id !== 'add' ? (
                        <Button
                            caption='Удалить папку'
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
                    ...data.pageViewConfig.componentsData,
                    [id]: {
                        componentId,
                        props
                    }
                },
                components: OperationsHelper.add(data.pageViewConfig.components, addComponentPosition, id)
            });
            this.setOpenedPanel(null);
        }

        return <ComponentSelect onSelect={addComponent} type='forCard' />;
    };

    renderComponentByIndex = (index) => {
        const { operations, data } = this.state;

        const componentData = data.pageViewConfig.componentsData[data.pageViewConfig.components[index]];

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
                        moveBottom: index !== data.pageViewConfig.components.length - 1 ? () => {
                            this.setConfig({ components: OperationsHelper.moveBottom(data.pageViewConfig.components, index) });
                            this.setState({ operations: {} });
                        } : null,
                        moveUp: index !== 0 ? () => {
                            this.setConfig({ components: OperationsHelper.moveUp(data.pageViewConfig.components, index) });
                            this.setState({ operations: {} });
                        } : null,
                        clone: () => {
                            const id = Math.floor(Math.random() * (99999999 - 10000000) + 10000000);
                            this.setConfig({
                                componentsData: {
                                    ...data.pageViewConfig.componentsData,
                                    [id]: { ...componentData }
                                },
                                components: [...(data.pageViewConfig.components.splice(index, 0, id) && data.pageViewConfig.components)]
                            });
                        },
                        options: togglePropsFormVisible,
                        delete: () => {
                            const newComponentsData = {
                                ...data.pageViewConfig.componentsData
                            }

                            delete newComponentsData[data.pageViewConfig.components[index]];

                            this.setConfig({
                                newComponentsData,
                                components: OperationsHelper.delete(data.pageViewConfig.components, index)
                            });
                        }
                    }}
                    onClick={togglePropsFormVisible}>
                    <ComponentRender
                        componentId={componentData.componentId}
                        componentProps={componentData.props}
                        componentImages={componentData.images}
                        type='forCard' />
                </Operations>
                {operations[index] && operations[index].propsFormVisible ? (
                    <ComponentEditor
                        componentId={componentData.componentId}
                        componentProps={componentData.props}
                        componentImages={componentData.images}
                        type='forCard'
                        onChangeProps={(newProps, errors, images) => {
                            this.setConfig({
                                componentsData: {
                                    ...data.pageViewConfig.componentsData,
                                    [data.pageViewConfig.components[index]]: {
                                        ...data.pageViewConfig.componentsData[data.pageViewConfig.components[index]],
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
                pageViewConfig: {
                    ...data.pageViewConfig,
                    ...newConfig
                }
            }
        });
    };

    handleSave = async () => {
        const { match } = this.props;
        const { data: folder } = this.state;

        let res;
        if (folder['_id']) {
            res = await axios.put(`/api/page-folders/${folder['_id']}`, { data: folder });
        } else {
            res = await axios.post('/api/page-folders', { data: folder });
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
        }
    };

    handleDelete = async () => {
        const { data } = this.state;

        if (window.confirm('Вы действительно хотите удалить папку?')) {
            const res = await axios.delete(`/api/page-folders/${data['_id']}`);
            const { message, status } = res.data;

            showNotification({ message, status });

            if (status === 'success') {
                window.location = '/admin';
            }
        }
    };

    setOpenedPanel = (id) => {
        this.setState({ openedPanelId: id })
    };

    update = async () => {
        const { match } = this.props;
        const { id } = match.params;

        if (id === 'add') {
            this.setState({
                data: {
                    pageViewConfig: {
                        components: [],
                        componentsData: {}
                    }
                }
            });
        } else {
            const res = await axios.get(`/api/page-folders/${id}`);

            if (res.data && res.data.status === 'error') {
                showNotification({ status: 'error', message: res.data.message });
                return;
            }

            this.setState({
                data: {
                    pageViewConfig: {
                        components: [],
                        componentsData: {}
                    },
                    ...res.data.data
                }
            })
        }
    }
}

export default Folder;
