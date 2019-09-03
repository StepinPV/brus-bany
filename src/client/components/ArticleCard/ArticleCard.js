import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Link from '../../../components/Link';
import styles from './ArticleCard.module.css';
import Card from "../Card";

function ArticleCard(props) {
    const { translateName, image, name, created } = props.article;

    return (
        <Link to={`/blog/${translateName}`} key={translateName} className={styles.container}>
            <Card
                firstImage={image}
                firstButton='Читать полностью'
                bgStyle='grey'
                content={(
                    <div className={styles['item-content']}>
                        <div className={styles['date']}>{new Date(created).toLocaleDateString()}</div>
                        <div className={styles['item-caption']}>{name}</div>
                    </div>
                )}
            />
        </Link>
    );
}

ArticleCard.propTypes = {
    article: PropTypes.object
};

export default memo(ArticleCard);
