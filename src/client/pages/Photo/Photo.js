import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getPhoto, resetData } from './actions';
import Page from '../../components/Page';
import H1Block from '../../components/H1Block';
import styles from './Photo.module.css';
import Text from '../../components/Text';
import Caption from '../../components/Caption';
import YouTube from '../../components/YouTube';
import { Simple } from '../../components/Button';
import FormBlock from '../../components/FormBlock';
import Meta from '../../components/Meta';
import renderDate from '@utils/RenderDate';

const breadcrumbsDefault = [{
    title: 'Главная',
    link: '/'
}, {
    title: 'Фотоотчеты построенных бань',
    link: '/photos'
}];

class Photo extends PureComponent {
    static propTypes = {
        photo: PropTypes.object,
        isPhotoError: PropTypes.bool,

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

    static initialAction({ dispatch, match }) {
        const { photoId } = match.params;
        return [dispatch(getPhoto(photoId))];
    }

    state = {
        categoryId: null,
        breadcrumbs: breadcrumbsDefault
    };

    componentDidMount() {
        const { actions, match, photo } = this.props;
        const { photoId } = match.params;

        if (!photo) {
            actions.getPhoto(photoId);
        }
    }

    componentWillUnmount() {
        const { actions } = this.props;
        actions.resetData();
    }

    render() {
        const { isPhotoError, photo, match } = this.props;
        const { breadcrumbs } = this.state;

        const { width, length, layoutName } = match.params;
        const urlValid = !photo || (
            String(photo.projectId.layoutId.width) === width &&
            String(photo.projectId.layoutId.length) === length &&
            photo.projectId.layoutId.translateName === layoutName
        );

        const metaTitle = `${photo.projectId.categoryId.name2.toLowerCase()} ${photo.projectId.layoutId.name} ${photo.projectId.layoutId.width}x${photo.projectId.layoutId.length}`;
        const meta = {
            title: `Фотоотчет построенного объекта - ${metaTitle}`,
            description: `Фотографии, отзывы, видео и описание построенного объекта - ${metaTitle}`
        };

        return (
            <Page breadcrumbs={breadcrumbs} notFound={isPhotoError || !urlValid}>
                <Meta meta={meta} />
                { this.renderContent() }
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
                            Фотоотчет проекта<br/>
                            {photo.projectId.categoryId.name2} {photo.projectId.layoutId.name} {photo.projectId.layoutId.width}x{photo.projectId.layoutId.length}
                        </>
                    )}
                    description={`Дата строительства: ${renderDate(new Date(photo.created))}`} />
                {this.renderDescription()}
                {this.renderPhotos()}
                {this.renderFeedback()}
                {this.renderYouTube()}
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
                        <img className={styles.photo} src={photo.image} alt={photo.imageAlt} loading='lazy' />
                    );
                })}
            </div>
        ) : null;
    };

    renderDescription = () => {
        const { photo } = this.props;

        return photo && photo.description ? (
            <div className={styles.description}>
                <Caption tag='h2' size='s' className={styles['sub-caption']}>Описание постройки:</Caption>
                <Text size='l'>{photo.description}</Text>
            </div>
        ) : null;
    };

    renderFeedback = () => {
        const { photo } = this.props;

        return photo && photo.feedback ? (
            <div className={styles.feedback}>
                <Caption tag='h2' size='s' className={styles['sub-caption']}>Отзыв клиента:</Caption>
                <div className={styles['feedback-content']}>
                    {photo.clientPhoto ? <img className={styles['feedback-photo']} src={photo.clientPhoto} alt='Фотография клиента' loading='lazy' /> : null}
                    <Text size='l' className={styles['feedback-text']}>{photo.feedback}</Text>
                </div>
            </div>
        ) : null;
    };

    renderYouTube = () => {
        const { photo } = this.props;

        return photo && (photo.videoFeedback || photo.video) ? (
            <>
                { photo.videoFeedback ? <div className={styles.feedback}>
                    <Caption tag='h2' size='s' className={styles['sub-caption']}>Видеоотзыв клиента:</Caption>
                    <YouTube link={photo.videoFeedback} height={315} className={styles['feedback-video']} title='Видеоотзыв' />
                </div> : null }
                { photo.video ? <div className={styles.feedback}>
                    <Caption tag='h2' size='s' className={styles['sub-caption']}>Видеообзор бани:</Caption>
                    <YouTube link={photo.video} height={315} className={styles['feedback-video']} title='Видеообзор' />
                </div> : null }
            </>
        ) : null;
    };

    renderProjectLink = () => {
        const { photo } = this.props;

        return (
            <a href={`/bani/${photo.projectId.categoryId.translateName}/${photo.projectId.layoutId.translateName}_${photo.projectId.layoutId.width}x${photo.projectId.layoutId.length}`} className={styles.projectLink}>
                <img src={photo.projectId.images.main} className={styles['projectLink-image']} alt={`Баня ${photo.projectId.layoutId.name} ${photo.projectId.layoutId.width}x${photo.projectId.layoutId.length}`} />
                <div className={styles['projectLink-text']}>
                    <div>
                        <div className={styles['projectLink-name']}>
                            {photo.projectId.categoryId.name2} {photo.projectId.layoutId.name} {photo.projectId.layoutId.width}x{photo.projectId.layoutId.length}
                        </div>
                        <Simple caption='Перейти к проекту бани' />
                    </div>
                </div>
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
    const { photo, isPhotoError } = state['client-photo'];

    return { photo, isPhotoError };
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
