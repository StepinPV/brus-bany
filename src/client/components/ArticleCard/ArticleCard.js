import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './ArticleCard.module.css';
import Card from "../Card";

function ArticleCard(props) {
    const { translateName, created, article } = props.article;

    return (
        <a href={`/blog/${translateName}`} key={translateName} className={styles.container}>
            <Card
                firstImage={article.image}
                imageAlt={article.imageAlt}
                firstButton='Читать полностью'
                bgStyle='grey'
                content={(
                    <div className={styles['item-content']}>
                        <div className={styles['date']}>{new Date(created).toLocaleDateString()}</div>
                        <div className={styles['item-caption']}>{article.name}</div>
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
