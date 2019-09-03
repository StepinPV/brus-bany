import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './CardList.module.css';

function CardList(props) {
    const { items } = props;

    return (
        <div className={styles.container}>
            {items.map(item => <div key={item.id} className={styles.item}>{item.element}</div>)}
            <div className={styles.item} />
            <div className={styles.item} />
        </div>
    );
}

CardList.propTypes = {
    items: PropTypes.array
};

CardList.defaultProps = {
    items: []
};

export default memo(CardList);
