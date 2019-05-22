import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Card.module.css';

function Card(props) {
    const { bgStyle, firstImage, content, firstButton, secondButton } = props;

    return (
        <div className={cx(styles.container, styles[`container-${bgStyle}`])}>
            <img src={firstImage} alt="" className={styles['image']}/>
            {content}
            <div className={styles['buttons']}>
                <div className={cx(styles['button'], styles['button-first'])}>{firstButton}</div>
                <div className={cx(styles['button'], styles['button-second'])}>{secondButton}</div>
            </div>
        </div>
    );
}

Card.propTypes = {
    bgStyle: PropTypes.oneOf(['white', 'grey']),
    firstImage: PropTypes.string.isRequired,
    secondImage: PropTypes.string,
    content: PropTypes.node,
    firstButton: PropTypes.string,
    secondButton: PropTypes.string
};

Card.defaultProps = {
    bgStyle: 'grey'
};

export default memo(Card);
