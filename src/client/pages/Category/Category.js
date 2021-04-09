import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Page from '../../components/Page';
import CardList from '../../../components/CardList';
import ProjectCard from '../../../components/ProjectCard';
import { Link } from '../../../components/Button';
import Article from '../../components/Article';
import CustomProjectCard from '../../../components/CustomProjectCard';
import DataSection from '../../components/DataSection';
import H1Block from '../../../components/H1Block';
import { getCategory, getProjects, resetData } from './actions';
import filterProjects from './resources/filter';
import sortProjects from './resources/sort';
import Filters from './resources/Filters';
import styles from './Category.module.css';
import FormBlock from "../../components/FormBlock";
import Meta from '../../components/Meta';
import wordByNumber from '../../../utils/wordByNumber';
import components from '@constructor-components';

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
            const breadcrumbs = [...breadcrumbsDefault];

            if (nextProps.category.rootTranslateName === 'bani') {
                breadcrumbs.push({
                    title: `Категории бань`,
                    link: '/bani'
                });
            }

            breadcrumbs.push({ title: nextProps.category.name });

            state = {
                ...(state || {}),
                breadcrumbs,
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
                const breadcrumbs = [...breadcrumbsDefault];

                if (nextProps.category.rootTranslateName === 'bani') {
                    breadcrumbs.push({
                        title: `Категории бань`,
                        link: '/bani'
                    });
                }

                breadcrumbs.push({ title: nextProps.category.name, link: filterIds && filterIds.length ? url : null });

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
        let { name } = match.params;

        if (name === 'doma-iz-brusa') {
            name = null;
        }

        if (!name) {
            name = match.url.split('/')[1];
        }

        return [dispatch(getCategory(name)), dispatch(getProjects(name))];
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
        const { match, actions, category, projects } = this.props;
        const { name } = match.params;

        if (!category) {
            actions.getCategory(name);
        }

        if (!projects) {
            actions.getProjects(name);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { match, actions } = this.props;

        if (prevProps.match !== match) {
            const { name } = match.params;

            actions.getCategory(name);
            actions.getProjects(name);
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { isCategoryError, customComponents, staticContext } = this.props;
        const { breadcrumbs, notFound, filteredProjects } = this.state;
        let meta;

        if (!notFound && !isCategoryError) {
            meta = {
                title: this.getTitle(),
                description: `🏠 Строим ${this.getH1().toLowerCase()} под ключ по всей России 💨 ${filteredProjects.length} ${wordByNumber(filteredProjects.length, 'проект', 'проекта', 'проектов')} бань с гарантией 3 года 📳 8(800)201-07-29`
            };
        }

        return (
            <Page breadcrumbs={breadcrumbs} notFound={notFound || isCategoryError} customComponents={customComponents} staticContext={staticContext}>
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
                    description={(<>{filteredProjects.length} {wordByNumber(filteredProjects.length, 'проект', 'проекта', 'проектов')} на любой вкус.<br/>Без затяжного строительства и каждому по карману</>)}
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
                <CustomProjectCard
                    link='/individualnyy-proekt'
                    text={`Построим ${category.name4} любой сложности отталкиваясь от ваших предпочтений и пожеланий`} />
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
        const { category } = this.props;
        return (
            <DataSection
                bgStyle='red'
                caption='Не нашли интересующий проект?'
                description={`Построим ${category.name4.toLowerCase()} с учетом ваших замечаний и предложений`}>
                <div className={styles['button-container']}>
                    <Link caption='Обсудить индивидуальный проект' type='yellow' href='#requestForm'/>
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
        const { category, pages, pageFolders, staticContext } = this.props;

        const folderId = {
            'iz-brusa': '6055e36770dc493b150730c5',
            'doma-iz-brusa': null, // 60570c7171bbac64991e294a',
            'karkasnie': '6055e37470dc493b150730c6',
            'gotovie': '60570c6771bbac64991e2949'
        }[category.translateName];

        return folderId ? (
            <DataSection
                captionTag='h2'
                bgStyle='white'
                caption='Фотоотчеты'>
                <components.Pages
                    __pages__={pages}
                    __pageFolders__={pageFolders}
                    maxCount={6}
                    folder={folderId}
                    paddingBottom='none'
                    paddingTop='none'
                    sort='page1[6162] > page2[6162] ? -1 : (page1[6162] === page2[6162] ? 0 : 1)'
                    staticContext={staticContext}
                />
                <div className={styles['button-container']}>
                    <Link href={`/photos/${category.translateName}`} caption='Смотреть все' />
                </div>
            </DataSection>
        ) : null;
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
    const { category, isCategoryFetch, isCategoryError, projects } = state['client-category'];

    return { category, isCategoryFetch, isCategoryError, projects };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
