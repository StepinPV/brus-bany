import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './AddCard.module.css';

function AddCard({ link }) {
    return (
        <a href={link} className={styles.wrapper}>
            <div className={styles.container}>
                +
            </div>
        </a>
    );
}

AddCard.propTypes = {
    link: PropTypes.string
};

export default memo(AddCard);
