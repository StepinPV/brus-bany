import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import CardList from '../../components/CardList';
import PhotoCard from '../../components/PhotoCard';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Additions from './resources/Additions';
import DeliveryMap from '../../components/DeliveryMap';
import ProjectBlock from './resources/ProjectBlock';
import BaseEquipment from './resources/BaseEquipment';
import Gallery from './resources/Gallery';
import { getProject, resetData, getPhotos } from './actions';
import styles from './Project.module.css';
import DataSection from '../../components/DataSection';
import Footer from "../../components/Footer";
import { Button } from "../../components/Button";
import withForm from '../../plugins/Form/withForm';
import FormBlock from '../../components/FormBlock';
import NotFound from '../../components/NotFound';
import numberWithSpaces from '../../../utils/numberWithSpaces';
import Meta from '../../components/Meta';

const breadcrumbsDefault = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Категории бань',
    link: '/bani'
}];

class Project extends PureComponent {
    static propTypes = {
        isProjectError: PropTypes.string,
        project: PropTypes.object,
        photos: PropTypes.array,

        actions: PropTypes.object,
        match: PropTypes.object,

        showForm: PropTypes.func
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.project && prevState.projectId !== nextProps.project._id) {

            const projectBlocksValues = {};
            nextProps.project.categoryId.projectBlocks.forEach(block => {
                projectBlocksValues[block.id] = block.defaultItemId;
            });

            return {
                breadcrumbs: [
                    ...breadcrumbsDefault,
                    { title: nextProps.project.categoryId.name, link: `/bani/${nextProps.project.categoryId.translateName}`},
                    { title: nextProps.project.layoutId.name }
                ],
                projectId: nextProps.project._id,
                projectBlocksValues,
                selectedComplectation: nextProps.project.categoryId.complectationBlocks ? nextProps.project.categoryId.complectationBlocks.defaultItemId : null
            }
        }

        return null;
    }

    static initialAction({ dispatch, match }) {
        const { categoryName, layoutName } = match.params;
        //TODO ФОТОГРАФИИ
        return [dispatch(getProject(categoryName, layoutName))];
    }

    state = {
        projectId: null,
        breadcrumbs: breadcrumbsDefault,
        additionsValue: { values: {}, price: 0 },
        projectBlocksValues: {},
        deliveryValue: null,
        formData: null
    };

    componentDidMount() {
        const { match, actions } = this.props;
        const { categoryName, layoutName } = match.params;

        actions.getProject(categoryName, layoutName);
        this.updateFormData();
    }

    componentDidUpdate(prevProps, prevState) {
        const { match, actions, project } = this.props;

        if (prevProps.match !== match) {
            const { categoryName, layoutName } = match.params;
            actions.getProject(categoryName, layoutName);
        }

        if (project !== prevProps.project) {
            actions.getPhotos(project._id);
        }

        if (
            prevState.additionsValue !== this.state.additionsValue ||
            prevState.deliveryValue !== this.state.deliveryValue ||
            prevState.projectBlocksValues !== this.state.projectBlocksValues ||
            prevState.selectedComplectation !== this.state.selectedComplectation) {
            this.updateFormData();
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { isProjectError, match, project } = this.props;
        const { width, length } = match.params;
        const { breadcrumbs } = this.state;

        const meta = {
            title: `Проект ${this.renderInfoTitle(project.categoryId.name).toLowerCase()} - ${project.layoutId.name} от ${numberWithSpaces(project.price)} рублей`,
            description: `Построим баню за ${project.buildTime} дней. Возможна перепланировка и изменение комплектации. Оставьте заявку на сайте, чтобы узнать итоговую стоимость`
        };

        return (
            <div className={styles['main-container']}>
                <Meta meta={meta} />
                <Header />
                {isProjectError || project && (String(project.layoutId.width) !== width || String(project.layoutId.length) !== length) ? (
                    <NotFound />
                ) : (
                    <>
                        <Breadcrumbs items={breadcrumbs} className={styles.breadcrumbs} />
                        { this.renderContent() }
                    </>
                )}
                <Footer />
            </div>
        );
    }

    renderContent = () => {
        const { project, photos, match } = this.props;
        const { additionsValue, formData } = this.state;

        return project ? (
            <div className={styles.container} itemScope itemType="http://schema.org/Product">
                <div className={styles['top-block']}>
                    {this.renderGallery()}
                    {this.renderInfo()}
                </div>
                <BaseEquipment project={project} />
                {this.renderComplectationBlock()}
                {this.renderProjectBlocks()}
                <Additions value={additionsValue} additions={project.categoryId.additions} layout={project.layoutId} onChange={this.handleAdditions} />
                <DeliveryMap id='delivery' onChange={this.handleDelivery} />
                {this.renderFinalPrice()}
                {photos && photos.length ? (
                    <DataSection bgStyle='grey' caption='Фотоотчеты построенной бани' captionTag='h2'>
                        <CardList items={photos.map(photo => ({
                            id: photo._id,
                            element: <PhotoCard photo={photo} />
                        }))} />
                    </DataSection>
                ) : null}
                <FormBlock source={match.url} data={formData} />
            </div>
        ) : null;
    };

    renderGallery = () => {
        const { project } = this.props;

        // TODO Это надо исключить!
        if (!project.images) {
            return null;
        }

        const images = [];
        const title = this.renderInfoTitle(project.categoryId.name2);

        [{
            key: 'main',
            alt: title
        }, {
            key: 'top',
            alt: `${title} - фотография сверху`
        }, {
            key: 'top2',
            alt: `${title} - фотография сверху (второй этаж)`
        }, {
            key: '1',
            alt: `${title} - фотография слева`
        }, {
            key: '2',
            alt: `${title} - фотография справа`
        }, {
            key: '3',
            alt: `${title} - фотография сзади`
        }, {
            key: 'layout',
            alt: `${title} - планировка`
        }].forEach(({ key, alt }) => {
            if (project.images[key]) {
                images.push({ src: project.images[key], alt });
            }
        });

        return (
            <div className={styles.gallery}>
                <Gallery images={images} />
            </div>
        )
    };

    renderInfo = () => {
        const { project, showForm, match } = this.props;
        const { formData } = this.state;

        return (
            <div className={styles['info']}>
                <h1 className={styles['info-title']} itemProp="name">
                    {`${this.renderInfoTitle(project.categoryId.name2)} `}
                    <span className={styles['info-title-layout']}>«{project.layoutId.name}»</span>
                </h1>
                <div className={styles['info-addition']} itemProp="description">
                    <div>Общая площадь - {project.layoutId.area}м<sup>2</sup></div>
                    <div>Площадь сруба - {project.layoutId.frameArea}м<sup>2</sup></div>
                    {project.layoutId.terrace && project.layoutId.terrace.area ? (<div>Площадь терассы - {project.layoutId.terrace.area}м<sup>2</sup></div>) : null}
                    {project.layoutId.porch && project.layoutId.porch.area ? (<div>Площадь крыльца - {project.layoutId.porch.area}м<sup>2</sup></div>) : null}
                    {project.layoutId.attic && project.layoutId.attic.area ? (<div>Площадь мансарды - {project.layoutId.attic.area}м<sup>2</sup></div>) : null}
                </div>
                {project.price ? (
                    <div className={styles['info-price']} itemProp="offers" itemScope itemType="http://schema.org/Offer">
                        <meta itemProp="price" content={project.price} />
                        <meta itemProp="priceCurrency" content="RUB" />
                        <link itemProp="availability" href="http://schema.org/InStock" />
                        {`${numberWithSpaces(project.price)} руб.`}
                    </div>
                ) : null}
                <div className={styles['info-buttons']}>
                    <Button onClick={() => { showForm({ source: match.url, title: 'Оформление заявки', data: formData }) }} className={styles['info-button']} caption='Заказать баню' size='s' />
                    <Button onClick={() => { showForm({ source: match.url, data: formData }) }} className={styles['info-button']} caption='Обсудить проект со специалистом' size='s' type='yellow' />
                </div>
                <div className={styles['info-build-time']}>Срок строительства - {project.buildTime} дней</div>
                <div className={styles['info-links']}>
                    <div className={styles['info-links-header']}>Из чего складывается итоговая цена?</div>
                    <a href='#base' className={styles['info-links-item']}>1. Базовая комплектация</a>
                    <a href='#additions' className={styles['info-links-item']}>2. Дополнения к бане</a>
                    <a href='#delivery' className={styles['info-links-item']}>3. Стоимость доставки</a>
                </div>
            </div>
        )
    };

    renderInfoTitle = (categoryName) => {
        const { project: { layoutId } } = this.props;

        let title = `${categoryName} ${layoutId.width}x${layoutId.length}`;

        const { terrace, attic, porch } = layoutId;

        if (terrace && attic && porch) {
            title += ' c террасой, мансардой и крыльцом';
        } else if (terrace && attic) {
            title += ' c террасой и мансардой';
        } else if (terrace && porch) {
            title += ' c террасой и крыльцом';
        } else if (terrace) {
            title += ' c террасой';
        } else if (attic) {
            title += ' c мансардой';
        } else if (porch) {
            title += ' c крыльцом';
        }

        return title;
    };

    renderFinalPrice = () => {
        const { showForm, match } = this.props;
        const { formData } = this.state;

        const finalPrice = this.getFinalPrice();

        return (
            <div className={styles['final-price-block']}>
                <div className={styles['final-price-block-title']}>{`Итоговая стоимость: ${numberWithSpaces(finalPrice)} руб`}</div>
                <Button
                    onClick={() => { showForm({ source: match.url, title: 'Оформление заявки', data: formData }) }}
                    caption='Заказать баню'
                    size='s'
                    type='yellow' />
            </div>
        )
    };

    renderProjectBlocks = () => {
        const { project: { categoryId } } = this.props;

        if (categoryId.projectBlocks && categoryId.projectBlocks.length) {
            return categoryId.projectBlocks.map(projectBlock => this.renderProjectBlock(projectBlock))
        }
    };

    renderComplectationBlock = () => {
        const { project } = this.props;
        const { selectedComplectation } = this.state;

        const { complectationBlocks } = project.categoryId;

        if (!complectationBlocks || !complectationBlocks.items || complectationBlocks.items.length < 2) {
            return null;
        }

        return (
            <ProjectBlock
                {...project.categoryId.complectationBlocks}
                required
                selectedId={selectedComplectation}
                onChange={value => {
                    this.setState({
                        selectedComplectation: value
                    })
                }}
                getSecondButtonTitle={item => project.prices && project.prices[item.id] ? `${numberWithSpaces(project.prices[item.id])} руб` : null} />
        );
    };

    renderProjectBlock = (projectBlock) => {
        const { project } = this.props;
        const { projectBlocksValues } = this.state;

        return (
            <ProjectBlock
                key={projectBlock.id}
                {...projectBlock}
                selectedId={projectBlocksValues[projectBlock.id]}
                onChange={value => {
                    this.setState({
                        projectBlocksValues: {
                            ...projectBlocksValues,
                            [projectBlock.id]: value
                        }
                    })
                }}
                getSecondButtonTitle={(item) => {
                    if (project.projectBlocks && project.projectBlocks[projectBlock.id] && project.projectBlocks[projectBlock.id][item.id]) {
                        return `${numberWithSpaces(project.projectBlocks[projectBlock.id][item.id].price)} руб`
                    }

                    return null;
                }} />
        );
    };

    handleAdditions = (additionsValue) => {
        this.setState({ additionsValue });
    };

    handleDelivery = (deliveryValue) => {
        this.setState({ deliveryValue });
    };

    getFinalPrice = () => {
        const { project, project: { projectBlocks } } = this.props;
        const { additionsValue, deliveryValue, projectBlocksValues, selectedComplectation } = this.state;

        let projectBlocksPriceFixed = 0;

        if (project.categoryId.projectBlocks) {
            project.categoryId.projectBlocks.forEach(block => {
                const selectedItemId = projectBlocksValues[block.id];

                if (selectedItemId) {
                    projectBlocksPriceFixed += projectBlocks && projectBlocks[block.id] && projectBlocks[block.id][selectedItemId].price ? projectBlocks[block.id][selectedItemId].price : 0;
                }
            });
        }

        let finalPrice = (project.prices ? project.prices[selectedComplectation] || 0 : 0) + projectBlocksPriceFixed;
        finalPrice = Math.round(finalPrice / 100) * 100;

        if (additionsValue && additionsValue.price) finalPrice += additionsValue.price;
        if (deliveryValue && deliveryValue.price) finalPrice += deliveryValue.price;

        return finalPrice;
    };

    updateFormData = () => {
        const { project } = this.props;
        const { additionsValue, deliveryValue, projectBlocksValues, selectedComplectation } = this.state;
        const data = [];


        const complectations = project.categoryId.complectationBlocks;
        if (complectations && complectations.items && complectations.items.length) {
            const complectation = complectations.items.find(com => com.id === selectedComplectation);

            data.push({
                type: 'fields',
                title: 'Комплектация',
                fields: [{
                    name: `${complectations.itemTitle} ${complectation.name}`,
                    value: project.prices[selectedComplectation]
                }]
            });
        }

        if (project.categoryId.projectBlocks && project.categoryId.projectBlocks.length) {
            project.categoryId.projectBlocks.forEach(block => {
                if (projectBlocksValues[block.id]) {
                    const selectedValue = block.items.find(item => item.id === projectBlocksValues[block.id]);
                    data.push({
                        type: 'fields',
                        title: block.itemTitle,
                        fields: [{
                            name: selectedValue.name,
                            value: project.projectBlocks[block.id][projectBlocksValues[block.id]].price
                        }]
                    });
                }
            });
        }

        if (additionsValue && additionsValue.price > 0) {
            const additionsData = {
                type: 'fields',
                title: 'Выбраные дополнения',
                fields: []
            };

            const { layoutId: params } = project;

            const getAdditionsPrice = price => {
                // eslint-disable-next-line
                try {
                    // eslint-disable-next-line
                    return Math.round(eval(price) / 100) * 100;
                } catch(err) {
                    return 0;
                }
            };

            Object.keys(additionsValue.values).forEach(key => {
                additionsData.fields.push({
                    name: additionsValue.values[key].name + (additionsValue.values[key].type === 'count' ? ` (${additionsValue.values[key].value})` : ''),
                    value: getAdditionsPrice(additionsValue.values[key].price)
                })
            });

            additionsData.fields.push({
                name: 'Общая стоимость дополнений',
                value: additionsValue.price
            });

            data.push(additionsData);
        }

        if (deliveryValue) {
            data.push({
                type: 'fields',
                title: 'Стоимость доставки',
                fields: [{
                    name: 'Стоимость доставки',
                    value: deliveryValue.price
                }]
            });
        }

        data.push({
            type: 'fields',
            title: 'Итог',
            fields: [{
                name: 'Итоговая стоимость бани',
                value: this.getFinalPrice()
            }]
        });

        this.setState({ formData: data });
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
            getPhotos,
            resetData
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
    const { isProjectError, project, photos } = state['client-project'];

    return { isProjectError, project, photos };
}

export default connect(mapStateToProps, mapDispatchToProps)(withForm(Project));
