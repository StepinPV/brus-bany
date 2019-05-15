import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { getCategory, getProject, resetData } from './actions';
import cx from 'classnames';
import styles from './Project.module.css';

const breadcrumbsDefault = [{
    title: 'Главная',
    link: '/'
}];

class Project extends PureComponent {
    static propTypes = {
        category: PropTypes.object,
        isCategoryError: PropTypes.string,
        isCategoryFetch: PropTypes.bool,

        project: PropTypes.object,

        actions: PropTypes.object,
        match: PropTypes.object
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.category && nextProps.project && prevState.projectId !== nextProps.project._id) {
            return {
                breadcrumbs: [
                    ...breadcrumbsDefault,
                    { title: nextProps.category.name, link: `/bani/${nextProps.category._id}`},
                    { title: nextProps.project.layout.name }
                ],
                projectId: nextProps.project.layout.name
            }
        }

        return null;
    }

    state = {
        projectId: null,
        breadcrumbs: breadcrumbsDefault,
        expandedAdditions: []
    };

    componentDidUpdate(prevProps, prevState) {
        const { match, actions } = this.props;

        if (prevProps.match !== match) {
            const { categoryId, layoutId } = match.params;

            actions.getCategory(categoryId);
            actions.getProject(categoryId, layoutId);
        }
    }

    componentDidMount() {
        const { match, actions } = this.props;
        const { categoryId, layoutId } = match.params;

        actions.getCategory(categoryId);
        actions.getProject(categoryId, layoutId);
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
        const { project, category } = this.props;

        return project && category ? (
            <div className={styles.container}>
                <div className={styles['top-block']}>
                    {this.renderGallery()}
                    {this.renderInfo()}
                </div>
                {this.renderAdditions()}
            </div>
        ) : null;
    };

    renderGallery = () => {
        const { project } = this.props;

        return (
            <div className={styles['gallery']}>
                <img className={styles['gallery-image']} src={project.images ? project.images['main'] : null} alt=""/>
            </div>
        )
    };

    renderInfo = () => {
        const { project } = this.props;

        return (
            <div className={styles['info']}>
                <div className={styles['info-title']}>
                    {`${this.renderInfoTitle()} - `}
                    <span className={styles['info-title-layout']}>{project.layout.name}</span>
                </div>
                <div className={styles['info-addition']}>
                    <div>Общая площадь - {project.layout.area}м<sup>2</sup></div>
                </div>
                {project.price ? (
                    <div className={styles['info-price']}>{`${project.price.toLocaleString()} руб.`}</div>
                ) : null}
            </div>
        )
    };

    renderInfoTitle = () => {
        const { category, project: { layout } } = this.props;

        let title = category.name;

        title += ` ${layout.width}x${layout.length}`;

        const { terrace, attic, porch } = layout;

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

    renderAdditions = () => {
        const { category, project } = this.props;
        const { expandedAdditions } = this.state;

        // eslint-disable-next-line
        const params = project.layout;
        const getPrice = price => {
            // eslint-disable-next-line
            return eval(price);
        };

        return (
            <div className={styles['additions']}>
                <div className={styles['additions-header']}>Выберите дополнения</div>
                <div className={styles['additions-items']}>
                    {category.additions.map(({ name, id, value }) => (
                        <Fragment key={id}>
                            <div
                                className={cx(styles['additions-item'], styles['additions-title'], styles['additions-item-header'])}
                                onClick={() => { this.expandAdditionBlock(id)}}>
                                {name}
                            </div>
                            {
                                expandedAdditions.includes(id) ? (
                                    <Fragment>
                                        {
                                            value ? value.map(({ type, name, id, price }) => (
                                                <div className={styles['additions-item']} key={id}>
                                                    <div className={styles['additions-item-wrapper']}>
                                                        {type === 'boolean' ? (
                                                            <input type='checkbox' />
                                                        ) : (
                                                            <input className={styles['additions-item-input']} type='number' min='0'/>
                                                        )}

                                                    </div>
                                                    <div className={styles['additions-title']}>{name}</div>
                                                    <div className={styles['additions-price']}>{`${getPrice(price)} р.`}</div>
                                                </div>
                                            )) : null
                                        }
                                    </Fragment>
                                ) : null
                            }
                        </Fragment>
                    ))}
                </div>
            </div>
        );
    };

    expandAdditionBlock = (id) => {
        const { expandedAdditions } = this.state;

        this.setState({
            expandedAdditions: expandedAdditions.includes(id) ? expandedAdditions.filter(_id => _id !== id) : [...expandedAdditions, id]
        })
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
            getProject,
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
    const { category, isCategoryFetch, isCategoryError, project } = state['client-project'];

    return { category, isCategoryFetch, isCategoryError, project };
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
