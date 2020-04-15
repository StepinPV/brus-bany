import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './PhotoCard.module.css';
import Card from "../Card";
import renderDate from '@utils/RenderDate';

function PhotoCard(props) {
    const { layout, category } = props;
    const { mainPhoto, mainPhotoAlt, created, _id } = props.photo;

    return (
        <a href={props.link || `/photos/${category.translateName}/${layout.translateName}_${layout.width}x${layout.length}_${_id}`} className={styles.container}>
            <Card
                firstImage={mainPhoto}
                imageAlt={mainPhotoAlt}
                imageWrapperClassName={styles['image-wrapper']}
                bgStyle='grey'
                content={(
                    <div className={styles['content']}>
                        <div className={styles['caption']}>{`${category.name2} ${layout.name} ${layout.width}x${layout.length}`}</div>
                        <div className={styles['date']}>{`Дата строительства: ${renderDate(new Date(created))}`}</div>
                    </div>
                )}
            />
        </a>
    );
}

PhotoCard.propTypes = {
    photo: PropTypes.object,
    link: PropTypes.string
};

export default memo(PhotoCard);
