import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../../components/Header';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Additions from './resources/Additions';
import DeliveryMap from '../../components/DeliveryMap';
import Bakes from './resources/Bakes';
import Foundation from './resources/Foundation';
import BaseEquipment from './resources/BaseEquipment';
import Gallery from './resources/Gallery';
import { getCategory, getProject, resetData } from './actions';
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
        breadcrumbs: breadcrumbsDefault
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
                <BaseEquipment />
                <Foundation />
                <Bakes />
                <Additions additions={category.additions} layout={project.layout} />
                <DeliveryMap />
            </div>
        ) : null;
    };

    renderGallery = () => {
        const { project } = this.props;

        return (
            <div className={styles.gallery}>
                <Gallery images={[project.images.main, project.images['1']]} />
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
