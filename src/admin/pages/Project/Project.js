import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Select from '../../components/Select';
import Materials from './resources/Materials';
import {
    getProject,
    setProject,
    createProject,
    updateProject,
    resetData,
    getLayouts,
    uploadFile,
    deleteFile,
    getMaterials
} from './actions';
import withNotification from '../../../plugins/Notifications/withNotification';
import ImageLoader from '../../components/ImageLoader';
import Input from '../../components/Input';
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
    static propTypes = {
        layouts: PropTypes.array,
        materials: PropTypes.array,

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

    componentDidUpdate(prevProps, prevState) {
        const { addMode } = this.state;
        const { match, actions } = this.props;

        if (prevProps.match !== match && !addMode) {
            const { categoryId, layoutId } = match.params;
            actions.getProject(categoryId, layoutId);
            actions.getMaterials();
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
            actions.getMaterials();
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
        const { project, materials } = this.props;
        // const { errors } = this.state;

        return project && materials ? (
            <div className={styles.formContainer}>
                <div className={styles.formWrapper}>
                    {addMode ? (
                        this.renderLayout()
                    ) : (
                        <Fragment>
                            {this.renderImages()}
                            {<Materials onChange={this.handleMaterialsChange} materials={materials} data={project.materials || {}} />}
                            {this.renderPrice()}
                        </Fragment>
                    )}
                    <div className={styles.saveButton} onClick={this.handleSave}>{addMode ? 'Создать' : 'Сохранить и обновить'}</div>
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

    renderPrice = () => {
        const { project: { profitPercentage }, project, materials } = this.props;

        const salaryPercentage = 20;
        const defaultProfitPercentage = 20;
        const taxiPrice = 12000;

        const finalProfitPercentage = isNaN(parseFloat(profitPercentage)) || profitPercentage < 0 || profitPercentage >= 100 - salaryPercentage ?
            defaultProfitPercentage : profitPercentage;

        let materialsPrice = 0;

        for (let id in project.materials) {
            const material = materials.find(material => material._id === id);
            materialsPrice += material.price * project.materials[id];
        }

        const finalPrice = materialsPrice / (1 - salaryPercentage / 100 - finalProfitPercentage / 100);

        const round = val => Math.round(val);

        const salaryPrice = round(finalPrice * salaryPercentage / 100);
        const profitPrice = round(finalPrice * finalProfitPercentage / 100);
        const finalPriceWithTaxi = round(finalPrice + taxiPrice);

        return (
            <div className={styles.price}>
                <div className={styles.priceTitle}>Стоимость проекта</div>
                <div className={styles.profitPercentageInput}>
                    <Input
                        value={profitPercentage || 0}
                        title='Процент прибыли от общей стоимости'
                        type='float number'
                        required
                        min={0}
                        onChange={this.handleProfitPercentageCountChange}
                    />
                </div>
                <div className={styles.priceValueContainer}>
                    <div>Стройматериалы:</div>
                    <div className={styles.priceValue}>
                        {`${materialsPrice.toLocaleString()} руб.`}
                    </div>
                </div>
                <div className={styles.priceValueContainer}>
                    <div>Зарпалата строителей:</div>
                    <div className={styles.priceValue}>
                        {`${salaryPercentage}% - ${salaryPrice.toLocaleString()} руб.`}
                    </div>
                </div>
                <div className={styles.priceValueContainer}>
                    <div>Прибыль:</div>
                    <div className={styles.priceValue}>
                        {`${finalProfitPercentage}% - ${profitPrice.toLocaleString()} руб.`}
                    </div>
                </div>
                <div className={styles.priceValueContainer}>
                    <div>Такси:</div>
                    <div className={styles.priceValue}>
                        {`${taxiPrice.toLocaleString()} руб.`}
                    </div>
                </div>
                <div className={styles.priceValueContainer}>
                    <div>Итоговая стоимость:</div>
                    <div className={styles.priceValue}>
                        {`${finalPriceWithTaxi.toLocaleString()} руб.`}
                    </div>
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

    handleProfitPercentageCountChange = (profitPercentage) => {
        const { actions, project } = this.props;

        actions.setProject({ ...project, profitPercentage });
    };

    handleMaterialsChange = (materials) => {
        const { actions, project } = this.props;

        actions.setProject({ ...project, materials });
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

        const { message, status } = addMode ? await actions.createProject() : await actions.updateProject();

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
            deleteFile,
            getMaterials
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
    const { project, isProjectFetch, isProjectError, layouts, materials } = state['admin-project'];

    return { project, isProjectFetch, isProjectError, layouts, materials };
}

export default connect(mapStateToProps, mapDispatchToProps)(withNotification(Project));
