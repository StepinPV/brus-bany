import React, { memo } from 'react';
import PropTypes from "prop-types";

function YouTube({ link, className, height }) {
    return (
        <iframe
            className={className}
            height={height}
            src={link}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen />
    )
}

YouTube.propTypes = {
    link: PropTypes.string,
    className: PropTypes.string,
    height: PropTypes.number
};

export default memo(YouTube);
