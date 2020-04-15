import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Select from '../../../components/Select';
import {
    getProject,
    setProject,
    createProject,
    updateProject,
    resetData,
    getLayouts,
    deleteProject,
    getCategory
} from './actions';
import withNotification from '../../../plugins/Notifications/withNotification';
import ImageUploader from '../../components/ImageUploader';
import Input from '../../../components/Input';
import { Button } from '../../../components/Button';
import styles from './Project.module.css';

const breadcrumbs = [{
    title: 'Главная',
    link: '/admin'
}, {
    title: 'Проекты',
    link: '/admin/projects'
}];

const IMAGES_DATA = [{
    key: 'main',
    title: 'Главное'
}, {
    key: 'top',
    title: 'Вид сверху'
}, {
    key: 'top2',
    title: 'Вид сверху 2'
}, {
    key: '1',
    title: 'Вид сбоку'
}, {
    key: '2',
    title: 'Вид сбоку 2'
}, {
    key: '3',
    title: 'Вид сзади'
}, {
    key: 'layout',
    title: 'Планировка'
}];

const getAddModeBreadcrumbs = () => [...breadcrumbs, { title: 'Создание проекта' }];
const getEditModeBreadcrumbs = () => [...breadcrumbs, { title: 'Редактирование проекта' }];

class Project extends PureComponent {
    static propTypes = {
        layouts: PropTypes.array,
        category: PropTypes.object,

        project: PropTypes.object,
        isProjectError: PropTypes.string,
        isProjectFetch: PropTypes.bool,

        actions: PropTypes.object,
        match: PropTypes.object,
        showNotification: PropTypes.func,
        history: PropTypes.object
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const { match } = nextProps;
        const addMode = match.params.layoutId === 'add';

        if (prevState.addMode !== addMode) {
            return {
                addMode,
                breadcrumbs: addMode ? getAddModeBreadcrumbs() : getEditModeBreadcrumbs()
            }
        }

        return null;
    }

    state = {
        errors: {},
        breadcrumbs: getEditModeBreadcrumbs(),
        addMode: false
    };

    componentDidMount() {
        const { addMode } = this.state;
        const { match, actions } = this.props;
        const { categoryId, layoutId } = match.params;

        if (!addMode) {
            actions.getProject(categoryId, layoutId);
        }

        actions.getLayouts();
        actions.getCategory(categoryId);
    }

    componentDidUpdate(prevProps, prevState) {
        const { addMode } = this.state;
        const { match, actions, category, project } = this.props;

        if (prevProps.match !== match && !addMode) {
            const { categoryId, layoutId } = match.params;
            actions.getProject(categoryId, layoutId);
        }

        if (category && !prevProps.category) {
            actions.setProject({ ...project, categoryId: category });
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { isProjectError } = this.props;
        const { breadcrumbs } = this.state;

        return (
            <>
                <Header />
                <Breadcrumbs items={breadcrumbs} />
                { isProjectError ? <div className={styles.error}>{isProjectError}</div> : this.renderContent() }
            </>
        );
    }

    renderContent = () => {
        const { addMode } = this.state;
        const { project } = this.props;

        return project ? (
            <div className={styles.formContainer}>
                <div className={styles.formWrapper}>
                    {this.renderLayout()}
                    {project.layoutId ? (
                        <>
                            {this.renderImages()}
                            {this.renderComplectationBlock()}
                            {this.renderBuildTime()}
                            <Button
                                caption={addMode ? 'Создать' : 'Сохранить'}
                                type='yellow'
                                onClick={this.handleSave}
                                className={styles.button}
                            />
                            {!addMode ? (
                                <Button
                                    caption='Удалить'
                                    type='red'
                                    onClick={this.handleDelete}
                                    className={styles.button}
                                />
                            ) : null}
                        </>
                    ) : null}
                </div>
            </div>
        ) : null;
    };

    renderImages = () => {
        const { project: { images } } = this.props;

        return this.renderBlock('Изображения', (
            <div className={styles.imagesItems}>
                {IMAGES_DATA.map(({ key, title }) => (
                    <div key={key} className={styles.imagesItem}>
                        <ImageUploader title={title} image={images ? images[key] : null} onChange={file => {
                            this.handleImageChange(file, key);
                        }} />
                    </div>
                ))}
            </div>
        ));
    };

    renderComplectationBlock = () => {
        const { actions, project } = this.props;

        const handleChangePrice = (id, value) => {
            const newPrices = { ...(project.prices || {}) };
            newPrices[id] = value;
            actions.setProject({ ...project, prices: newPrices });
        };

        return project.categoryId.complectationBlocks ? (
            this.renderBlock('Комплектации', (
                <>
                    {project.categoryId.complectationBlocks.items.map(item => {
                        return (
                            <Input
                                className={styles.input}
                                key={item.id}
                                value={project.prices ? project.prices[item.id] : ''}
                                title={`${item.title} ${item.name} ${item.id === project.categoryId.complectationBlocks.defaultItemId ? ' (По умолчанию)' : ''}`}
                                type='integer number'
                                required
                                min={0}
                                onChange={value => { handleChangePrice(item.id, value) } }
                            />
                        )
                    })}
                </>
            ))
        ) : null;
    };

    renderBuildTime = () => {
        const { project: { buildTime } } = this.props;

        return this.renderBlock('Параметры', (
            <div className={styles.input}>
                <Input
                    value={buildTime}
                    title='Срок строительства (количество дней)'
                    type='integer number'
                    required
                    min={0}
                    onChange={this.handleBuildTimeChange}
                />
            </div>
        ))
    };

    renderBlock = (title, content) => {
        return (
            <div className={styles.block}>
                <div className={styles.title}>{title}</div>
                {content}
            </div>
        )
    };

    handleBuildTimeChange = (buildTime) => {
        const { actions, project } = this.props;

        actions.setProject({ ...project, buildTime });
    };

    renderLayout = () => {
        const { project: { layoutId }, layouts } = this.props;
        const { errors } = this.state;

        return layouts ? (
            <div className={styles.name}>
                <Select
                    title='Выберите планировку'
                    items={layouts}
                    displayProperty='name'
                    keyProperty='_id'
                    selectedKey={layoutId ? layoutId._id : null}
                    onChange={this.handleLayout}
                    error={errors['layoutId']} />
            </div>
        ) : null;
    };

    handleLayout = (layoutId) => {
        const { actions, project, layouts } = this.props;

        actions.setProject({ ...project, layoutId: layouts.find(l => l._id === layoutId) });
    };

    handleImageChange = async (file, key) => {
        const { actions, project } = this.props;

        actions.setProject({ ...project, images: { ...project.images, [key]: file } });
    };

    handleSave = async () => {
        const { addMode } = this.state;
        const { showNotification, actions, history } = this.props;
        const errors = this.getErrors();

        if (errors) {
            showNotification({ message: 'Исправьте ошибки!', status: 'error' });
            this.setState({ errors });
            return;
        }

        const { message, status } = addMode ? await actions.createProject() : await actions.updateProject();

        showNotification({ message, status });

        if (status === 'success') {
            history.push(`/admin/projects`);
        }
    };

    handleDelete = async () => {
        const { showNotification, actions, history } = this.props;

        if (window.confirm('Вы действительно хотите удалить проект?')) {
            const { message, status } = await actions.deleteProject();

            showNotification({ message, status });

            if (status === 'success') {
                history.push(`/admin/projects`);
            }
        }
    };

    getErrors = () => {
        const { project } = this.props;
        const errors = {};
        let hasErrors = false;

        if (!project.layoutId) {
            errors['layoutId'] = 'Выберите планировку!';
            hasErrors = true;
        }

        return hasErrors ? errors : null;
    }
}

/**
 * mapDispatchToProps
 * @param {*} dispatch
 * @returns {Object}
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getProject,
            setProject,
            createProject,
            updateProject,
            resetData,
            getLayouts,
            deleteProject,
            getCategory
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
    const { project, isProjectFetch, isProjectError, layouts, category } = state['admin-project'];

    return { project, isProjectFetch, isProjectError, layouts, category };
}

export default connect(mapStateToProps, mapDispatchToProps)(withNotification(Project));
