import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import PageComponent from '../../../client/components/Page';
import { getPage, setPage, savePage, reset, deletePage } from './actions';
import withNotification from '../../../plugins/Notifications/withNotification';
import componentsPaths from "../../../constructorComponents/meta";
import Form from '../../components/Form';
import format from '../../formats/page';
import styles from './Page.module.css';
import { Button } from "../../../components/Button";

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
        breadcrumbs: null,
        componentInstances: {}
    };

    componentDidMount() {
        const { match, actions } = this.props;
        const { id } = match.params;

        if (id === 'add') {
            actions.setPage({
                config: {
                    components: [{
                        componentId: 'H1Block',
                        props: {
                            caption: 'Вакансии1'
                        }
                    }, {
                        componentId: 'H1Block',
                        props: {
                            caption: 'Вакансии2'
                        }
                    }]
                }
            });
        } else {
            actions.getPage(id);
        }
    }

    componentDidUpdate(prevProps) {
        const { page } = this.props;
        const { operations } = this.state;
        const { page: prevPage } = prevProps;

        if (page && (!prevPage || page.config.components !== prevPage.config.components)) {
            page.config.components.forEach(({ componentId }) => {
                this.loadComponent(componentId);
            });
        }

        if (page && !operations) {
            const operations = [];

            page.config.components.forEach(() => {
                operations.push({
                    propsFormVisible: false
                });
            });

            this.setState({ operations });
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.reset();
    }

    render() {
        const { isPageError } = this.props;
        const { breadcrumbs } = this.state;

        return (
            <>
                <Header />
                <Breadcrumbs items={breadcrumbs} />
                { isPageError ? <div className={styles.error}>{isPageError}</div> : this.renderData() }
            </>
        );
    }

    renderData = () => {
        const { page, match } = this.props;
        const { errors } = this.state;
        const { name } = match.params;

        return page ? (
            <div className={styles.container}>
                <div className={styles['form-container']}>
                    <Form format={format} value={page} onChange={this.handleChange} errors={errors} />
                </div>
                {this.renderPage()}
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
        ) : null;
    };

    renderPage() {
        const { page } = this.props;
        const { components } = page.config;

        return (
            <PageComponent>
                {components ? components.map((component, index) => this.renderComponentByIndex(index)) : null}
            </PageComponent>
        );
    }

    renderComponentByIndex = (index) => {
        const { actions, page } = this.props;
        const { componentInstances } = this.state;

        const { components } = page.config;
        const { componentId, props } = components[index];

        if (componentInstances[componentId]) {
            const { instance: Component, propsMeta } = componentInstances[componentId];
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

            const togglePropsFormVisible = () => {
                const newOperations = [...this.state.operations];
                newOperations[index] = {
                    ...newOperations[index],
                    propsFormVisible: !newOperations[index].propsFormVisible
                };

                this.setState({ operations: newOperations });
            }

            const moveUp = () => {
                const newComponents = [...components];
                const temp = newComponents[index - 1];
                newComponents[index - 1] = newComponents[index];
                newComponents[index] = temp;

                const newOperations = [...this.state.operations];
                const tempOperation = newOperations[index - 1];
                newOperations[index - 1] = newOperations[index];
                newOperations[index] = tempOperation;

                actions.setPage({
                    ...page,
                    config: {
                        ...page.config,
                        components: newComponents
                    }
                });

                this.setState({ operations: newOperations });
            };

            const moveBottom = () => {
                const newComponents = [...components];
                const temp = newComponents[index + 1];
                newComponents[index + 1] = newComponents[index];
                newComponents[index] = temp;

                const newOperations = [...this.state.operations];
                const tempOperation = newOperations[index + 1];
                newOperations[index + 1] = newOperations[index];
                newOperations[index] = tempOperation;

                actions.setPage({
                    ...page,
                    config: {
                        ...page.config,
                        components: newComponents
                    }
                });

                this.setState({ operations: newOperations });
            }

            return (
                <Fragment>
                    <div className={styles.component}>
                        <div className={styles['component-overlay']}>
                            <div className={styles['component-operations']}>
                                <div className={styles['component-operation']} onClick={togglePropsFormVisible}>Данные</div>
                                { index !== components.length - 1 ? <div className={styles['component-operation']} onClick={moveBottom}>▼</div> : null }
                                { index !== 0 ? <div className={styles['component-operation']} onClick={moveUp}>▲</div> : null }
                            </div>
                        </div>
                        <Component {...props} />
                    </div>
                    {operations[index].propsFormVisible ? (
                        <div className={styles['form-container']}>
                            <Form format={propsMeta} value={props} onChange={onChange} errors={{}}/>
                        </div>
                    ) : null}
                </Fragment>
            );
        }

        return null;
    };

    loadComponent = async (componentId) => {
        const { componentInstances } = this.state;

        if (!componentInstances[componentId]) {
            this.setState({
                componentInstances: {
                    ...componentInstances,
                    [componentId]: {
                        instance: (await componentsPaths[componentId].load()).default,
                        propsMeta: (await componentsPaths[componentId].loadMeta()).props
                    }
                }
            })
        }
    }

    handleChange = (id, newPage) => {
        const { actions, page } = this.props;
        const { errors } = this.state;

        this.setState({ errors: { ...errors, [id]: null }});
        actions.setPage({
            ...newPage,
            config: page.config
        });
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
