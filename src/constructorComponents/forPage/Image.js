import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { applyFields } from '../helpers';
import ContainerComponent from './Container';

const Container = styled.div`
    display: block;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    
    ${props => css`
        max-width: ${props.styles.width ? props.theme['max-width'][props.styles.width].v : ''};
        ${props.styles.heightWidth ? `
            padding-top: ${props.styles.heightWidth}% !important;
            position: relative;
        ` : ''}
    `}
`;

const Title = styled.div`
    text-align: center;
    font-size: 14px;
    margin-top: 8px;
    color: #999;
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

function Image(props) {
    return (
        <ContainerComponent
            paddingLeft
            paddingRight
            id={props.id}
            paddingBottom={props.paddingBottom}
            paddingTop={props.paddingTop}
            background={props.containerBackground}>
            <Container
                styles={{
                    width: props.width,
                    heightWidth: props['height-width']
                }}>
                <Img
                    styles={{
                        objectFit: props.objectFit,
                        height: props.height,
                        heightWidth: props['height-width']
                    }}
                    src={applyFields(props.__fieldsValue__, props.__images__[props.image])}
                    alt={applyFields(props.__fieldsValue__, props.imageAlt)}
                    loading='lazy' />
                {props.title ? <Title>{props.title}</Title> : null}
            </Container>
        </ContainerComponent>
    );
}

Image.propTypes = {
    objectFit: PropTypes.oneOf(['fill', 'contain', 'cover']),
    image: PropTypes.number,
    imageAlt: PropTypes.string,
    height: PropTypes.number,
    title: PropTypes.string
};

Image.defaultProps = {
    objectFit: 'contain'
};

export default memo(Image);
