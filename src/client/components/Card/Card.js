import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Card.module.css';

function Card(props) {
    const { bgStyle, firstImage, imageAlt, content, firstButton, secondButton, onClick, className, style, imageWrapperClassName } = props;

    return (
        <div onClick={onClick} className={cx(className, styles.container, styles[`container-${bgStyle}`])} style={style}>
            <div className={cx(styles['image-wrapper'], imageWrapperClassName)}>
                <img src={firstImage} alt={imageAlt} className={styles['image']} loading='lazy' />
            </div>
            <div className={styles['content']}>
                {content}
            </div>
            {(firstButton || secondButton) ? (
                <div className={styles['buttons']}>
                    {firstButton ? <div className={cx(styles['button'], styles['button-first'])}>{firstButton}</div> : null}
                    {secondButton ? <div className={cx(styles['button'], styles['button-second'])}>{secondButton}</div> : null}
                </div>
            ) : null}
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
    style: PropTypes.object,
    imageWrapperClassName: PropTypes.string
};

Card.defaultProps = {
    bgStyle: 'grey'
};

export default memo(Card);
