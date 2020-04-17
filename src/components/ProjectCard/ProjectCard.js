import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './ProjectCard.module.css';
import Card from "../Card";
import numberWithSpaces from '../../utils/numberWithSpaces';

function renderInfoTitle(project){
    const { layoutId } = project;
    const { terrace, attic, porch } = layoutId;

    if (terrace && attic && porch) {
        return ' c террасой, мансардой и крыльцом';
    } else if (terrace && attic) {
        return ' c террасой и мансардой';
    } else if (terrace && porch) {
        return ' c террасой и крыльцом';
    } else if (terrace) {
        return ' c террасой';
    } else if (attic && porch) {
        return ' c мансардой и крыльцом';
    } else if (attic && porch) {
        return ' c мансардой';
    } else if (porch) {
        return ' c крыльцом';
    }
}

function ProjectCard(props) {
    const { category, project, link } = props;
    const { images, prices, layoutId } = project;
    const { complectationBlocks } = category;

    return (
        <a href={link || `/bani/${category.translateName}/${layoutId['translateName']}_${layoutId.width}x${layoutId.length}`} key={layoutId['translateName']} className={styles.container}>
            <Card
                firstImage={images ? images['card'] : null}
                imageAlt={`Баня ${layoutId.name} ${layoutId.width}x${layoutId.length}`}
                firstButton='Подробнее'
                secondButton={`от ${prices && complectationBlocks && prices[complectationBlocks.defaultItemId] ? numberWithSpaces(prices[complectationBlocks.defaultItemId]) : 0} руб`}
                bgStyle='grey'
                content={(
                    <div className={styles['info']}>
                        <div className={styles['info-title']}>
                            {category.name2} {`${layoutId.width}x${layoutId.length}`}
                            {renderInfoTitle(project)}
                            <span className={styles['info-title-name']} dangerouslySetInnerHTML={{ __html: ` «${project.layoutId.name.replace(/ /g, '&nbsp')}»` }} />
                        </div>
                        <div className={styles['info-area']}>{`Площадь: ${layoutId.area}м`}<sup>2</sup></div>
                    </div>
                )}
            />
        </a>
    );
}

ProjectCard.propTypes = {
    project: PropTypes.object,
    category: PropTypes.object,
    link: PropTypes.string
};

export default memo(ProjectCard);
