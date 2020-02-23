import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { loadData, resetData } from './actions';
import Page from '../../components/Page';
import Caption from '../../components/Caption';
import { Link } from '../../components/Button';
import H1Block from '../../components/H1Block';
import styles from './Photos.module.css';
import FormBlock from "../../components/FormBlock";
import CardList from '../../components/CardList';
import PhotoCard from '../../components/PhotoCard';
import Meta from '../../components/Meta';

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Фотоотчеты построенных бань'
}];

const META = {
    title: 'Фотоотчеты построенных бань',
    description: 'Фотографии, отзывы, видео и описание построенных бань'
};

class Photos extends PureComponent {
    static propTypes = {
        photos: PropTypes.object,
        categories: PropTypes.array,

        actions: PropTypes.object,
        match: PropTypes.object,
        location: PropTypes.object,
        history: PropTypes.object
    };

    static initialAction({ dispatch }) {
        return [dispatch(loadData())]
    }

    componentDidMount() {
        const { actions, photos } = this.props;

        if (!photos) {
            actions.loadData();
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { isPhotosError } = this.props;

        return (
            <Page breadcrumbs={breadcrumbs}>
                <Meta meta={META} />
                { isPhotosError ? <div>{isPhotosError}</div> : this.renderContent() }
                <FormBlock source='Страница готовых проектов' />
            </Page>
        );
    }

    renderContent = () => {
        const { categories } = this.props;

        return categories ? (
            <>
                <H1Block
                    caption='Фотоотчеты построенных бань'
                    description='На данной странице вы можете посмотреть фотоотчеты бань, которые мы построили' />
                <>
                    {this.renderCategories()}
                </>
            </>
        ) : null;
    };

    renderCategories = () => {
        const { categories, photos } = this.props;

        return categories.map(category => {
            return photos[category._id] && photos[category._id].photos && photos[category._id].photos.length ? (
                <div className={styles.category}>
                    <div className={styles.container}>
                        <Caption tag='h2'>{category.name}</Caption>
                    </div>
                    {this.renderPhotos(category, photos[category._id].photos)}
                    <div className={styles.container}>
                        <Link href={`/photos/${category.translateName}`} caption='Смотреть все' />
                    </div>
                </div>
            ) : null;
        });
    };

    renderPhotos = (category, photos) => {
        const preparedPhotos = photos.slice(0, 6);
        return <CardList items={preparedPhotos.map(photo => ({
            id: photo._id,
            element: <PhotoCard photo={photo} />
        }))} />;
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
            loadData,
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
    const { photos, categories } = state['client-photos'];

    return { photos, categories };
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
