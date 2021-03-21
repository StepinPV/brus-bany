import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CardList from '../../../components/CardList';
import PhotoCard from '../../../components/PhotoCard';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Additions, { getAdditionsPrice } from './resources/Additions';
import DeliveryMap from '../../components/DeliveryMap';
import ProjectBlock from './resources/ProjectBlock';
import Equipment, { getEquipmentFinalPrice } from './resources/Equipment';
import Gallery from './resources/Gallery';
import { getProject, resetData, getPhotos } from './actions';
import styles from './Project.module.css';
import DataSection from '../../components/DataSection';
import { Button } from "../../../components/Button";
import withForm from '../../plugins/Form/withForm';
import FormBlock from '../../components/FormBlock';
import numberWithSpaces from '../../../utils/numberWithSpaces';
import filterObject from '../../../utils/filterObject';
import Meta from '../../components/Meta';
import Page from "../../components/Page";
import { Header, Footer } from '@constructor-components';

function parseQuery(uri) {
    const [, params] = uri.split('?');

    return decodeURIComponent(params).split('&').reduce((acc, item) => {
        const [key, value] = item.split('=');
        acc[key] = value;
        return acc;
    }, {});
}

const breadcrumbsDefault = [{
    title: 'Главная',
    link: '/'
}];

const CP = loadable(() => import('./resources/CP'));

class Project extends PureComponent {
    static propTypes = {
        isProjectError: PropTypes.string,
        project: PropTypes.object,
        photos: PropTypes.array,

        actions: PropTypes.object,
        match: PropTypes.object,
        history: PropTypes.object,

        showForm: PropTypes.func
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        let newState = {};

        if (nextProps.location.search !== prevState.search) {
            let query;
            let data = {};
            let CPData = null;
            let test = false;

            try {
                query = nextProps.location.search ? parseQuery(nextProps.location.search) : null;
            } catch(err) {}

            try {
                data = query && query.data ? JSON.parse(query.data) : {};
            } catch(err) {}

            try {
                CPData = query && query.CPData ? JSON.parse(query.CPData) : null;
            } catch(err) {}

            try {
                test = query && query.test ? true : false;
            } catch(err) {}

            newState = {
                ...newState,
                search: nextProps.location.search,
                data,
                CPMode: query ? (query.CPMode || false) : null,
                CPData,
                test
            }
        }

        if (nextProps.project && prevState.projectId !== nextProps.project._id) {
            const breadcrumbs = [...breadcrumbsDefault];

            if (nextProps.project.categoryId.rootTranslateName === 'bani') {
                breadcrumbs.push({
                    title: `Категории бань`,
                    link: '/bani'
                });
            }

            breadcrumbs.push({ title: nextProps.project.categoryId.name, link: `${nextProps.project.categoryId.rootTranslateName === 'bani' ? '/bani' : ''}/${nextProps.project.categoryId.translateName}`});
            breadcrumbs.push({ title: nextProps.project.layoutId.name });

            newState = {
                ...newState,
                breadcrumbs,
                projectId: nextProps.project._id
            }
        }

        return newState;
    }

    static initialAction({ dispatch, match }) {
        let { categoryName, layoutName } = match.params;

        if (categoryName === 'doma-iz-brusa') {
            categoryName = null;
        }
        if (!categoryName) {
            categoryName = match.url.split('/')[1];
        }

        return [
            dispatch(getProject(categoryName, layoutName)),
            dispatch(getPhotos(categoryName, layoutName))
        ];
    }

    state = {
        projectId: null,
        breadcrumbs: breadcrumbsDefault,
        data: {},
        CPMode: false
    };

    componentDidMount() {
        const { match, actions, project, photos } = this.props;
        let { categoryName, layoutName } = match.params;

        if (!project) {
            if (categoryName === 'doma-iz-brusa') {
                categoryName = null;
            }
            if (!categoryName) {
                categoryName = match.url.split('/')[1];
            }

            actions.getProject(categoryName, layoutName);
        }

        if (!photos) {
            actions.getPhotos(categoryName, layoutName);
        }

        document.addEventListener('keydown', (e) => {
            if(e.keyCode === 49 && e.shiftKey) {
                e.preventDefault();
                e.stopPropagation();
                this.historyPush({ CPMode: !this.state.CPMode });
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { match, actions } = this.props;

        if (prevProps.match !== match) {
            let { categoryName, layoutName } = match.params;

            if (categoryName !== prevProps.match.params.categoryName || layoutName !== prevProps.match.params.layoutName) {
                if (categoryName === 'doma-iz-brusa') {
                    categoryName = null;
                }
                if (!categoryName) {
                    categoryName = match.url.split('/')[1];
                }

                actions.getProject(categoryName, layoutName);
                actions.getPhotos(categoryName, layoutName);
            }
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { isProjectError, match, project, customComponents, staticContext } = this.props;
        const { width, length } = match.params;
        const { breadcrumbs, CPMode } = this.state;
        const notFound = Boolean(isProjectError) || project && (String(project.layoutId.width) !== width || String(project.layoutId.length) !== length);

        if (notFound) {
            return <Page breadcrumbs={breadcrumbs} notFound={notFound} customComponents={customComponents} staticContext={staticContext} />
        }

        if (CPMode) {
            return this.renderCP();
        }

        const headerComponent = customComponents.find(component => component['_id'] === '5eca90f2003e3d332650c6ea');
        const footerComponent = customComponents.find(component => component['_id'] === '5eca9461003e3d332650c862');

        if (staticContext) {
            staticContext.data = staticContext.data || {};
            staticContext.data.customComponents = staticContext.data.customComponents || [];
            staticContext.data.customComponents.push(headerComponent);
            staticContext.data.customComponents.push(footerComponent);
        }

        return (
            <div className={styles['main-container']}>
                <Meta meta={{
                    title: `Проект ${this.renderInfoTitle(project.categoryId['name5']).toLowerCase()} - ${project.layoutId.name} от ${numberWithSpaces(this.getDefaultPrice())} рублей`,
                    description: `🏠 ${this.renderInfoTitle(project.categoryId['name2'])} «${project.layoutId.name}» 💨 Возможна перепланировка и изменение комплектации 💨 Оставьте заявку на сайте 💨 Звоните 📳 8(800)201-07-29`,
                    type: 'product',
                    image: project.images ? project.images['main'] : undefined,
                    imageAlt: `Проект ${this.renderInfoTitle(project.categoryId['name5']).toLowerCase()} - ${project.layoutId.name}`
                }} />
                <Header
                    {...headerComponent.config.componentsData['8488'].props}
                    button={{
                        caption: 'Обратный звонок',
                        link: '#requestForm'
                    }}
                />
                { this.renderContent() }
                <Footer {...footerComponent.config.componentsData['3912'].props} />
            </div>
        );
    }

    renderContent = () => {
        const { project, photos, match } = this.props;
        const { breadcrumbs } = this.state;

        return project ? (
            <div className={styles.container} itemScope itemType="http://schema.org/Product">
                <div className={styles['top-block']}>
                    {this.renderGallery()}
                    {this.renderInfo()}
                </div>
                <Breadcrumbs items={breadcrumbs} />
                <div className={styles['page-info']}>
                    <div className={styles['page-info-icon']}>!</div>
                    <div className={styles['page-info-text-container']}>
                        <div className={styles['page-info-text']}>
                            Далее вы можете самостоятельно рассчитать итоговую стоимость проекта, выбрав комплектацию, дополнения и адрес доставки
                        </div>
                    </div>
                </div>
                {this.renderComplectationBlock()}
                {this.renderProjectBlocks()}
                {this.renderEquipment()}
                {this.renderDelivery()}
                {this.renderAdditions()}
                {this.renderFinalPrice()}
                {photos && photos.length ? (
                    <DataSection bgStyle='white' caption='Фотоотчеты'>
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
                <FormBlock source={match.url} />
            </div>
        ) : null;
    };

    renderEquipment = () => {
        const { project: { categoryId }, project } = this.props;
        const { data } = this.state;

        const handleEquipment = (equipment) => {
            this.setData({
                ...this.state.data,
                equipment
            });
        };

        if (categoryId.baseEquipment && categoryId.baseEquipment.length) {
            return (
                <Equipment
                    value={data.equipment}
                    project={project}
                    data={data}
                    equipment={categoryId.baseEquipment}
                    onChange={handleEquipment} />
            );
        }

        return null;
    }

    renderAdditions = () => {
        const { project } = this.props;
        const { data } = this.state;

        const handleAdditions = (additions) => {
            this.setData({
                ...this.state.data,
                additions
            });
        };

        return project.categoryId.additions && project.categoryId.additions.length ? (
            <Additions
                project={project}
                data={data}
                additions={project.categoryId.additions}
                caption='Выберите дополнения'
                value={data.additions || {}}
                onChange={handleAdditions} />
        ) : null;
    }

    renderDelivery = () => {
        const { project } = this.props;
        const { data: { delivery, complectation } } = this.state;
        const { categoryId } = project;
        const { deliveryData } = categoryId;

        const handleDelivery = (value) => {
            let delivery;

            if (value) {
                const { layoutId: params } = project;
                const deliveryLength = value.length;
                const cubage = project.cubages ? (project.cubages[complectation || project.categoryId.complectationBlocks.defaultItemId] || 0) : 0;

                delivery = {
                    length: value.length,
                    address: value.address,
                    price: eval(deliveryData ? deliveryData.delivery : 0)
                }
            }

            this.setData({
                ...this.state.data,
                delivery
            });
        };

        return deliveryData ? (
            <>
                {deliveryData.delivery ? (
                    <div className={styles.delivery}>
                        <DeliveryMap
                            id='delivery'
                            defaultAddress={delivery ? delivery.address : ''}
                            onChange={handleDelivery}
                            content={delivery ? (
                                <>
                                    <div>{`Расстояние: ${delivery.length} км`}</div>
                                    <div>{`Стоимость доставки: ${numberWithSpaces(delivery.price)} руб`}</div>
                                </>
                            ) : null} />
                    </div>
                ) : null}
            </>
        ) : null;
    };

    renderCP = () => {
        const { project } = this.props;

        return (
            <CP
                onClose={() => { this.historyPush({ CPMode: false }); }}
                onChange={(data) => { this.historyPush({ CPData: data }); }}
                CPData={this.state.CPData}
                data={{
                    complectation: project.categoryId.complectationBlocks.defaultItemId,
                    ...this.state.data
                }}
                images={{
                    scheme: project.images['layout'],
                    other: [{
                        image: project.images['main']
                    }, {
                        image: project.images['top']
                    }, {
                        image: project.images['3']
                    }]
                }}
                projectName={`${this.renderInfoTitle(project.categoryId.name2)} «${project.layoutId.name}»`}
                finalPrice={this.getFinalPrice()}
                project={this.props.project}
                infoBlock={(
                    <div className={styles['info']}>
                        <h1 className={styles['info-title']} itemProp="name">
                            {`${this.renderInfoTitle(project.categoryId.name2)} `}
                            <span className={styles['info-title-layout']}>«{project.layoutId.name}»</span>
                        </h1>
                        <div className={styles['info-addition']}>
                            <div>Общая площадь - {project.layoutId.area}м<sup>2</sup></div>
                            <div>Площадь сруба - {project.layoutId.frameArea}м<sup>2</sup></div>
                            {project.layoutId.terrace && project.layoutId.terrace.area ? (<div>Площадь террасы - {project.layoutId.terrace.area}м<sup>2</sup></div>) : null}
                            {project.layoutId.porch && project.layoutId.porch.area ? (<div>Площадь крыльца - {project.layoutId.porch.area}м<sup>2</sup></div>) : null}
                            {project.layoutId.attic && project.layoutId.attic.area ? (<div>Площадь мансарды - {project.layoutId.attic.area}м<sup>2</sup></div>) : null}
                        </div>
                    </div>
                )}
            />
        );
    }

    renderGallery = () => {
        const { project } = this.props;

        // TODO Это надо исключить!
        if (!project.images) {
            return null;
        }

        const images = this.getImages();

        return (
            <div className={styles.gallery}>
                <Gallery images={images} />
            </div>
        )
    };

    getImages = () => {
        const { project } = this.props;

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

        return images;
    }

    renderInfo = () => {
        const { project, showForm, match } = this.props;
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
                    <Button onClick={() => { showForm({ source: match.url, title: 'Оформление заявки' }) }} className={styles['info-button']} caption={project.categoryId.payButton} size='s' />
                    <Button onClick={() => { showForm({ source: match.url }) }} className={styles['info-button']} caption='Обсудить проект со специалистом' size='s' type='yellow' />
                </div>
                <div className={styles['info-build-time']}>Срок строительства - {project.buildTime} дней</div>
                <div className={styles['info-block-promo']}>
                    ★ Гарантируем <span style={{ fontWeight: 'bold', color: '#5e9300' }}>лучшую цену</span>, так как являемся прямым производителем
                </div>
                <div className={styles['info-block-promo']}>
                    ★ Работаем <span style={{ fontWeight: 'bold', color: '#359bd0' }}>без предоплаты</span>
                </div>
                <div className={styles['info-block-promo']}>
                    ★ Имеем <span style={{ fontWeight: 'bold', color: '#d7b32a' }}>более 10 лет</span> опыта
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

        const finalPrice = this.getFinalPrice();

        return (
            <>
                <div className={styles['final-price-block-static']}>
                    <div className={styles['final-price-block-static-title']}>Итоговая стоимость:</div>
                    <div className={styles['final-price-block-static-price']}>{`${numberWithSpaces(finalPrice)} рублей`}</div>
                    <Button
                        onClick={() => { showForm({ source: match.url, title: 'Оформление заявки' }) }}
                        caption='Оформить заявку'
                        size='m'
                        type='yellow' />
                </div>
                <div className={styles['final-price-block']}>
                    <div className={styles['final-price-block-content']}>
                        <div className={styles['final-price-block-title']}><span className={styles['final-price-block-title-desktop']}>Итоговая стоимость: </span><span className={styles['final-price-block-title-mobile']}>Итого: </span>{numberWithSpaces(finalPrice)} руб</div>
                        <Button
                            onClick={() => { showForm({ source: match.url, title: 'Оформление заявки' }) }}
                            caption='Оформить заявку'
                            size='s'
                            type='yellow' />
                    </div>
                    <a
                        href='https://api.whatsapp.com/send?phone=79210290107'
                        title='Перейти в WatsApp'
                        target='_blank'
                        rel="noopener noreferrer">
                        <i className={styles['whats-app']} />
                    </a>
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
        const { data: { complectation } } = this.state;

        const { complectationBlocks } = project.categoryId;

        if (!complectationBlocks || !complectationBlocks.items || complectationBlocks.items.length < 2) {
            return null;
        }

        const defaultItemId = project.categoryId.complectationBlocks.defaultItemId;

        return (
            <ProjectBlock
                {...project.categoryId.complectationBlocks}
                required
                selectedId={complectation || defaultItemId}
                onChange={value => {
                    this.setData({
                        ...this.state.data,
                        complectation: value === defaultItemId ? null : value
                    })
                }}
                getSecondButtonTitle={item => project.prices && project.prices[item.id] ? `${numberWithSpaces(project.prices[item.id], '&nbsp;')}&nbsp;руб` : null} />
        );
    };

    renderProjectBlock = (projectBlock) => {
        const { project } = this.props;
        const { data: { blocks={} } } = this.state;
        const { layoutId: params } = project;

        return (
            <ProjectBlock
                key={projectBlock._id}
                idField='_id'
                {...projectBlock}
                selectedId={blocks[projectBlock._id]}
                onChange={value => {
                    const newProjectValues = {
                        ...blocks,
                        [projectBlock._id]: value
                    };

                    this.setData({
                        ...this.state.data,
                        blocks: Object.keys(newProjectValues).reduce((calc, key) => {
                            if (newProjectValues[key]) {
                                calc = calc || {};
                                calc[key] = newProjectValues[key];
                            }
                            return calc;
                        }, undefined)
                    })
                }}
                getSecondButtonTitle={(item) => {
                    return `${numberWithSpaces(eval(item.price), '&nbsp;')}&nbsp;руб`
                }} />
        );
    };

    getFinalPrice = () => {
        const { project } = this.props;
        const { data: { equipment, additions, delivery, blocks={}, complectation } } = this.state;

        let projectBlocksPriceFixed = 0;
        const { layoutId: params } = project;

        if (project.categoryId.projectBlocks) {
            project.categoryId.projectBlocks.forEach(block => {
                const selectedItemId = blocks[block._id];

                if (selectedItemId) {
                    const selectedItem = block.items.find(item => item._id === selectedItemId);

                    if (selectedItem) {
                        projectBlocksPriceFixed += eval(selectedItem.price);
                    }
                }
            });
        }

        let finalPrice = (project.prices ? project.prices[complectation || project.categoryId.complectationBlocks.defaultItemId] || 0 : 0) + projectBlocksPriceFixed;
        finalPrice = Math.round(finalPrice / 100) * 100;

        if (equipment) {
            finalPrice += getEquipmentFinalPrice(project, this.state.data, project.categoryId.baseEquipment, equipment);
        }

        if (additions) {
            finalPrice += getAdditionsPrice(project, this.state.data, project.categoryId.additions, additions);
        }

        if (delivery && delivery.price) finalPrice += delivery.price;

        return finalPrice;
    };

    getDefaultPrice = () => {
        const { project } = this.props;
        return project.prices && project.categoryId.complectationBlocks && project.prices[project.categoryId.complectationBlocks.defaultItemId] || 0;
    };

    historyPush = ({ data=this.state.data, CPMode=this.state.CPMode, CPData=this.state.CPData }) => {
        const { history, location } = this.props;

        const filteredData = filterObject(data);
        const filteredCPData = filterObject(CPData);

        const params = filterObject({
            data: filteredData ? JSON.stringify(filteredData) : null,
            CPMode: CPMode || null,
            CPData: filteredCPData ? JSON.stringify(filteredCPData) : null,
            test: this.state.test
        });

        const query = Object.keys(params || {}).reduce((str, key) => {
            str = str || '?';
            str += `${key}=${encodeURI(params[key])}&`;
            return str;
        }, '');

        history.push(`${location.pathname}${query}`);
    };

    setData = (data) => {
        this.historyPush({ data });
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
