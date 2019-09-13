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
import Bakes from './resources/Bakes';
import Foundation from './resources/Foundation';
import BaseEquipment from './resources/BaseEquipment';
import Gallery from './resources/Gallery';
import { getProject, resetData, getPhotos } from './actions';
import styles from './Project.module.css';
import DataSection from '../../components/DataSection';
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import withForm from '../../plugins/Form/withForm';

const breadcrumbsDefault = [{
    title: 'Главная',
    link: '/'
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
                projectId: nextProps.project.layoutId.name
            }
        }

        return null;
    }

    state = {
        projectId: null,
        breadcrumbs: breadcrumbsDefault,
        additionsValue: { values: {}, price: 0 },
        foundationValue: null,
        bakeValue: null,
        deliveryValue: null
    };

    componentDidUpdate(prevProps, prevState) {
        const { match, actions, project } = this.props;

        if (prevProps.match !== match) {
            const { categoryName, layoutName } = match.params;
            actions.getProject(categoryName, layoutName);
        }

        if (project !== prevProps.project) {
            actions.getPhotos(project._id);
        }
    }

    componentDidMount() {
        const { match, actions } = this.props;
        const { categoryName, layoutName } = match.params;

        actions.getProject(categoryName, layoutName);
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
                <Breadcrumbs items={breadcrumbs} className={styles.breadcrumbs} />
                { isProjectError ? <div className={styles.error}>{isProjectError}</div> : this.renderContent() }
                <Footer />
            </>
        );
    }

    renderContent = () => {
        const { project, photos } = this.props;
        const { additionsValue, foundationValue, bakeValue } = this.state;

        return project ? (
            <div className={styles.container} itemScope itemType="http://schema.org/Product">
                <div className={styles['top-block']}>
                    {this.renderGallery()}
                    {this.renderInfo()}
                </div>
                <BaseEquipment pathname={this.props.location.pathname} />
                <Foundation onChange={this.handleFoundation} value={foundationValue} />
                <Bakes onChange={this.handleBake} value={bakeValue} />
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
        const title = this.renderInfoTitle();

        [{
            key: 'main',
            alt: title
        }, {
            key: 'top',
            alt: `${title} - фотография сверху`
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

        return (
            <div className={styles['info']}>
                <h1 className={styles['info-title']} itemProp="name">
                    {`${this.renderInfoTitle()} - `}
                    <span className={styles['info-title-layout']}>{project.layoutId.name}</span>
                </h1>
                <div className={styles['info-addition']}>
                    <div>Общая площадь - {project.layoutId.area}м<sup>2</sup></div>
                    <div>Площадь сруба - {project.layoutId.frameArea}м<sup>2</sup></div>
                    {project.layoutId.terrace && project.layoutId.terrace.area ? (<div>Площадь терассы - {project.layoutId.terrace.area}м<sup>2</sup></div>) : null}
                    {project.layoutId.porch && project.layoutId.porch.area ? (<div>Площадь крыльца - {project.layoutId.porch.area}м<sup>2</sup></div>) : null}
                    {project.layoutId.attic && project.layoutId.attic.area ? (<div>Площадь мансарды - {project.layoutId.attic.area}м<sup>2</sup></div>) : null}
                </div>
                {project.price ? (
                    <div className={styles['info-price']} itemScope itemType="http://schema.org/Offer">
                        <meta itemProp="price" content={project.price} />
                        <meta itemProp="priceCurrency" content="RUB" />
                        <link itemProp="availability" href="http://schema.org/InStock" />
                        {`${project.price.toLocaleString()} руб.`}
                    </div>
                ) : null}
                <div className={styles['info-buttons']}>
                    <Button onClick={() => { showForm({ source: match.url, title: 'Оформление заявки', data: this.getFormData() }) }} className={styles['info-button']} caption='Заказать баню' size='s' />
                    <Button onClick={() => { showForm({ source: match.url, data: this.getFormData() }) }} className={styles['info-button']} caption='Обсудить проект со специалистом' size='s' type='yellow' />
                </div>
                <div className={styles['info-build-time']}>Срок строительства - {project.buildTime} дней</div>
                <div className={styles['info-links']}>
                    <div className={styles['info-links-header']}>Из чего складывается итоговая цена?</div>
                    <a href='#base' className={styles['info-links-item']}>1. Базовая комплектация</a>
                    <a href='#foundation' className={styles['info-links-item']}>2. Фундамент</a>
                    <a href='#bake' className={styles['info-links-item']}>3. Печь</a>
                    <a href='#additions' className={styles['info-links-item']}>4. Дополнения к бане</a>
                    <a href='#delivery' className={styles['info-links-item']}>5. Стоимость доставки</a>
                </div>
            </div>
        )
    };

    renderInfoTitle = () => {
        const { project: { layoutId, categoryId } } = this.props;

        let title = `${categoryId.name2} ${layoutId.width}x${layoutId.length}`;

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
        const { project, showForm, match } = this.props;
        const { bakeValue, foundationValue, additionsValue, deliveryValue } = this.state;

        let finalPrice = project.price;
        if (bakeValue && bakeValue.price) finalPrice += bakeValue.price;
        if (foundationValue && foundationValue.price) finalPrice += foundationValue.price;
        if (additionsValue && additionsValue.price) finalPrice += additionsValue.price;
        if (deliveryValue && deliveryValue.price) finalPrice += deliveryValue.price;

        return (
            <div className={styles['final-price-block']}>
                <div className={styles['final-price-block-title']}>Итоговая стоимость</div>
                <div className={styles['final-price-block-data']}>
                    <div className={styles['final-price-block-item']}>{`Базовая комплектация - ${project.price.toLocaleString()} руб`}</div>
                    <div className={styles['final-price-block-item']}>+</div>
                    <div className={styles['final-price-block-item']}>{`Печь - ${bakeValue ? bakeValue.price.toLocaleString() + ' руб' : 'Не выбрано'}`}</div>
                    <div className={styles['final-price-block-item']}>+</div>
                    <div className={styles['final-price-block-item']}>{`Фундамент - ${foundationValue ? foundationValue.price.toLocaleString() + ' руб' : 'Не выбрано'}`}</div>
                    <div className={styles['final-price-block-item']}>+</div>
                    <div className={styles['final-price-block-item']}>{`Дополнения - ${additionsValue ? additionsValue.price.toLocaleString() + ' руб' : 'Не выбрано'}`}</div>
                    <div className={styles['final-price-block-item']}>+</div>
                    <div className={styles['final-price-block-item']}>{`Доставка - ${deliveryValue ? deliveryValue.price.toLocaleString() + ' руб' : 'Не выбрано'}`}</div>
                </div>
                <div className={styles['final-price-block-res']}>=</div>
                <div className={styles['final-price-block-res-price']}>{finalPrice.toLocaleString()} руб</div>
                <Button
                    onClick={() => { showForm({ source: match.url, title: 'Оформление заявки', data: this.getFormData() }) }}
                    className={styles['info-button']}
                    caption='Заказать баню'
                    type='yellow' />
            </div>
        )
    };

    handleAdditions = (additionsValue) => {
        this.setState({ additionsValue });
    };

    handleFoundation = (foundationValue) => {
        this.setState({ foundationValue });
    };

    handleBake = (bakeValue) => {
        this.setState({ bakeValue });
    };

    handleDelivery = (deliveryValue) => {
        this.setState({ deliveryValue });
    };

    getFinalPrice = () => {
        const { project } = this.props;
        const { bakeValue, foundationValue, additionsValue, deliveryValue } = this.state;

        let finalPrice = project.price;
        if (bakeValue && bakeValue.price) finalPrice += bakeValue.price;
        if (foundationValue && foundationValue.price) finalPrice += foundationValue.price;
        if (additionsValue && additionsValue.price) finalPrice += additionsValue.price;
        if (deliveryValue && deliveryValue.price) finalPrice += deliveryValue.price;

        return finalPrice;
    };

    getFormData = () => {
        const { project } = this.props;
        const { foundationValue, bakeValue, additionsValue, deliveryValue } = this.state;
        const data = [];

        if (foundationValue) {
            data.push({
                type: 'fields',
                title: 'Данные о выбранном фундаменте',
                fields: [{
                    name: 'Тип',
                    value: foundationValue.name
                }, {
                    name: 'Цена',
                    value: foundationValue.price
                }]
            })
        }

        if (bakeValue) {
            data.push({
                type: 'fields',
                title: 'Данные о выбранной печи',
                fields: [{
                    name: 'Тип',
                    value: bakeValue.name
                }, {
                    name: 'Цена',
                    value: bakeValue.price
                }]
            })
        }

        if (additionsValue && additionsValue.price > 0) {
            const additionsData = {
                type: 'fields',
                title: 'Выбраные дополнения',
                fields: []
            };

            Object.keys(additionsValue.values).forEach(key => {
                additionsData.fields.push({
                    name: additionsValue.values[key].name + (additionsValue.values[key].type === 'count' ? ` (${additionsValue.values[key].value})` : ''),
                    value: additionsValue.values[key].price
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
            })
        }

        data.push({
            type: 'fields',
            title: 'Итог',
            fields: [{
                name: 'Базовая стоимость бани',
                value: project.price
            }, {
                name: 'Итоговая стоимость бани',
                value: this.getFinalPrice()
            }]
        });

        return data;
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
