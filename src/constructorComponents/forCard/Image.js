import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { applyFields } from '../helpers';

const Container = styled.div`    
    ${props => css`
        ${props.styles.heightWidth ? `
            padding-top: ${props.styles.heightWidth}% !important;
            position: relative;
        ` : ''}
    `}
`;

const Img = styled.img`
    width: 100%;
    ${props => css`
        object-fit: ${props.styles.objectFit};
        height: ${(props.styles.height && !props.styles.heightWidth) ? `${props.styles.height}px` : '100%'};
        
        ${props.styles.heightWidth ? `
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        ` : ''}
    `}
`;

const Sticker = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 4px;
    font-size: 12px;
    margin: 8px;
    border-radius: 4px;
    color: #000;
    background: #ffe100;
    z-index: 1;
`;

function Image(props) {
    return (
        <Container styles={{ heightWidth: props['height-width'] }}>
            {props.sticker && applyFields(props.__fieldsValue__, props.sticker.condition) ? <Sticker>{applyFields(props.__fieldsValue__, props.sticker.text)}</Sticker> : null}
            <Img
                styles={{
                    objectFit: props.objectFit,
                    height: props.height,
                    heightWidth: props['height-width']
                }}
                src={applyFields(props.__fieldsValue__, props.__images__[props.image])}
                alt={applyFields(props.__fieldsValue__, props.imageAlt)}
                loading='lazy' />
        </Container>
    );
}

Image.propTypes = {
    objectFit: PropTypes.oneOf(['fill', 'contain', 'cover']),
    image: PropTypes.number,
    imageAlt: PropTypes.string,
    height: PropTypes.number,
    sticker: PropTypes.object
};

Image.defaultProps = {
    objectFit: 'contain'
};

export default memo(Image);
