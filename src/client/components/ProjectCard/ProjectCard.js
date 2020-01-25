import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './ProjectCard.module.css';
import Card from "../Card";
import numberWithSpaces from '../../../utils/numberWithSpaces';

function ProjectCard(props) {
    const { categoryName, project } = props;
    const { images, price, layoutId } = project;

    return (
        <a href={`/bani/${categoryName}/${layoutId['translateName']}_${layoutId.width}x${layoutId.length}`} key={layoutId['translateName']} className={styles.container}>
            <Card
                firstImage={images ? images['main'] : null}
                imageAlt={`Баня ${layoutId.name} ${layoutId.width}x${layoutId.length}`}
                firstButton='Подробнее'
                secondButton={`${price ? numberWithSpaces(price) : 0} руб`}
                bgStyle='grey'
                content={(
                    <div className={styles['info']}>
                        <div className={styles['info-name']}>{`Баня ${layoutId.name}`}</div>
                        <div className={styles['info-size']}>{`${layoutId.width}x${layoutId.length}`}</div>
                        <div className={styles['info-area']}>{`Площадь: ${layoutId.area}м`}<sup>2</sup></div>
                    </div>
                )}
            />
        </a>
    );
}

ProjectCard.propTypes = {
    project: PropTypes.object,
    categoryName: PropTypes.string
};

export default memo(ProjectCard);
