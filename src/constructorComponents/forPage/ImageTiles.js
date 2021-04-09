import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import ContainerComponent from './Container';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    ${props => css`
        max-width: ${props.theme['max-width']['m'].v};
    `}
`;

const Item = styled.img`
    max-width: calc(50% - 16px);
    max-height: 400px;
    display: flex;
    text-decoration: none;
    object-fit: contain;
    margin: 8px;
`;

function ImageTiles(props) {
    return (
        <ContainerComponent
            paddingLeft
            paddingRight
            id={props.id}
            paddingBottom={props.paddingBottom}
            paddingTop={props.paddingTop}
            background={props.containerBackground}>
            <Container>
                {props.images ? props.images.map(({ src, alt }) => (
                    <Item key={src} src={props.__images__[src]} alt={alt} loading='lazy' />
                )) : null}
            </Container>
        </ContainerComponent>
    );
}

ImageTiles.propTypes = {
    images: PropTypes.array
};

ImageTiles.defaultProps = {
    images: []
};

export default memo(ImageTiles);
