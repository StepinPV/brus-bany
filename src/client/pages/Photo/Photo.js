import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getPhoto, resetData } from './actions';
import Page from '../../components/Page';
import H1Block from '../../components/H1Block';
import styles from './Photo.module.css';
import FormBlock from "../../components/FormBlock";

const breadcrumbsDefault = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Фотографии построенных бань',
    link: '/photos'
}];

class Photo extends PureComponent {
    static propTypes = {
        photo: PropTypes.object,

        actions: PropTypes.object,
        match: PropTypes.object,
        location: PropTypes.object,
        history: PropTypes.object
    };

     static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.photo && prevState.photoId !== nextProps.photo._id) {
            return {
                breadcrumbs: [
                    ...breadcrumbsDefault,
                    { title: nextProps.photo.projectId.categoryId.name, link: `/photos/${nextProps.photo.projectId.categoryId.translateName}` },
                    { title: nextProps.photo.projectId.layoutId.name }
                ],
                photoId: nextProps.photo._id
            }
        }
    }

    state = {
        categoryId: null,
        breadcrumbs: breadcrumbsDefault
    };

    componentDidMount() {
        const { actions, match } = this.props;
        const { photoId } = match.params;

        actions.getPhoto(photoId);
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
                <FormBlock source='Страница фотоотчета' />
            </Page>
        );
    }

    renderContent = () => {
        const { photo } = this.props;

        return photo ? (
            <div className={styles.container}>
                <H1Block
                    caption={(
                        <>
                            Фотографии проекта<br/>
                            {photo.projectId.categoryId.name2} {photo.projectId.layoutId.name} {photo.projectId.layoutId.width}x{photo.projectId.layoutId.length}
                        </>
                    )}
                    description={`Дата строительства ${new Date(photo.created).toLocaleDateString()}`} />
                {this.renderPhotos()}
                {this.renderProjectLink()}
            </div>
        ) : null;
    };

    renderPhotos = () => {
        const { photo } = this.props;

        return photo ? (
            <div className={styles.photos}>
                <img className={styles.photo} src={photo.mainPhoto} alt={photo.mainPhotoAlt} />
                {photo.photos.map(photo => {
                    return (
                        <img className={styles.photo} src={photo.image} alt={photo.imageAlt} />
                    );
                })}
            </div>
        ) : null;
    };

    renderProjectLink = () => {
        const { photo } = this.props;

        return (
            <a href={`/bani/${photo.projectId.categoryId.translateName}/${photo.projectId.layoutId.translateName}_${photo.projectId.layoutId.width}x${photo.projectId.layoutId.length}`} className={styles.projectLink}>
                <img src={photo.projectId.images.main} className={styles['projectLink-image']} alt={`Баня ${photo.projectId.layoutId.name} ${photo.projectId.layoutId.width}x${photo.projectId.layoutId.length}`} />
                <div className={styles['projectLink-text']}>Перейти к проекту бани</div>
            </a>
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
            getPhoto,
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
    const { photo } = state['client-photo'];

    return { photo };
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
