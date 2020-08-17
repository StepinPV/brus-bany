import React, { memo } from 'react';
import PropTypes from "prop-types";
import styles from './Image.module.css';
import cx from 'classnames';

function Image(props) {
    const className = cx(
        styles.image,
        props.paddingTop !== 'none' ? styles[`padding-top-${props.paddingTop}`] : null,
        props.paddingBottom !== 'none' ? styles[`padding-bottom-${props.paddingBottom}`] : null,
        styles[`object-fit-${props.objectFit}`]
    );

    return (
        <img
            style={{ height: props.height }}
            className={className}
            src={props.__images__[props.image]}
            alt={props.imageAlt}
            loading='lazy' />
    );
}

Image.propTypes = {
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    objectFit: PropTypes.oneOf(['fill', 'contain', 'cover']),
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    height: PropTypes.number
};

Image.defaultProps = {
    paddingTop: 'm',
    paddingBottom: 'm',
    objectFit: 'contain'
};

export default memo(Image);
