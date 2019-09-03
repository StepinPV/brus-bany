import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Link from '../../../components/Link';
import styles from './ProjectCard.module.css';
import Card from "../Card";

function ProjectCard(props) {
    const { categoryName, project } = props;
    const { images, price, layoutId } = project;

    return (
        <Link to={`/bani/${categoryName}/${layoutId['translateName']}_${layoutId.width}x${layoutId.length}`} key={layoutId['translateName']} className={styles.container}>
            <Card
                firstImage={images ? images['main'] : null}
                firstButton='Подробнее'
                secondButton={`${price ? price.toLocaleString() : null} руб`}
                bgStyle='grey'
                content={(
                    <div className={styles['info']}>
                        <div className={styles['info-name']}>{`Баня ${layoutId.name}`}</div>
                        <div className={styles['info-size']}>{`${layoutId.width}x${layoutId.length}`}</div>
                        <div className={styles['info-area']}>{`Площадь: ${layoutId.area}м`}<sup>2</sup></div>
                    </div>
                )}
            />
        </Link>
    );
}

ProjectCard.propTypes = {
    project: PropTypes.object,
    categoryName: PropTypes.string
};

export default memo(ProjectCard);
