import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Card.module.css';

function Card(props) {
    const { bgStyle, firstImage, imageAlt, content, firstButton, secondButton, onClick, className, style } = props;

    return (
        <div onClick={onClick} className={cx(className, styles.container, styles[`container-${bgStyle}`])} style={style}>
            <div className={styles['image-wrapper']}>
                <img src={firstImage} alt={imageAlt} className={styles['image']} loading='lazy' />
            </div>
            {content}
            <div className={styles['buttons']}>
                {firstButton ? <div className={cx(styles['button'], styles['button-first'])}>{firstButton}</div> : null}
                {secondButton ? <div className={cx(styles['button'], styles['button-second'])}>{secondButton}</div> : null}
            </div>
        </div>
    );
}

Card.propTypes = {
    bgStyle: PropTypes.oneOf(['white', 'grey']),
    firstImage: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
    secondImage: PropTypes.string,
    content: PropTypes.node,
    firstButton: PropTypes.string,
    secondButton: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object
};

Card.defaultProps = {
    bgStyle: 'grey'
};

export default memo(Card);
