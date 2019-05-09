import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';
import Select from '../../components/Select';
import {
    getProject,
    setProject,
    createProject,
    updateProject,
    resetData,
    getLayouts,
    uploadFile,
    deleteFile
} from './actions';
import withNotification from '../../../plugins/Notifications/withNotification';
import ImageLoader from '../../components/ImageLoader';
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
    key: '1',
    title: '1'
}, {
    key: '2',
    title: '2'
}, {
    key: '3',
    title: '3'
}, {
    key: '4',
    title: '4'
}, {
    key: 'layout',
    title: 'Планировка'
}];

const getAddModeBreadcrumbs = () => [...breadcrumbs, { title: 'Создание проекта' }];
const getEditModeBreadcrumbs = () => [...breadcrumbs, { title: 'Редактирование проекта' }];

class Project extends PureComponent {
    static defaultProps = {
        layouts: PropTypes.array,

        project: PropTypes.array,
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

    componentDidUpdate(prevProps, prevState) {
        const { addMode } = this.state;
        const { match, actions } = this.props;

        if (prevProps.match !== match && !addMode) {
            const { categoryId, layoutId } = match.params;
            actions.getProject(categoryId, layoutId);
        }
    }

    componentDidMount() {
        const { addMode } = this.state;
        const { match, actions } = this.props;
        const { categoryId, layoutId } = match.params;

        if (addMode) {
            actions.setProject({ categoryId });
            actions.getLayouts();
        } else {
            actions.getProject(categoryId, layoutId);
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
            <Fragment>
                <Header />
                <Breadcrumbs items={breadcrumbs} />
                { isProjectError ? <div className={styles.error}>{isProjectError}</div> : this.renderContent() }
            </Fragment>
        );
    }

    renderContent = () => {
        const { addMode } = this.state;
        const { project } = this.props;
        // const { errors } = this.state;

        return project ? (
            <div className={styles.formContainer}>
                <div className={styles.formWrapper}>
                    {addMode ? (
                        this.renderLayout()
                    ) : (
                        this.renderImages()
                    )}
                    <div className={styles.saveButton} onClick={this.handleSave}>{addMode ? 'Создать' : 'Cохранить'}</div>
                </div>
            </div>
        ) : null;
    };

    renderImages = () => {
        const { project: { images } } = this.props;

        return (
            <div className={styles.images}>
                <div className={styles.imagesTitle}>Изображения</div>
                <div className={styles.imagesItems}>
                    {IMAGES_DATA.map(({ key, title }) => (
                        <div key={key} className={styles.imagesItem}>
                            <ImageLoader title={title} image={images ? images[key] : null} onChange={file => {
                                this.handleImageChange(file, key);
                            }} />
                        </div>
                    ))}
                </div>
            </div>
        )
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
                    selectedKey={layoutId}
                    onChange={this.handleLayout}
                    error={errors['layoutId']} />
            </div>
        ) : null;
    };

    handleLayout = (layoutId) => {
        const { actions, project } = this.props;

        actions.setProject({ ...project, layoutId });
    };

    handleImageChange = async (file, key) => {
        const { actions, match, showNotification, project } = this.props;
        const { categoryId } = match.params;
        const res = file ? await actions.uploadFile(categoryId, file, key) : await actions.deleteFile(categoryId, key);

        if (res.status === 'success'){
            actions.setProject({ ...project, images: { ...project.images, [key]: res.data || null } });
        }

        showNotification({ message: res.message, status: res.status });
    };

    handleSave = async () => {
        const { addMode } = this.state;
        const { showNotification, actions, history, project } = this.props;
        const errors = this.getErrors();

        if (errors) {
            showNotification({ message: 'Исправьте ошибки!', status: 'error' });
            this.setState({ errors });
            return;
        }

        const { message, status } = addMode ? await actions.createProject() : actions.updateProject();

        showNotification({ message, status });

        if (status === 'success') {
            history.push(`/admin/projects/${project.categoryId}/${project.layoutId}`);
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
            uploadFile,
            deleteFile
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
    const { project, isProjectFetch, isProjectError, layouts } = state['admin-project'];

    return { project, isProjectFetch, isProjectError, layouts };
}

export default connect(mapStateToProps, mapDispatchToProps)(withNotification(Project));
