import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Page from '../../components/Page';
import CardList from '../../components/CardList';
import ProjectCard from '../../components/ProjectCard';
import { Link } from '../../components/Button';
import Article from '../../components/Article';
import PhotoCard from '../../components/PhotoCard';
import DataSection from '../../components/DataSection';
import H1Block from '../../components/H1Block';
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
}, {
    title: 'Категории бань',
    link: '/bani'
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
                    { title: nextProps.category.name }
                ],
                categoryId: nextProps.category._id
            }
        }

        if (
            (!prevState.filteredProjects && nextProps.category && nextProps.projects) ||
            (prevState.currentPathName !== null && prevState.currentPathName !== nextProps.location.pathname) ||
            (prevState.currentSearch !== null && prevState.currentSearch !== nextProps.location.search)) {
            const filterId = nextProps.location.pathname.split('/').slice(3)[0];
            let filter;

            if (filterId) {
                filter = nextProps.category.filters && nextProps.category.filters.find(filter => filter.id === filterId);

                if (!filter) {
                    return {
                        notFound: true
                    }
                }
            }

            state = {
                ...(state || {}),
                filter,
                filteredProjects: sortProjects(filter ? filterProjects(filter, nextProps.projects) : nextProps.projects),
                currentPathName: nextProps.location.pathname,
                currentSearch: nextProps.location.search,
                breadcrumbs: [
                    ...breadcrumbsDefault,
                    { title: nextProps.category.name, link: filter ? `/bani/${nextProps.category.translateName}` : null },
                    ...(filter ? [{ title: filter.name }] : [])
                ]
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
        filter: null,
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
        const { isCategoryError, category } = this.props;
        const { breadcrumbs, notFound, filteredProjects } = this.state;
        let meta;

        if (!notFound && !isCategoryError) {
            const title = this.getTitle();
            meta = {
                title: `Купить недорогие ${title.toLowerCase()} под ключ | Проекты и цены`,
                description: `Строим недорогие ${title.toLowerCase()} под ключ по всей России. ${filteredProjects.length} ${wordByNumber(filteredProjects.length, 'проект', 'проекта', 'проектов')} бань с гарантией 3 года. Собственное производство. Срок строительства от 7 дней.`,
                keywords: `Купить ${category.name} под ключ, Купить ${category.name} недорого, Купить ${category.name} цены`
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
                    caption={`${this.getTitle()} | проекты и цены`}
                    description={(<>{filteredProjects.length} {wordByNumber(filteredProjects.length, 'проект', 'проекта', 'проектов')} бань на любой вкус.<br/>Без затяжного строительства и каждому по карману</>)}
                />
                {this.renderFilters()}
                {this.renderProjects()}
                {this.renderNotFoundProject()}
                {this.renderPhotos()}
                {this.renderArticle()}
                <FormBlock source={name} />
            </>
        ) : null;
    };

    renderFilters = () => {
        const { category, projects } = this.props;
        const { filter } = this.state;

        return (
            <Filters
                category={category}
                filter={filter}
                projects={projects}
            />
        )
    };

    renderProjects = () => {
        const { category } = this.props;
        const { filteredProjects } = this.state;

        if (!filteredProjects) {
            return null;
        }

        return <CardList items={filteredProjects.map(project => ({
            id: project._id,
            element: (
                <ProjectCard
                    project={project}
                    category={category}
                />
            )
        }))} />;
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

        return category.article ? (
            <DataSection bgStyle='white'>
                <Article article={category.article} captionTag='h2' />
            </DataSection>
        ) : null;
    };

    renderPhotos = () => {
        const { photos, category } = this.props;
        const preparedPhotos = photos ? photos.slice(0, 6) : [];

        return photos && photos.length ? (
            <DataSection bgStyle='grey' caption={`Фотоотчеты построенных ${category.name3}`} captionTag='h2'>
                <CardList items={preparedPhotos.map(photo => ({
                    id: photo._id,
                    element: <PhotoCard photo={photo} />
                }))} />
                <div className={styles['photos-button-container']}>
                    <Link href={`/photos/${category.translateName}`} caption='Смотреть все' />
                </div>
            </DataSection>
        ) : null;
    };

    getTitle = () => {
        const { category } = this.props;
        const { filter } = this.state;

        let title = category.name;

        if (filter) {
            title += ` ${filter.name.toLowerCase()}`;
        }

        return title;
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
