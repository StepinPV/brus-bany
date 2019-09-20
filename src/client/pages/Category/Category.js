import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Page from '../../components/Page';
import CardList from '../../components/CardList';
import ProjectCard from '../../components/ProjectCard';
import NotFound from '../NotFound/NotFound';
import Button from '../../components/Button';
import Article from '../../components/Article';
import PhotoCard from '../../components/PhotoCard';
import DataSection from '../../components/DataSection';
import H1Block from '../../components/H1Block';
import { getCategory, getProjects, resetData, getPhotos } from './actions';
import filterProjects from './resources/filter';
import Filters from './resources/Filters';
import styles from './Category.module.css';
import FormBlock from "../../components/FormBlock";
import withForm from "../../plugins/Form/withForm";

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
        history: PropTypes.object,
        showForm: PropTypes.func
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
            const filtersIds = nextProps.location.pathname.split('/').slice(3);

            let additionsFilters;
            let sizeFilter;

            if (/^[\d|\\.]+x[\d|\\.]+$/.test(filtersIds[0])) {
                [sizeFilter, ...additionsFilters] = filtersIds;
            } else {
                additionsFilters = filtersIds;
            }

            for (let i = 0; i < additionsFilters.length; i++) {
                const filter = nextProps.category.filters && nextProps.category.filters.find(filter => filter.id === additionsFilters[i]);

                if (!filter) {
                    return {
                        notFound: true
                    }
                }
            }

            const filters = {
                additions: additionsFilters,
                size: sizeFilter
            };

            state = {
                ...(state || {}),
                filters,
                filteredProjects: filterProjects(filters, nextProps.projects, nextProps.category),
                currentPathName: nextProps.location.pathname,
                currentSearch: nextProps.location.search
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
        filters: null,
        currentPathName: null,
        currentSearch: null,
        notFound: false,
        priceFilter: {
            min: 0,
            max: 1000000
        }
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
        const { isCategoryError } = this.props
        const { breadcrumbs, notFound } = this.state;

        if (notFound) {
            return <NotFound />;
        }

        return (
            <Page breadcrumbs={breadcrumbs}>
                { isCategoryError ? <div className={styles.error}>{isCategoryError}</div> : this.renderContent() }
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
                    description={(<>Более 65 проектов бань на любой вкус.<br/>Без затяжного строительства и каждому по карману</>)}
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
        const { filteredProjects, filters, priceFilter } = this.state;

        return (
            <Filters
                category={category}
                filteredProjects={filteredProjects}
                filters={filters}
                projects={projects}
                priceFilter={priceFilter}
                onChangePriceFilter={this.handleChangePriceFilter}
            />
        )
    };

    renderProjects = () => {
        const { match } = this.props;
        const { filteredProjects, priceFilter } = this.state;
        const { name } = match.params;

        if (!filteredProjects) {
            return null;
        }

        const itemsForRender = [];

        filteredProjects.forEach(project => {
            if ((!priceFilter.min || priceFilter.min < project.price) && (!priceFilter.max || priceFilter.max > project.price)) {
                itemsForRender.push({
                    id: project._id,
                    element: (
                        <ProjectCard
                            project={project}
                            categoryName={name}
                        />
                    )
                })
            }
        });

        return <CardList items={itemsForRender} />;
    };

    renderNotFoundProject = () => {
        const { showForm, match } = this.props;
        const { name } = match.params;

        return (
            <DataSection
                bgStyle='red'
                caption='Не нашли интересующий проект бани?'
                description='Построим баню с учетом ваших замечаний и предложений'>
                <div className={styles['button-container']}>
                    <Button caption='Обсудить проект бани' type='yellow' onClick={() => { showForm({ source: `${name}. Обсудить проект бани.` }) }}/>
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
            <DataSection bgStyle='grey' caption={`Фотографии построенных ${category.name3}`} captionTag='h2'>
                <CardList items={preparedPhotos.map(photo => ({
                    id: photo._id,
                    element: <PhotoCard photo={photo} />
                }))} />
                <div className={styles['photos-button-container']}>
                    <a href={`/photos/${category.translateName}`}>
                        <Button caption='Смотреть все' />
                    </a>
                </div>
            </DataSection>
        ) : null;
    };

    handleChangePriceFilter = (priceFilter) => {
        this.setState({ priceFilter });
    };

    getTitle = () => {
        const { category } = this.props;
        const { filters } = this.state;

        let title = category.name;

        if (filters.size) {
            title += ` ${filters.size}`;
        }

        const filterNames = [];

        if (category.filters) {
            category.filters.forEach(filter => {
                if (Boolean(filters.additions.includes(filter.id))) {
                    filterNames.push(filter.name);
                }
            });
        }

        filterNames.forEach((name, index) => {
            if (index === filterNames.length - 1 && filterNames.length > 1) {
                title += ` и ${name}`;
            } else {
                title += ` c ${name}`;
            }
        });

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

export default connect(mapStateToProps, mapDispatchToProps)(withForm(Category));
