import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const Container = styled.img`
    display: block;
    max-width: 100%;
    margin: 0 auto;
    ${props => css`
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? props.theme['padding-top'][props.styles.paddingTop] : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? props.theme['padding-bottom'][props.styles.paddingBottom] : ''};
        object-fit: ${props.styles.objectFit};
        height: ${props.styles.height ? `${props.styles.height}px` : ''};
        width: ${props.styles.objectFit === 'fill' || props.styles.objectFit === 'cover' ? '100%' : ''};
    `}
`;

function Image(props) {
    return (
        <Container
            styles={{
                paddingBottom: props.paddingBottom,
                paddingTop: props.paddingTop,
                objectFit: props.objectFit,
                height: props.height
            }}
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
