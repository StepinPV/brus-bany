import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadcrumbs';
import Select from '../../../components/Select';
import Materials from './resources/Materials';
import {
    getProject,
    setProject,
    createProject,
    updateProject,
    resetData,
    getLayouts,
    getMaterials,
    deleteProject
} from './actions';
import withNotification from '../../../plugins/Notifications/withNotification';
import ImageUploader from '../../components/ImageUploader';
import Input from '../../../components/Input';
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

    componentDidMount() {
        const { addMode } = this.state;
        const { match, actions } = this.props;
        const { categoryId, layoutId } = match.params;

        if (addMode) {
            actions.setProject({ categoryId });
        } else {
            actions.getProject(categoryId, layoutId);
        }

        actions.getLayouts();
        actions.getMaterials();
    }

    componentDidUpdate(prevProps, prevState) {
        const { addMode } = this.state;
        const { match, actions } = this.props;

        if (prevProps.match !== match && !addMode) {
            const { categoryId, layoutId } = match.params;
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
            <>
                <Header />
                <Breadcrumbs items={breadcrumbs} />
                { isProjectError ? <div className={styles.error}>{isProjectError}</div> : this.renderContent() }
            </>
        );
    }

    renderContent = () => {
        const { addMode } = this.state;
        const { project, materials } = this.props;

        return project && materials ? (
            <div className={styles.formContainer}>
                <div className={styles.formWrapper}>
                    {this.renderLayout()}
                    {this.renderImages()}
                    {<Materials onChange={this.handleMaterialsChange} materials={materials} data={project.material || []} />}
                    {this.renderProjectBlocks()}
                    {this.renderBuildTime()}
                    {this.renderPrice()}
                    <div className={styles.saveButton} onClick={this.handleSave}>{addMode ? 'Создать' : 'Сохранить и обновить'}</div>
                    { !addMode ? <div className={styles.deleteButton} onClick={this.handleDelete}>Удалить</div> : null}
                </div>
            </div>
        ) : null;
    };

    renderProjectBlocks = () => {
        const { project } = this.props;

        if (project.categoryId.projectBlocks && project.categoryId.projectBlocks.length) {
            return (
                <div className={styles.projectBlocks}>
                    <div className={styles.projectBlocksTitle}>Дополнительные блоки к цене</div>
                    {project.categoryId.projectBlocks.map(project => this.renderProjectBlock(project))}
                </div>
            )
        }

        return null;
    };

    renderProjectBlock = (projectBlock) => {
        const { materials, actions, project } = this.props;

        const handleChangeMaterialInProjectBlock = (data, itemId) => {
            const newProjectBlocks = { ...(project.projectBlocks || {}) };
            const newCards = { ...newProjectBlocks[projectBlock.id] };
            newCards[itemId] = {
                data
            };
            newProjectBlocks[projectBlock.id] = newCards;
            actions.setProject({ ...project, projectBlocks: newProjectBlocks });
        };

        const renderPrice = (item) => {
            switch(item.price.typeId) {
                case 'material_fix':
                    project.projectBlocks = project.projectBlocks || {};
                    project.projectBlocks[projectBlock.id] = project.projectBlocks[projectBlock.id] || {};
                    project.projectBlocks[projectBlock.id][item.id] = project.projectBlocks[projectBlock.id][item.id] || {
                        data: []
                    };
                    return (
                        <Materials
                            onChange={data => {
                                handleChangeMaterialInProjectBlock(data, item.id) }
                            }
                            materials={materials}
                            data={project.projectBlocks[projectBlock.id][item.id].data} />
                    );
                case 'layout_fix':
                    const params = project.layoutId;
                    return <div style={{textAlign: 'center', marginTop: '8px'}}>Цена: {eval(item.price.value)} руб.</div>;
                    break;
                case 'fix':
                    return <div style={{textAlign: 'center', marginTop: '8px'}}>Цена: {item.price.value} руб.</div>;
                    break;

            }
        };

        return (
            <div>
                <div style={{textAlign: 'center', fontWeight: 'bold', marginTop: '16px'}}>{projectBlock.name}</div>
                <div>{projectBlock.items.map(item => {
                    return (
                        <div>
                            <div style={{textAlign: 'center', marginTop: '16px'}}>{item.name} {item.id === projectBlock.defaultItemId ? ' (По умолчанию)' : null}</div>
                            {renderPrice(item)}
                        </div>
                    )
                })}</div>
            </div>
        )
    };

    renderImages = () => {
        const { project: { images } } = this.props;

        return (
            <div className={styles.images}>
                <div className={styles.imagesTitle}>Изображения</div>
                <div className={styles.imagesItems}>
                    {IMAGES_DATA.map(({ key, title }) => (
                        <div key={key} className={styles.imagesItem}>
                            <ImageUploader title={title} image={images ? images[key] : null} onChange={file => {
                                this.handleImageChange(file, key);
                            }} />
                        </div>
                    ))}
                </div>
            </div>
        )
    };

    renderBuildTime = () => {
        const { project: { buildTime } } = this.props;

        return (
            <div className={styles.price}>
                <div className={styles.priceTitle}>Параметры</div>
                <div className={styles.profitPercentageInput}>
                    <Input
                        value={buildTime}
                        title='Срок строительства (количество дней)'
                        type='integer number'
                        required
                        min={0}
                        onChange={this.handleBuildTimeChange}
                    />
                </div>
            </div>
        )
    };

    handleBuildTimeChange = (buildTime) => {
        const { actions, project } = this.props;

        actions.setProject({ ...project, buildTime });
    };

    renderPrice = () => {
        const { project: { profitPercentage }, project, materials } = this.props;

        const salaryPercentage = 20;
        const defaultProfitPercentage = 20;
        const taxiPrice = 12000;

        const finalProfitPercentage = isNaN(parseFloat(profitPercentage)) || profitPercentage < 0 || profitPercentage >= 100 - salaryPercentage ?
            defaultProfitPercentage : profitPercentage;

        let materialsPrice = 0;

        if (project.material) {
            project.material.forEach(material => {
                const materialData = materials.find(mat => mat._id === material.id);
                materialsPrice += materialData.price * material.count;
            });
        }


        let projectBlocksPrice = 0;
        if (project.categoryId.projectBlocks) {
            project.categoryId.projectBlocks.forEach(block => {
                let defaultItemId;
                const defaultItem = block.items.find(item => {
                    if (item.id === block.defaultItemId) {
                        defaultItemId = item.id;
                        return true;
                    }
                });

                if (defaultItem) {
                    switch(defaultItem.price.typeId) {
                        case 'material_fix':
                            project.projectBlocks[block.id][defaultItemId].data.forEach(material => {
                                const materialData = materials.find(mat => mat._id === material.id);
                                projectBlocksPrice += materialData.price * material.count;
                            });
                            break;
                        case 'layout_fix':
                            const params = project.layoutId;
                            projectBlocksPrice += eval(defaultItem.price.value);
                            break;
                        case 'fix':
                            projectBlocksPrice += defaultItem.price.value;
                            break;
                    }
                }
            });
        }

        const finalPrice = (materialsPrice + projectBlocksPrice) / (1 - salaryPercentage / 100 - finalProfitPercentage / 100);

        const round = val => Math.round(val);

        const salaryPrice = round(finalPrice * salaryPercentage / 100);
        const profitPrice = round(finalPrice * finalProfitPercentage / 100);
        const finalPriceWithTaxi = round(finalPrice + taxiPrice);

        return (
            <div className={styles.price}>
                <div className={styles.priceTitle}>Стоимость проекта</div>
                <div className={styles.profitPercentageInput}>
                    <Input
                        value={profitPercentage === undefined ? defaultProfitPercentage : profitPercentage}
                        title='Процент прибыли от общей стоимости'
                        type='float number'
                        required
                        min={0}
                        onChange={this.handleProfitPercentageCountChange}
                    />
                </div>
                <div className={styles.priceValueContainer}>
                    <div>Стройматериалы + допы:</div>
                    <div className={styles.priceValue}>
                        {`${(materialsPrice + projectBlocksPrice).toLocaleString()} руб.`}
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

    handleMaterialsChange = (material) => {
        const { actions, project } = this.props;

        actions.setProject({ ...project, material });
    };

    handleLayout = (layoutId) => {
        const { actions, project } = this.props;

        actions.setProject({ ...project, layoutId });
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
            getMaterials,
            deleteProject
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
