import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Card from '../../components/Card';
import Link from '../../../components/Link';
import NotFound from '../NotFound/NotFound';
import { getCategory, getProjects, resetData } from './actions';
import filterProjects from './resources/filter';
import Filters from './resources/Filters';
import styles from './Category.module.css';

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
        if (nextProps.category && prevState.categoryId !== nextProps.category._id) {
            return {
                breadcrumbs: [
                    ...breadcrumbsDefault,
                    { title: nextProps.category.name }
                ],
                categoryId: nextProps.category._id
            }
        }

        if ((!prevState.projects && nextProps.category && nextProps.projects) ||
            (prevState.currentPathName !== null && prevState.currentPathName !== nextProps.location.pathname)) {
            const filtersIds = nextProps.location.pathname.split('/').slice(3);

            let additionsFilters;
            let sizeFilter;

            if (/^[\d]+x[\d]+$/.test(filtersIds[0])) {
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

            return {
                filters,
                filteredProjects: filterProjects(filters, nextProps.projects, nextProps.category),
                currentPathName: nextProps.location.pathname
            }
        }

        return null;
    }

    state = {
        categoryId: null,
        breadcrumbs: breadcrumbsDefault,
        filters: null,
        currentPathName: null,
        notFound: false
    };

    componentDidMount() {
        const { match, actions } = this.props;
        const { id } = match.params;

        actions.getCategory(id);
        actions.getProjects(id);
    }

    componentDidUpdate(prevProps, prevState) {
        const { match, actions } = this.props;

        if (prevProps.match !== match) {
            const { id } = match.params;

            actions.getCategory(id);
            actions.getProjects(id);
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { isCategoryError } = this.props;
        const { breadcrumbs, notFound } = this.state;

        if (notFound) {
            return <NotFound />;
        }

        return (
            <Fragment>
                <Header />
                <Breadcrumbs items={breadcrumbs} />
                { isCategoryError ? <div className={styles.error}>{isCategoryError}</div> : this.renderContent() }
            </Fragment>
        );
    }

    renderContent = () => {
        const { category } = this.props;
        const { filteredProjects } = this.state;

        return category && filteredProjects ? (
            <Fragment>
                {this.renderTitle()}
                {this.renderFilters()}
                {this.renderProjects()}
            </Fragment>
        ) : null;
    };

    renderTitle = () => {
        return (
            <div className={styles['title-block']}>
                <div className={styles['title-title']}>{`${this.getTitle()} | проекты и цены`}</div>
                <div className={styles['title-description']}>
                    Более 65 проектов бань на любой вкус.<br/>
                    Без затяжного строительства и каждому по карману
                </div>
            </div>
        );
    };

    renderFilters = () => {
        const { category, projects } = this.props;
        const { filteredProjects, filters } = this.state;

        return (
            <Filters
                category={category}
                filteredProjects={filteredProjects}
                filters={filters}
                projects={projects}
            />
        )
    };

    renderProjects = () => {
        const { match } = this.props;
        const { filteredProjects } = this.state;
        const { id } = match.params;

        if (!filteredProjects) {
            return null;
        }

        return (
            <div className={styles.projects}>
                {filteredProjects.map(({ layoutId, images, layout, price }) => {
                    return (
                        <Link to={`/bani/${id}/${layoutId}_${layout.width}x${layout.length}`} key={layoutId} className={styles.project}>
                            <Card
                                firstImage={images ? images['main'] : null}
                                firstButton='Подробнее'
                                secondButton={`${price ? price.toLocaleString() : null} руб`}
                                bgStyle='grey'
                                content={(
                                    <div className={styles['project-info']}>
                                        <div className={styles['project-info-name']}>{`Баня ${layout.name}`}</div>
                                        <div className={styles['project-info-size']}>{`${layout.width}x${layout.length}`}</div>
                                        <div className={styles['project-info-area']}>{`Площадь: ${layout.area}м`}<sup>2</sup></div>
                                    </div>
                                )}
                            />
                        </Link>
                    );
                })}
            </div>
        )
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
