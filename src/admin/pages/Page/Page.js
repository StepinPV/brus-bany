import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Breadcrumbs from '../../../components/Breadcrumbs';
import PageComponent from '../../../client/components/Page';
import { getPage, setPage, savePage, reset, deletePage } from './actions';
import withNotification from '../../../plugins/Notifications/withNotification';
import componentsPaths from "../../../constructorComponents/meta";
import Form from '../../components/Form';
import { main as mainFormat, config as configFormat } from '../../formats/page';
import { Button } from "../../../components/Button";
import styles from './Page.module.css';
import cx from 'classnames';

const breadcrumbsDefault = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Страницы',
    link: '/admin/pages'
}];

const floatPanels = {
    'settings': {
        button: {
            caption: 'Настройки',
            style: {
                top: '200px'
            }
        },
        caption: 'Настройки страницы',
        containerStyle: {
            left: 'max(-100%, -600px)',
            width: '600px'
        },
        renderName: 'renderSettingsBlock'
    },
    'select-component': {
        caption: 'Добавление компонента',
        containerStyle: {
            left: 'max(-100%, -400px)',
            width: '400px'
        },
        renderName: 'renderComponentSelect'
    }
};

class Page extends PureComponent {
    static propTypes = {
        page: PropTypes.object,
        isPageError: PropTypes.string,
        isPageFetch: PropTypes.bool,

        actions: PropTypes.object,
        match: PropTypes.object,
        showNotification: PropTypes.func,
        history: PropTypes.object
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.breadcrumbs) {
            const { match } = nextProps;
            return {
                breadcrumbs: [
                    ...breadcrumbsDefault,
                    { title: match.params.id === 'add' ? 'Создание страницы' : 'Редактирование страницы' }
                ]
            }
        }

        return null;
    }

    state = {
        errors: {},
        operations: {},
        breadcrumbs: null,
        componentConstructors: {},
        componentMetas: {},
        addComponentPosition: null,
        floatMode: null
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

        this.loadComponents();
    }

    componentDidUpdate(prevProps) {
        const { page } = this.props;
        const { page: prevPage } = prevProps;

        if (page && (!prevPage || page.config.components !== prevPage.config.components)) {
            page.config.components.forEach(({ componentId }) => {
                this.loadComponentInstance(componentId);
                this.loadComponentMeta(componentId);
            });
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.reset();
    }

    render() {
        const { isPageError, page, match } = this.props;
        const { floatMode } = this.state;
        const { name } = match.params;

        if (isPageError) {
            return <div className={styles.error}>{isPageError}</div>;
        }

        return page ? (
            <div className={cx(styles.container, {[styles['float-mode']]: floatMode})}>
                {Object.keys(floatPanels).map(key => this.renderFloatPanel(key))}
                <div className={styles['save-button']} onClick={this.handleSave}>Сохранить</div>
                {name !== 'add' ? (
                    <div className={styles['delete-button']} onClick={this.handleDelete}>Удалить</div>
                ) : null}
                <div className={styles.page}>
                    <div className={styles['page-overlay']} onClick={() => { this.setState({ floatMode: null}) }} />
                    {this.renderPage()}
                </div>
            </div>
        ) : null;
    }

    renderFloatPanel = (key) => {
        const { floatMode } = this.state;

        return (
            <div
                style={{
                    ...floatPanels[key].containerStyle,
                    ...(floatMode === key ? { left: '0' } : {})
                }}
                className={styles['float-panel']}>
                {floatPanels[key].button ? (
                    <div
                        style={floatPanels[key].button.style}
                        className={styles['float-button']}
                        onClick={() => { this.setState({ floatMode: key }) }}>{floatPanels[key].button.caption}</div>
                ) : null}
                <div className={styles['float-panel-caption']}>{floatPanels[key].caption}</div>
                <div className={styles['float-panel-content']}>
                    {this[floatPanels[key].renderName]()}
                </div>
                <Button
                    caption='Закрыть'
                    type='yellow'
                    onClick={() => { this.setState({ floatMode: null }) }}
                    className={styles.close}
                />
            </div>
        )
    };

    renderSettingsBlock = () => {
        const { page, match } = this.props;
        const { errors, breadcrumbs } = this.state;

        return (
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
        )
    };

    renderPage = () => {
        const { page } = this.props;
        const { components } = page.config;

        return (
            <PageComponent>
                {components ? components.map((component, index) => this.renderComponentByIndex(index)) : null}
                {(!components || !components.length) ? this.renderAddComponent() : null}
            </PageComponent>
        );
    }

    renderAddComponent = () => {
        return (
            <div className={styles['add-button']}>
                <div className={styles['add-button-caption']} onClick={() => {
                    this.setState({ addComponentPosition: 0, floatMode: 'select-component' })
                }}>Добавить новый компонент<br/>+</div>
            </div>
        );
    };

    renderComponentSelect = () => {
        const { componentMetas, addComponentPosition } = this.state;
        const { page, actions } = this.props;

        const { components } = page.config;

        const addComponent = (componentId) => {
            const newComponents = [...components];

            newComponents.splice(addComponentPosition, 0, {
                componentId,
                props: componentMetas[componentId].defaultProps || {}
            });

            actions.setPage({
                ...page,
                config: {
                    ...page.config,
                    components: newComponents
                }
            });

            this.setState({ floatMode: null })
        }

        return (
            <>
                {Object.keys(componentMetas).map(componentKey => {
                    return componentsPaths[componentKey].disabled ? null : (
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
        const { actions, page } = this.props;
        const { componentConstructors } = this.state;
        const { componentMetas } = this.state;

        const { components } = page.config;
        const { componentId, props } = components[index];

        if (componentConstructors[componentId] && componentMetas[componentId]) {
            const Component = componentConstructors[componentId];
            const propsMeta = componentMetas[componentId].props;
            const { operations } = this.state;

            const onChange = (id, newProps, images) => {
                const newComponents = [...components];
                newComponents[index].props = newProps;

                actions.setPage({
                    ...page,
                    config: {
                        ...page.config,
                        __images__: images,
                        components: newComponents
                    }
                });
            }

            const deleteComponent = (e) => {
                e.stopPropagation();

                const newComponents = [...components];
                newComponents.splice(index, 1);

                actions.setPage({
                    ...page,
                    config: {
                        ...page.config,
                        components: newComponents
                    }
                });
            }

            const cloneComponent = (e) => {
                e.stopPropagation();

                const newComponents = [...components];
                newComponents.splice(index + 1, 0, components[index]);

                actions.setPage({
                    ...page,
                    config: {
                        ...page.config,
                        components: newComponents
                    }
                });
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

                const newComponents = [...components];
                const temp = newComponents[index - 1];
                newComponents[index - 1] = newComponents[index];
                newComponents[index] = temp;

                actions.setPage({
                    ...page,
                    config: {
                        ...page.config,
                        components: newComponents
                    }
                });

                this.setState({ operations: {} });
            };

            const moveBottom = (e) => {
                e.stopPropagation();

                const newComponents = [...components];
                const temp = newComponents[index + 1];
                newComponents[index + 1] = newComponents[index];
                newComponents[index] = temp;

                actions.setPage({
                    ...page,
                    config: {
                        ...page.config,
                        components: newComponents
                    }
                });

                this.setState({ operations: {} });
            }

            return (
                <Fragment>
                    <div className={styles.component}>
                        <div className={styles['component-overlay']} onClick={togglePropsFormVisible}>
                            <div className={styles['component-operations']}>
                                { index !== components.length - 1 ? <div className={styles['component-operation']} onClick={moveBottom}>▼</div> : null }
                                { index !== 0 ? <div className={styles['component-operation']} onClick={moveUp}>▲</div> : null }
                                <div className={styles['component-operation']} onClick={cloneComponent}>Дублировать</div>
                                <div className={styles['component-operation']} onClick={deleteComponent}>Удалить</div>
                            </div>
                        </div>
                        <Component {...props} __images__={page.config['__images__'] || {}} />
                        <div className={styles['component-add']} onClick={() => { this.setState({ addComponentPosition: index + 1, floatMode: 'select-component' }) }}>Добавить компонент</div>
                    </div>
                    {operations[index] && operations[index].propsFormVisible ? (
                        <div className={styles['form-container']}>
                            <Form
                                format={propsMeta}
                                value={props}
                                onChange={onChange}
                                errors={{}}
                                images={page.config['__images__'] || {}} />
                        </div>
                    ) : null}
                </Fragment>
            );
        }

        return null;
    };

    loadComponentInstance = async (componentId) => {
        const { componentConstructors } = this.state;

        if (!componentConstructors[componentId]) {
            const component = (await componentsPaths[componentId].load()).default;

            this.setState(state => {
                return {
                    ...state,
                    componentConstructors: {
                        ...state.componentConstructors,
                        [componentId]: component
                    }
                }
            });
        }
    }

    loadComponentMeta = async (componentId) => {
        const { componentMetas } = this.state;

        if (!componentMetas[componentId]) {
            const meta = await componentsPaths[componentId].loadMeta();

            this.setState(state => {
                return {
                    ...state,
                    componentMetas: {
                        ...state.componentMetas,
                        [componentId]: meta
                    }
                }
            });
        }
    }

    loadComponents = () => {
        Object.keys(componentsPaths).forEach(componentId => {
            this.loadComponentMeta(componentId);
        });
    };

    handleChange = (id, page) => {
        const { actions } = this.props;
        const { errors } = this.state;

        this.setState({ errors: { ...errors, [id]: null }});
        actions.setPage(page);
    };

    handleChangeConfig = (id, config) => {
        const { actions, page } = this.props;
        actions.setPage({ ...page, config });
    };

    handleSave = async () => {
        const { showNotification, actions, history } = this.props;

        const { message, status, data } = await actions.savePage();

        showNotification({ message, status });

        switch (status) {
            case 'success':
                history.push('/admin/pages');
                break;
            case 'error':
                if (data && data.errors) {
                    this.setState({ errors: data.errors });
                }
                break;
            default:
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
            deletePage
        }, dispatch),
        dispatch
    };
}

/**
 * mapStateToProps
 * @param {*} state
 * @returns {Object}
 */
function mapStateToProps(state) {
    const { page, isPageFetch, isPageError } = state['admin-page'];

    return { page, isPageFetch, isPageError };
}

export default connect(mapStateToProps, mapDispatchToProps)(withNotification(Page));
