import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Card.module.css';

function Card(props) {
    const { bgStyle, firstImage, imageAlt, content, firstButton, secondButton, onClick, className, style, imageWrapperClassName } = props;

    return (
        <div onClick={onClick} className={cx(className, styles.container, styles[`container-${bgStyle}`])} style={style}>
            <div className={cx(styles['image-wrapper'], imageWrapperClassName)} itemScope itemType="http://schema.org/ImageObject">
                <img src={firstImage} alt={imageAlt} className={styles['image']} loading='lazy' itemProp="contentUrl" />
            </div>
            <div className={styles['content']}>
                {content}
            </div>
            {(firstButton || secondButton) ? (
                <div className={styles['buttons']}>
                    {firstButton ? <div className={cx(styles['button'], styles['button-first'])} dangerouslySetInnerHTML={{ __html: props.firstButton }} /> : null}
                    {secondButton ? <div className={cx(styles['button'], styles['button-second'])} dangerouslySetInnerHTML={{ __html: props.secondButton }} /> : null}
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
