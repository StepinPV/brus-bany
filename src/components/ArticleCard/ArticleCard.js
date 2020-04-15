import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './ArticleCard.module.css';
import Card from "../Card";
import renderDate from '@utils/RenderDate';

function ArticleCard(props) {
    const { translateName, created, article } = props.article;

    return (
        <a href={props.link || `/blog/${translateName}`} key={translateName} className={styles.container}>
            <Card
                firstImage={article.image}
                imageAlt={article.imageAlt}
                bgStyle='grey'
                imageWrapperClassName={styles['image-wrapper']}
                content={(
                    <div className={styles['item-content']}>
                        <div className={styles['date']}>{renderDate(new Date(created))}</div>
                        <div className={styles['item-caption']}>{article.name}</div>
                        <div className={styles['item-description']}>{article.imageDescription}</div>
                    </div>
                )}
            />
        </a>
    );
}

ArticleCard.propTypes = {
    article: PropTypes.object,
    link: PropTypes.string
};

export default memo(ArticleCard);
