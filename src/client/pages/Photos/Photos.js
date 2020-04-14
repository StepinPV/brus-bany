import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getCategories, getPhotos, resetData } from './actions';
import Page from '../../components/Page';
import H1Block from '../../components/H1Block';
import styles from './Photos.module.css';
import FormBlock from "../../components/FormBlock";
import CardList from '../../components/CardList';
import PhotoCard from '../../components/PhotoCard';
import Meta from '../../components/Meta';
import cx from "classnames";

const breadcrumbsDefault = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Фотоотчеты построенных бань',
    link: '/photos'
}];

class Photos extends PureComponent {
    static propTypes = {
        photos: PropTypes.array,
        categories: PropTypes.array,
        photosError: PropTypes.bool,

        actions: PropTypes.object,
        match: PropTypes.object
    };


    static initialAction({ dispatch, match }) {
        const { name } = match.params;
        return [dispatch(getCategories()), dispatch(getPhotos(name))]
    }

    static getDerivedStateFromProps(nextProps) {
        const { name } = nextProps.match.params;

        if (nextProps.categories && name) {

            const category = nextProps.categories.find(category => category.translateName === name);

            return {
                breadcrumbs: [
                    ...breadcrumbsDefault,
                    ...(category ? [{ title: category.name }] : [])
                ]
            }
        }

        return null;
    }

    state = {
        breadcrumbs: breadcrumbsDefault
    };

    componentDidMount() {
        const { actions, photos, categories, match } = this.props;
        const { name } = match.params;

        if (!photos) {
            actions.getPhotos(name);
        }

        if (!categories) {
            actions.getCategories();
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { breadcrumbs } = this.state;
        const { photosError } = this.props;
        const notFound = Boolean(photosError);
        let meta;

        if (!notFound) {
            const title = this.getTitle();
            meta = {
                title: `Фотографии, отзывы, видео и описание построенных ${title} | Брус бани`,
                description: `За все время работы мы построили огромное количество ${title} различной сложности. На сайте вы можете просмотреть фотоотчеты данных проектов.`
            };
        }

        return (
            <Page breadcrumbs={breadcrumbs} notFound={notFound}>
                <Meta meta={meta} />
                { this.renderContent() }
                <FormBlock source='Страница готовых проектов' />
            </Page>
        );
    }

    renderContent = () => {
        const { categories, photos } = this.props;
        const title = this.getTitle();

        return categories && photos ? (
            <>
                <H1Block
                    caption={`Фотоотчеты построенных ${title}`}
                    description={`За все время работы мы построили огромное количество ${title}. В данном разделе вы можете просмотреть фотографии, видеообзоры, отзывы и описание данных проектов.`} />
                {this.renderCategories()}
                {this.renderPhotos()}
            </>
        ) : null;
    };

    renderCategories = () => {
        const { categories, match } = this.props;
        const { name: categoryName } = match.params;

        return categories.length ? (
            <div className={styles.filters}>
                {
                    categories.map(({ _id, translateName, name }) => {
                        const options = {
                            key: _id,
                            className: cx(styles['filters-item'], {[styles['filters-item-enabled']]: categoryName === translateName})
                        };

                        return categoryName === translateName ? (
                            <div {...options}>{name}</div>
                        ) : (
                            <a
                                {...options}
                                href={`/photos/${translateName}`}>
                                {name}
                            </a>
                        );
                    })
                }
            </div>
        ) : null;
    };

    renderPhotos = () => {
        const { photos } = this.props;

        return <CardList items={photos.sort((a, b) => {
            const aDate = new Date(a.created);
            const bDate = new Date(b.created);

            if (aDate > bDate) return -1;
            if (aDate === bDate) return 0;
            if (aDate < bDate) return 1;
        }).map(photo => ({
            id: photo._id,
            element: (
                <PhotoCard
                    photo={photo}
                    category={photo.projectId.categoryId}
                    layout={photo.projectId.layoutId} />
            )
        }))} />;
    };

    getTitle = () => {
        const { categories, match } = this.props;
        const { name } = match.params;
        const category = categories && name ? categories.find(category => category.translateName === name) : null;

        return category ? category.name3 : 'бань';
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
            getCategories,
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
    const { photos, photosError, categories } = state['client-photos'];

    return { photos, photosError, categories };
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
