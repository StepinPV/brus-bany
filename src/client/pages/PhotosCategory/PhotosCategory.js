import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getPhotos, getCategory, resetData } from './actions';
import Page from '../../components/Page';
import Card from '../../components/Card';
import H1Block from '../../components/H1Block';
import styles from './PhotosCategory.module.css';
import FormBlock from "../../components/FormBlock";
import CardList from '../../components/CardList';
import PhotoCard from '../../components/PhotoCard';

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
                    caption={(
                        <>Фотографии построенных {category.name3}</>
                    )}
                    description='На данной странице вы можете посмотреть фотографии бань, которые мы построили' />
                <>
                    {this.renderPhotos()}
                </>
            </div>
        ) : null;
    };

    renderPhotos = () => {
        const { photos } = this.props;

        return photos ? <CardList items={photos.map(photo => ({
            id: photo._id,
            element: <PhotoCard photo={photo} />
        }))} /> : null;
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
