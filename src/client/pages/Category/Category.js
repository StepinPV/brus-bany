import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Page from '../../components/Page';
import CardList from '../../../components/CardList';
import ProjectCard from '../../../components/ProjectCard';
import { Link } from '../../../components/Button';
import Article from '../../components/Article';
import PhotoCard from '../../../components/PhotoCard';
import CustomProjectCard from '../../../components/CustomProjectCard';
import DataSection from '../../components/DataSection';
import H1Block from '../../../components/H1Block';
import { getCategory, getProjects, resetData, getPhotos } from './actions';
import filterProjects from './resources/filter';
import sortProjects from './resources/sort';
import Filters from './resources/Filters';
import styles from './Category.module.css';
import FormBlock from "../../components/FormBlock";
import Meta from '../../components/Meta';
import wordByNumber from '../../../utils/wordByNumber';

const breadcrumbsDefault = [{
    title: 'Главная',
    link: '/'
}];

class Category extends PureComponent {
    static propTypes = {
        category: PropTypes.object,
        isCategoryError: PropTypes.string,
        isCategoryFetch: PropTypes.bool,

        projects: PropTypes.array,

        actions: PropTypes.object,
        match: PropTypes.object,
        location: PropTypes.object,
        history: PropTypes.object
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        let state = null;

        if (nextProps.category && prevState.categoryId !== nextProps.category._id) {
            state = {
                ...(state || {}),
                breadcrumbs: [
                    ...breadcrumbsDefault,
                    {
                        title: `Категории ${nextProps.category.rootTranslateName === 'bani' ? 'бань' : 'домов'}`,
                        link: nextProps.category.rootTranslateName === 'bani' ? '/bani' : '/doma'
                    },
                    { title: nextProps.category.name }
                ],
                categoryId: nextProps.category._id
            }
        }

        if (
            (!prevState.filteredProjects && nextProps.category && nextProps.projects) ||
            (prevState.currentPathName !== null && prevState.currentPathName !== nextProps.location.pathname) ||
            (prevState.currentSearch !== null && prevState.currentSearch !== nextProps.location.search)) {

            const filterIds = nextProps.location.pathname.split('/').slice(3);
            let nextFilters = nextProps.category.filters || [];

            const getFilters = () => {
                const filters = [];

                filterIds.forEach(filterId => {
                    let foundFilter = null;

                    nextFilters.some(filterGroup => {
                        const found = (filterGroup.filters || []).find((filter) => {
                            return filter.id === filterId;
                        });

                        if (found) {
                            foundFilter = found;
                        }

                        return found;
                    });


                    filters.push(foundFilter);
                    nextFilters = foundFilter.filters || [];
                });

                return filters;
            };

            try {
                const filters = getFilters();

                let url = `/bani/${nextProps.category.translateName}`;
                const breadcrumbs = [
                    ...breadcrumbsDefault,
                    {
                        title: `Категории ${nextProps.category.rootTranslateName === 'bani' ? 'бань' : 'домов'}`,
                        link: nextProps.category.rootTranslateName === 'bani' ? '/bani' : '/doma'
                    },
                    { title: nextProps.category.name, link: filterIds && filterIds.length ? url : null }
                ];

                filters.forEach((filter, i) => {
                    breadcrumbs.push({
                        title: filter.name,
                        link: i !== filters.length - 1 ? (url += `/${filter.id}`) : null
                    });
                });

                state = {
                    ...(state || {}),
                    filters,
                    nextFilters,
                    filteredProjects: sortProjects(filterProjects(nextProps.projects, nextProps.category, filters)),
                    currentPathName: nextProps.location.pathname,
                    currentSearch: nextProps.location.search,
                    breadcrumbs
                }
            } catch(err) {
                return {
                    notFound: true
                }
            }
        }

        return state;
    }

    static initialAction({ dispatch, match }) {
        const { name } = match.params;
        return [dispatch(getCategory(name)), dispatch(getProjects(name)), dispatch(getPhotos(name))];
    }

    state = {
        categoryId: null,
        breadcrumbs: breadcrumbsDefault,
        filterIds: null,
        currentPathName: null,
        currentSearch: null,
        notFound: false
    };

    componentDidMount() {
        const { match, actions, category, projects, photos } = this.props;
        const { name } = match.params;

        if (!category) {
            actions.getCategory(name);
        }

        if (!projects) {
            actions.getProjects(name);
        }

        if (!photos) {
            actions.getPhotos(name);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { match, actions } = this.props;

        if (prevProps.match !== match) {
            const { name } = match.params;

            actions.getCategory(name);
            actions.getProjects(name);
            actions.getPhotos(name);
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { isCategoryError } = this.props;
        const { breadcrumbs, notFound, filteredProjects } = this.state;
        let meta;

        if (!notFound && !isCategoryError) {
            meta = {
                title: this.getTitle(),
                description: `🏠 Строим ${this.getH1().toLowerCase()} под ключ по всей России 💨 ${filteredProjects.length} ${wordByNumber(filteredProjects.length, 'проект', 'проекта', 'проектов')} бань с гарантией 3 года 📳 8(800)201-07-29`
            };
        }

        return (
            <Page breadcrumbs={breadcrumbs} notFound={notFound || isCategoryError}>
                <Meta meta={meta} />
                { this.renderContent() }
            </Page>
        );
    }

    renderContent = () => {
        const { category, match } = this.props;
        const { filteredProjects } = this.state;
        const { name } = match.params;

        return category && filteredProjects ? (
            <>
                <H1Block
                    caption={this.getH1()}
                    description={(<>{filteredProjects.length} {wordByNumber(filteredProjects.length, 'проект', 'проекта', 'проектов')} бань на любой вкус.<br/>Без затяжного строительства и каждому по карману</>)}
                />
                {this.renderFilters()}
                {this.renderProjects()}
                {this.renderPhotos()}
                {this.renderNotFoundProject()}
                {this.renderAdditionalProjects()}
                <FormBlock source={name} />
                {this.renderArticle()}
            </>
        ) : null;
    };

    renderFilters = () => {
        const { location } = this.props;
        const { nextFilters } = this.state;

        return nextFilters && nextFilters.length ? (
            <Filters
                filters={nextFilters}
                pathname={location.pathname}
            />
        ) : null
    };

    renderProjects = () => {
        const { category } = this.props;
        const { filteredProjects } = this.state;

        if (!filteredProjects) {
            return null;
        }

        return <CardList items={[...filteredProjects.map(project => ({
            id: project._id,
            element: (
                <ProjectCard
                    project={project}
                    category={category}
                />
            )
        })), {
            id: 'custom',
            element: (
                <CustomProjectCard link='/individualnyy-proekt' />
            )
        }]} />;
    };

    renderAdditionalProjects = () => {
        const { category, projects } = this.props;
        const { filteredProjects } = this.state;

        if (filteredProjects && filteredProjects.length > 9) {
            return null;
        }

        function randomInteger(min, max) {
            // получить случайное число от (min-0.5) до (max+0.5)
            let rand = min - 0.5 + Math.random() * (max - min + 1);
            return Math.round(rand);
        }

        const randomStart = randomInteger(0, projects.length - 7);

        return (
            <DataSection
                captionTag='h2'
                caption='Вас может заинтересовать'>
                <CardList items={projects.slice(randomStart, randomStart + 6).map(project => ({
                    id: project._id,
                    element: (
                        <ProjectCard
                            project={project}
                            category={category}
                        />
                    )
                }))} />
            </DataSection>
        );
    };

    renderNotFoundProject = () => {
        return (
            <DataSection
                bgStyle='red'
                caption='Не нашли интересующий проект бани?'
                description='Построим баню с учетом ваших замечаний и предложений'>
                <div className={styles['button-container']}>
                    <Link caption='Обсудить проект бани' type='yellow' href='#requestForm'/>
                </div>
            </DataSection>
        )
    };

    renderArticle = () => {
        const { category } = this.props;
        const { filters } = this.state;

        const article = filters && filters.length ? filters[filters.length - 1].article : category.article;

        return article ? (
            <DataSection bgStyle='white'>
                <Article article={article} captionTag='h2' />
            </DataSection>
        ) : null;
    };

    renderPhotos = () => {
        const { photos, category } = this.props;
        const { filters } = this.state;

        if (photos && photos.length) {
            const filteredPhotos = photos.filter(photo => {
                const project = photo.projectId;
                // eslint-disable-next-line
                return filters.every(filter => eval(filter.condition));
            });

            return (
                <DataSection
                    bgStyle='grey'
                    caption='Фотоотчеты'
                    captionTag='h2'>
                    <CardList items={(filteredPhotos.length ? filteredPhotos : photos).slice(0, 6).map(photo => ({
                        id: photo._id,
                        element: (
                            <PhotoCard
                                photo={photo}
                                category={category}
                                layout={photo.projectId.layoutId} />
                        )
                    }))} />
                    <div className={styles['photos-button-container']}>
                        <Link href={`/photos/${category.translateName}`} caption='Смотреть все' />
                    </div>
                </DataSection>
            );
        }

        return null;
    };

    getTitle = () => {
        const { category } = this.props;
        const { filters } = this.state;

        return filters && filters.length ? filters[filters.length - 1]['seo-title'] : category['seo-title'];
    };

    getH1 = () => {
        const { category } = this.props;
        const { filters } = this.state;

        return filters && filters.length ? filters[filters.length - 1]['h1'] : category['h1'];
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
            getCategory,
            getProjects,
            getPhotos,
            resetData
        }, dispatch)
    };
}

/**
 * mapStateToProps
 * @param {*} state
 * @returns {Object}
 */
function mapStateToProps(state) {
    const { category, isCategoryFetch, isCategoryError, projects, photos } = state['client-category'];

    return { category, isCategoryFetch, isCategoryError, projects, photos };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
