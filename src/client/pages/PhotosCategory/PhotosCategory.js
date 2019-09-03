import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getPhotos, getCategory, resetData } from './actions';
import Page from '../../components/Page';
import Card from '../../components/Card';
import Link from '../../../components/Link';
import H1Block from '../../components/H1Block';
import styles from './PhotosCategory.module.css';
import FormBlock from "../../components/FormBlock";

const breadcrumbsDefault = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Фотографии построенных бань',
    link: '/photos'
}];

class PhotosCategory extends PureComponent {
    static propTypes = {
        photos: PropTypes.array,
        category: PropTypes.object,

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
    }

    state = {
        categoryId: null,
        breadcrumbs: breadcrumbsDefault
    };

    componentDidMount() {
        const { actions, match } = this.props;
        const { categoryName } = match.params;

        actions.getPhotos(categoryName);
        actions.getCategory(categoryName);
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { isPhotosError } = this.props;
        const { breadcrumbs } = this.state;

        return (
            <Page breadcrumbs={breadcrumbs}>
                { isPhotosError ? <div>{isPhotosError}</div> : this.renderContent() }
                <FormBlock source='Страница готовых проектов' />
            </Page>
        );
    }

    renderContent = () => {
        const { category } = this.props;

        return category ? (
            <div className={styles.container}>
                <H1Block
                    caption={`${category.name} - фотографии построенных бань`}
                    description='На данной странице вы можете посмотреть фотографии бань, которые мы построили' />
                <Fragment>
                    {this.renderPhotos()}
                </Fragment>
            </div>
        ) : null;
    };

    renderPhotos = () => {
        const { photos, match } = this.props;
        const { categoryName } = match.params;

        return photos ? (
            <div className={styles.items}>
                {photos.map(({ mainPhoto, created, projectId, _id }) => {
                    return (
                        <Link to={`/photos/${categoryName}/${projectId.layoutId.translateName}_${projectId.layoutId.width}x${projectId.layoutId.length}_${_id}`} className={styles.item}>
                            <Card
                                firstImage={mainPhoto}
                                firstButton='Смотреть'
                                bgStyle='grey'
                                content={(
                                    <div className={styles['item-content']}>
                                        <div className={styles['item-caption']}>{`${projectId.layoutId.name} ${projectId.layoutId.width}x${projectId.layoutId.length}`}</div>
                                        <div className={styles['item-date']}>{`Дата строительства: ${new Date(created).toLocaleDateString()}`}</div>
                                    </div>
                                )}
                            />
                        </Link>
                    );
                })}
            </div>
        ) : null;
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
            getPhotos,
            getCategory,
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
    const { photos, category } = state['client-photos-category'];

    return { photos, category };
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotosCategory);
