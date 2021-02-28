import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    max-width: 1168px;
    margin: 0 auto;
    ${props => css`
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? props.theme['padding-top'][props.styles.paddingTop].v : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? props.theme['padding-bottom'][props.styles.paddingBottom].v : ''};
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
        <Container
            styles={{
                paddingBottom: props.paddingBottom,
                paddingTop: props.paddingTop
            }}>
            {props.images ? props.images.map(({ src, alt }) => (
                <Item src={props.__images__[src]} alt={alt} loading='lazy' />
            )) : null}
        </Container>
    );
}

ImageTiles.propTypes = {
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    images: PropTypes.array
};

ImageTiles.defaultProps = {
    paddingTop: 'm',
    paddingBottom: 'm',
    images: []
};

export default memo(ImageTiles);
