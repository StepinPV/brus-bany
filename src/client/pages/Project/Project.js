import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import CardList from '../../../components/CardList';
import PhotoCard from '../../../components/PhotoCard';
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
import { Button } from "../../../components/Button";
import withForm from '../../plugins/Form/withForm';
import FormBlock from '../../components/FormBlock';
import numberWithSpaces from '../../../utils/numberWithSpaces';
import Meta from '../../components/Meta';
import Page from "../../components/Page";

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
            return {
                breadcrumbs: [
                    ...breadcrumbsDefault,
                    { title: nextProps.project.categoryId.name, link: `/bani/${nextProps.project.categoryId.translateName}`},
                    { title: nextProps.project.layoutId.name }
                ],
                projectId: nextProps.project._id,
                selectedComplectation: nextProps.project.categoryId.complectationBlocks ? nextProps.project.categoryId.complectationBlocks.defaultItemId : null
            }
        }

        return null;
    }

    static initialAction({ dispatch, match }) {
        const { categoryName, layoutName } = match.params;
        return [
            dispatch(getProject(categoryName, layoutName)),
            dispatch(getPhotos(categoryName, layoutName))
        ];
    }

    state = {
        projectId: null,
        breadcrumbs: breadcrumbsDefault,
        additionsValue: { values: {}, price: 0 },
        deliveryAdditionsValue: { values: {}, price: 0 },
        projectBlocksValues: {},
        deliveryValue: null,
        formData: null
    };

    componentDidMount() {
        const { match, actions, project, photos } = this.props;
        const { categoryName, layoutName } = match.params;

        if (!project) {
            actions.getProject(categoryName, layoutName);
        }

        if (!photos) {
            actions.getPhotos(categoryName, layoutName);
        }

        if (project) {
            this.updateFormData();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { match, actions, project } = this.props;

        if (prevProps.match !== match) {
            const { categoryName, layoutName } = match.params;
            actions.getProject(categoryName, layoutName);
            actions.getPhotos(categoryName, layoutName);
        }

        if (
            prevState.additionsValue !== this.state.additionsValue ||
            prevState.deliveryValue !== this.state.deliveryValue ||
            prevState.deliveryAdditionsValue !== this.state.deliveryAdditionsValue ||
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
        const notFound = Boolean(isProjectError) || project && (String(project.layoutId.width) !== width || String(project.layoutId.length) !== length);

        if (notFound) {
            return <Page breadcrumbs={breadcrumbs} notFound={notFound} />
        }

        return (
            <div className={styles['main-container']}>
                <Meta meta={{
                    title: `Проект ${this.renderInfoTitle(project.categoryId['name5']).toLowerCase()} - ${project.layoutId.name} от ${numberWithSpaces(this.getDefaultPrice())} рублей`,
                    description: `🏠 ${this.renderInfoTitle(project.categoryId['name2'])} «${project.layoutId.name}» 💨 Возможна перепланировка и изменение комплектации 💨 Оставьте заявку на сайте 💨 Звоните 📳 8(800)201-07-29`,
                    type: 'product',
                    image: project.images['main'],
                    imageAlt: `Проект ${this.renderInfoTitle(project.categoryId['name5']).toLowerCase()} - ${project.layoutId.name}`
                }} />
                <Header />
                { this.renderContent() }
                <Footer />
            </div>
        );
    }

    renderContent = () => {
        const { project, photos, match } = this.props;
        const { formData, breadcrumbs } = this.state;

        return project ? (
            <div className={styles.container} itemScope itemType="http://schema.org/Product">
                <div className={styles['top-block']}>
                    {this.renderGallery()}
                    {this.renderInfo()}
                </div>
                <div className={styles['breadcrumbs-container']}>
                    <Breadcrumbs items={breadcrumbs} />
                </div>
                {project.categoryId.equipment && project.categoryId.equipment.length ? <BaseEquipment equipment={project.categoryId.equipment} /> : null}
                {this.renderComplectationBlock()}
                {this.renderProjectBlocks()}
                {this.renderAdditions()}
                {this.renderDelivery()}
                {this.renderFinalPrice()}
                {photos && photos.length ? (
                    <DataSection bgStyle='grey' caption='Фотоотчеты построенной бани' captionTag='h2'>
                        <CardList items={photos.map(photo => ({
                            id: photo._id,
                            element: (
                                <PhotoCard
                                    photo={photo}
                                    category={project.categoryId}
                                    layout={photo.projectId.layoutId} />
                            )
                        }))} />
                    </DataSection>
                ) : null}
                <FormBlock source={match.url} data={formData} />
            </div>
        ) : null;
    };

    renderAdditions = () => {
        const { project } = this.props;
        const { additionsValue } = this.state;

        const handleAdditions = (additionsValue) => {
            this.setState({ additionsValue });
        };

        const { layoutId: params } = project;
        const getPrice = formula => {
            // eslint-disable-next-line
            try {
                // eslint-disable-next-line
                return Math.round(eval(formula) / 100) * 100;
            } catch(err) {
                return 0;
            }
        };

        return project.categoryId.additions && project.categoryId.additions.length ? (
            <Additions
                caption='Выберите дополнения'
                value={additionsValue}
                additions={project.categoryId.additions}
                getPrice={getPrice}
                onChange={handleAdditions} />
        ) : null;
    }

    renderDelivery = () => {
        const { project } = this.props;
        const { deliveryAdditionsValue, deliveryValue } = this.state;
        const { categoryId } = project;
        const { deliveryData } = categoryId;

        const handleDelivery = (deliveryValue) => {
            this.setState({ deliveryValue });
        };

        const handleAdditions = (value) => {
            this.setState({ deliveryAdditionsValue: value });
        };

        const { layoutId: params } = project;
        const { length: deliveryLength } = deliveryValue || { length: 0 };
        const getPrice = formula => {
            // eslint-disable-next-line
            try {
                // eslint-disable-next-line
                return Math.round(eval(formula) / 100) * 100;
            } catch(err) {
                return 0;
            }
        };

        function calculate(deliveryLength) {
            return Math.max(eval(deliveryData.delivery) * deliveryLength, 500);
        }

        return deliveryData ? (
            <>
                {deliveryData.delivery ? (
                    <DeliveryMap
                        calculate={calculate}
                        id='delivery'
                        onChange={handleDelivery}
                        tariff={eval(deliveryData.delivery)} />
                ) : null}
                {deliveryData.additions && deliveryData.additions.length ? (
                    <Additions
                        value={deliveryAdditionsValue}
                        additions={deliveryData.additions}
                        getPrice={getPrice}
                        onChange={handleAdditions}
                        description={`
                            Пункт доставки: ${deliveryValue ? `${deliveryValue.address}` : 'Не выбран'}<br/>
                            Расстояние доставки: ${deliveryValue ? `${deliveryValue.length} км` : '0 км'}
                        `} />
                ) : null}
            </>
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
        const price = this.getDefaultPrice();

        return (
            <div className={styles['info']}>
                <h1 className={styles['info-title']} itemProp="name">
                    {`${this.renderInfoTitle(project.categoryId.name2)} `}
                    <span className={styles['info-title-layout']}>«{project.layoutId.name}»</span>
                </h1>
                <div className={styles['info-addition']} itemProp="description">
                    <div>Общая площадь - {project.layoutId.area}м<sup>2</sup></div>
                    <div>Площадь сруба - {project.layoutId.frameArea}м<sup>2</sup></div>
                    {project.layoutId.terrace && project.layoutId.terrace.area ? (<div>Площадь террасы - {project.layoutId.terrace.area}м<sup>2</sup></div>) : null}
                    {project.layoutId.porch && project.layoutId.porch.area ? (<div>Площадь крыльца - {project.layoutId.porch.area}м<sup>2</sup></div>) : null}
                    {project.layoutId.attic && project.layoutId.attic.area ? (<div>Площадь мансарды - {project.layoutId.attic.area}м<sup>2</sup></div>) : null}
                </div>
                <div className={styles['info-price']} itemProp="offers" itemScope itemType="http://schema.org/Offer">
                    <meta itemProp="price" content={price} />
                    <meta itemProp="priceCurrency" content="RUB" />
                    <link itemProp="availability" href="http://schema.org/InStock" />
                    {`${numberWithSpaces(price)} руб`}
                </div>
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
        } else if (attic && porch) {
            title += ' c мансардой и крыльцом';
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
            <>
                <div className={styles['final-price-block-static']}>
                    <div className={styles['final-price-block-static-title']}>Итоговая стоимость с учетом всех данных:</div>
                    <div className={styles['final-price-block-static-price']}>{`${numberWithSpaces(finalPrice)} рублей`}</div>
                    <Button
                        onClick={() => { showForm({ source: match.url, title: 'Оформление заявки', data: formData }) }}
                        caption='Оформить заявку'
                        size='m'
                        type='yellow' />
                </div>
                <div className={styles['final-price-block']}>
                    <div className={styles['final-price-block-title']}>{`Итоговая стоимость: ${numberWithSpaces(finalPrice)} руб`}</div>
                    <Button
                        onClick={() => { showForm({ source: match.url, title: 'Оформление заявки', data: formData }) }}
                        caption='Заказать баню'
                        size='s'
                        type='yellow' />
                </div>
            </>
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
                getSecondButtonTitle={item => project.prices && project.prices[item.id] ? `${numberWithSpaces(project.prices[item.id], '&nbsp;')}&nbsp;руб` : null} />
        );
    };

    renderProjectBlock = (projectBlock) => {
        const { project } = this.props;
        const { projectBlocksValues } = this.state;
        const { layoutId: params } = project;

        return (
            <ProjectBlock
                key={projectBlock._id}
                idField='_id'
                {...projectBlock}
                selectedId={projectBlocksValues[projectBlock._id]}
                onChange={value => {
                    this.setState({
                        projectBlocksValues: {
                            ...projectBlocksValues,
                            [projectBlock._id]: value
                        }
                    })
                }}
                getSecondButtonTitle={(item) => {
                    return `${numberWithSpaces(eval(item.price), '&nbsp;')}&nbsp;руб`
                }} />
        );
    };

    getFinalPrice = () => {
        const { project } = this.props;
        const { additionsValue, deliveryValue, projectBlocksValues, selectedComplectation, deliveryAdditionsValue } = this.state;

        let projectBlocksPriceFixed = 0;
        const { layoutId: params } = project;

        if (project.categoryId.projectBlocks) {
            project.categoryId.projectBlocks.forEach(block => {
                const selectedItemId = projectBlocksValues[block._id];

                if (selectedItemId) {
                    const selectedItem = block.items.find(item => item._id === selectedItemId);

                    if (selectedItem) {
                        projectBlocksPriceFixed += eval(selectedItem.price);
                    }
                }
            });
        }

        let finalPrice = (project.prices ? project.prices[selectedComplectation] || 0 : 0) + projectBlocksPriceFixed;
        finalPrice = Math.round(finalPrice / 100) * 100;

        if (additionsValue && additionsValue.price) finalPrice += additionsValue.price;
        if (deliveryAdditionsValue && deliveryAdditionsValue.price) finalPrice += deliveryAdditionsValue.price;
        if (deliveryValue && deliveryValue.price) finalPrice += deliveryValue.price;

        return finalPrice;
    };

    updateFormData = () => {
        const { project } = this.props;
        const {
            additionsValue,
            deliveryValue,
            projectBlocksValues,
            selectedComplectation,
            deliveryAdditionsValue } = this.state;
        const data = [];


        const complectations = project.categoryId.complectationBlocks;
        if (complectations && complectations.items && complectations.items.length) {
            const complectation = complectations.items.find(com => com.id === selectedComplectation);

            data.push({
                type: 'fields',
                title: 'Комплектация',
                fields: [{
                    name: `${complectations.itemTitle} ${complectation.name}`,
                    value: project.prices && project.prices[selectedComplectation] || 0
                }]
            });
        }

        const { layoutId: params } = project;
        if (project.categoryId.projectBlocks && project.categoryId.projectBlocks.length) {
            project.categoryId.projectBlocks.forEach(block => {
                if (projectBlocksValues[block._id]) {
                    const selectedValue = block.items.find(item => item._id === projectBlocksValues[block._id]);
                    data.push({
                        type: 'fields',
                        title: block.itemTitle,
                        fields: [{
                            name: selectedValue.name,
                            value: eval(selectedValue.price)
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
                title: 'Доставка',
                fields: [{
                    id: 'address',
                    name: 'Адрес',
                    value: deliveryValue.address
                }, {
                    name: 'Расстояние',
                    value: `${deliveryValue.length} км`
                }, {
                    name: 'Стоимость',
                    value: deliveryValue.price
                }]
            });
        }

        if (deliveryAdditionsValue && deliveryAdditionsValue.price > 0) {
            const additionsData = {
                type: 'fields',
                title: 'Выбраные дополнения к доставке',
                fields: []
            };

            const { layoutId: params } = project;
            const { length: deliveryLength } = deliveryValue || { length: 0 };

            const getAdditionsPrice = price => {
                // eslint-disable-next-line
                try {
                    // eslint-disable-next-line
                    return Math.round(eval(price) / 100) * 100;
                } catch(err) {
                    return 0;
                }
            };

            Object.keys(deliveryAdditionsValue.values).forEach(key => {
                additionsData.fields.push({
                    name: deliveryAdditionsValue.values[key].name + (deliveryAdditionsValue.values[key].type === 'count' ? ` (${deliveryAdditionsValue.values[key].value})` : ''),
                    value: getAdditionsPrice(deliveryAdditionsValue.values[key].price)
                })
            });

            additionsData.fields.push({
                name: 'Общая стоимость дополнений',
                value: deliveryAdditionsValue.price
            });

            data.push(additionsData);
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
    };

    getDefaultPrice = () => {
        const { project } = this.props;
        return project.prices && project.categoryId.complectationBlocks && project.prices[project.categoryId.complectationBlocks.defaultItemId] || 0;
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
