import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './PhotoCard.module.css';
import Card from "../Card";

function PhotoCard(props) {
    const { mainPhoto, mainPhotoAlt, created, projectId, _id } = props.photo;

    return (
        <a href={`/photos/${projectId.categoryId.translateName}/${projectId.layoutId.translateName}_${projectId.layoutId.width}x${projectId.layoutId.length}_${_id}`} className={styles.container}>
            <Card
                firstImage={mainPhoto}
                imageAlt={mainPhotoAlt}
                firstButton='Смотреть'
                bgStyle='grey'
                content={(
                    <div className={styles['content']}>
                        <div className={styles['caption']}>{`${projectId.layoutId.name} ${projectId.layoutId.width}x${projectId.layoutId.length}`}</div>
                        <div className={styles['date']}>{`Дата строительства: ${new Date(created).toLocaleDateString()}`}</div>
                    </div>
                )}
            />
        </a>
    );
}

PhotoCard.propTypes = {
    photo: PropTypes.object
};

export default memo(PhotoCard);
