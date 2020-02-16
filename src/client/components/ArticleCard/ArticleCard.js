import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './ArticleCard.module.css';
import Card from "../Card";

const renderDate = (date) => `${date.getDate()}.${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}.${date.getFullYear()}`;

function ArticleCard(props) {
    const { translateName, created, article } = props.article;

    return (
        <a href={`/blog/${translateName}`} key={translateName} className={styles.container}>
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
    article: PropTypes.object
};

export default memo(ArticleCard);
