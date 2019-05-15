import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Link from '../../../components/Link';
import { getCategory, getProjects, resetData } from './actions';
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
        match: PropTypes.object
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

        return null;
    }

    state = {
        categoryId: null,
        breadcrumbs: breadcrumbsDefault
    };

    componentDidUpdate(prevProps, prevState) {
        const { match, actions } = this.props;

        if (prevProps.match !== match) {
            const { id } = match.params;

            actions.getCategory(id);
            actions.getProjects(id);
        }
    }

    componentDidMount() {
        const { match, actions } = this.props;
        const { id } = match.params;

        actions.getCategory(id);
        actions.getProjects(id);
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { isCategoryError } = this.props;
        const { breadcrumbs } = this.state;

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

        return category ? (
            <div className={styles.container}>
                {this.renderTitle()}
                {this.renderProjects()}
            </div>
        ) : null;
    };

    renderTitle = () => {
        const { category } = this.props;

        return (
            <div className={styles['title-block']}>
                <div className={styles['title-title']}>{`${category.name} | проекты и цены`}</div>
                <div className={styles['title-description']}>
                    Более 65 проектов бань на любой вкус.<br/>
                    Без затяжного строительства и каждому по карману
                </div>
            </div>
        );
    };

    renderProjects = () => {
        const { projects, match } = this.props;
        const { id } = match.params;

        if (!projects) {
            return null;
        }

        return (
            <div className={styles.projects}>
                {projects.map(({ layoutId, images, layout, price }) => {
                    return (
                        <Link to={`/bani/${id}/${layoutId}_${layout.width}x${layout.length}`} key={layoutId} className={styles.project}>
                            {/* TODO img alt! */}
                            <img src={images ? images['main'] : null} alt="" className={styles['project-image']}/>
                            <div className={styles['project-info']}>
                                <div className={styles['project-info-name']}>{`Баня ${layout.name}`}</div>
                                <div className={styles['project-info-size']}>{`${layout.width}x${layout.length}`}</div>
                                <div className={styles['project-info-area']}>{`Площадь: ${layout.area}м`}<sup>2</sup></div>
                                <div className={styles['project-info-price']}>{`${price ? price.toLocaleString() : null} руб`}</div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        )
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
    const { category, isCategoryFetch, isCategoryError, projects } = state['client-category'];

    return { category, isCategoryFetch, isCategoryError, projects };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
