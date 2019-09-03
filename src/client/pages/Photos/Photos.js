import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { loadData, resetData } from './actions';
import Page from '../../components/Page';
import Caption from '../../components/Caption';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Link from '../../../components/Link';
import H1Block from '../../components/H1Block';
import styles from './Photos.module.css';
import FormBlock from "../../components/FormBlock";
import CardList from '../../components/CardList';
import PhotoCard from '../../components/PhotoCard';

const breadcrumbs = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Фотографии построенных бань'
}];

class Photos extends PureComponent {
    static propTypes = {
        photos: PropTypes.object,
        categories: PropTypes.array,

        actions: PropTypes.object,
        match: PropTypes.object,
        location: PropTypes.object,
        history: PropTypes.object
    };

    componentDidMount() {
        const { actions } = this.props;

        actions.loadData();
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { isPhotosError } = this.props;

        return (
            <Page breadcrumbs={breadcrumbs}>
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
                    caption='Фотографии построенных бань'
                    description='На данной странице вы можете посмотреть фотографии бань, которые мы построили' />
                <Fragment>
                    {this.renderCategories()}
                </Fragment>
            </>
        ) : null;
    };

    renderCategories = () => {
        const { categories, photos } = this.props;

        return categories.map(category => {
            return photos[category._id] && photos[category._id].photos && photos[category._id].photos.length ? (
                <div className={styles.category}>
                    <div className={styles.container}>
                        <Caption>{category.name}</Caption>
                    </div>
                    {this.renderPhotos(category, photos[category._id].photos)}
                    <div className={styles.container}>
                        <Link to={`/photos/${category.translateName}`}>
                            <Button caption='Смотреть все' />
                        </Link>
                    </div>
                </div>
            ) : null;
        });
    };

    renderPhotos = (category, photos) => {
        const preparedPhotos = photos.slice(0, 6);
        return <CardList items={preparedPhotos.map(photo => <PhotoCard photo={photo} />)} />;
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
