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
        addComponentMode: false,
        settingsMode: false
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
        const { isPageError, page } = this.props;
        const { settingsMode } = this.state;

        if (isPageError) {
            return <div className={styles.error}>{isPageError}</div>;
        }

        return page ? (
            <div className={cx(styles.container, {[styles['container-settings-mode']]: settingsMode})}>
                {this.renderSettingsBlock()}
                <div className={styles.page}>
                    <div className={styles['page-overlay']} onClick={() => { this.setState({ settingsMode: false}) }} />
                    {this.renderPage()}
                </div>
            </div>
        ) : null;
    }

    renderSettingsBlock = () => {
        const { page, match } = this.props;
        const { errors, breadcrumbs, settingsMode } = this.state;
        const { name } = match.params;

        return (
            <div className={styles['settings-block']}>
                <div className={styles.settings} onClick={() => { this.setState({ settingsMode: !settingsMode }) }}>Настройки</div>
                <div className={styles.close} onClick={() => { this.setState({ settingsMode: false }) }}>✕</div>
                <div className={styles['settings-block-content']}>
                    <Breadcrumbs items={breadcrumbs} />
                    <div className={styles['form-container']}>
                        <Form format={mainFormat} value={page} onChange={this.handleChange} errors={errors} />
                        <Form format={configFormat} value={page.config} onChange={this.handleChangeConfig} errors={{}} />
                    </div>
                </div>
                <div className={styles.buttons}>
                    <Button
                        caption={name === 'add' ? 'Создать' : 'Сохранить'}
                        type='yellow'
                        onClick={this.handleSave}
                        className={styles.button}
                    />
                    {name !== 'add' ? (
                        <Button
                            caption='Удалить'
                            type='red'
                            onClick={this.handleDelete}
                            className={styles.button}
                        />
                    ) : null}
                </div>
            </div>
        )
    };

    renderPage = () => {
        const { page } = this.props;
        const { addComponentMode } = this.state;
        const { components } = page.config;

        return (
            <PageComponent>
                {components ? components.map((component, index) => this.renderComponentByIndex(index)) : null}
                {!addComponentMode ? this.renderAddComponent() : null}
                {addComponentMode ? this.renderComponentSelect() : null}
            </PageComponent>
        );
    }

    renderAddComponent = () => {
        return (
            <div className={styles['add-button']}>
                <div className={styles['add-button-caption']} onClick={() => {
                    this.setState({ addComponentMode: true })
                }}>Добавить новый компонент<br/>+</div>
            </div>
        );
    };

    renderComponentSelect = () => {
        const { componentMetas } = this.state;
        const { page, actions } = this.props;

        const { components } = page.config;

        const addComponent = (componentId) => {
            const newComponents = [...components];

            newComponents.push({
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

            this.setState({ addComponentMode: false })
        }

        return (
            <div className={styles['component-select']}>
                <div className={styles['component-select-items']}>
                    {Object.keys(componentMetas).map(componentKey => {
                        return (
                            <div className={styles['component-select-item']} onClick={() => { addComponent(componentKey) }}>{componentMetas[componentKey].name}</div>
                        );
                    })}
                </div>
                <div className={styles['add-button-caption']} onClick={() => {
                    this.setState({ addComponentMode: false })
                }}>Отменить</div>
            </div>
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

            const onChange = (id, newProps) => {
                const newComponents = [...components];
                newComponents[index].props = newProps;

                actions.setPage({
                    ...page,
                    config: {
                        ...page.config,
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
                                <div className={styles['component-operation']} onClick={deleteComponent}>Удалить</div>
                            </div>
                        </div>
                        <Component {...props} />
                    </div>
                    {operations[index] && operations[index].propsFormVisible ? (
                        <div className={styles['form-container']}>
                            <Form format={propsMeta} value={props} onChange={onChange} errors={{}}/>
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
