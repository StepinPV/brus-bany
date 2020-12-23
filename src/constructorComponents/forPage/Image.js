import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {applyFields} from "../helpers";

const Title = styled.div`
    text-align: center;
    font-size: 14px;
    margin-top: 8px;
    color: #999;
`;

const Container = styled.div`
    display: block;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    ${props => css`
        padding-left: ${props.styles.paddingLeftAndRight ? '16px' : ''}; 
        padding-right: ${props.styles.paddingLeftAndRight ? '16px' : ''}; 
        max-width: ${props.styles.width ? props.theme['max-width'][props.styles.width].v : ''};
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? props.theme['padding-top'][props.styles.paddingTop].v : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? props.theme['padding-bottom'][props.styles.paddingBottom].v : ''};
        ${props.containerStyles || ''}
    `}
`;

const Img = styled.img`
    width: 100%;
    ${props => css`
        object-fit: ${props.styles.objectFit};
        height: ${props.styles.height ? `${props.styles.height}px` : '100%'};
    `}
`;

function Image(props) {
    return (
        <Container
            containerStyles={props.containerStyles}
            styles={{
                paddingBottom: props.paddingBottom,
                paddingTop: props.paddingTop,
                width: props.width,
                paddingLeftAndRight: props.paddingLeftAndRight
            }}>
            <Img
                styles={{
                    objectFit: props.objectFit,
                    height: props.height
                }}
                src={applyFields(props.__fieldsValue__, props.__images__[props.image])}
                alt={applyFields(props.__fieldsValue__, props.imageAlt)}
                loading='lazy' />
            {props.title ? <Title>{props.title}</Title> : null}
        </Container>
    );
}

Image.propTypes = {
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingLeftAndRight: PropTypes.bool,
    objectFit: PropTypes.oneOf(['fill', 'contain', 'cover']),
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    height: PropTypes.number,
    title: PropTypes.string
};

Image.defaultProps = {
    paddingTop: 'm',
    paddingBottom: 'm',
    objectFit: 'contain'
};

export default memo(Image);
