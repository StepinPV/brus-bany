import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { applyFields, applyImages } from '../helpers';

const ImageContainer = styled.div`
    position: relative;
`;

const ArrowContainer = css`
    width: 50px;
    height: 50px;
    position: absolute;
    top: calc(50% - 25px);
    background: rgba(197, 197, 197, 0.5);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
        background: rgba(197, 197, 197, 0.7);
    }
    @media (max-width: 640px) {
        width: 30px;
        height: 30px;
    }
`;

const PrevArrowContainer = styled.div`
    ${ArrowContainer}
    @media (max-width: 640px) {
        left: 10px;
    }
    left: 20px;
`;

const NextArrowContainer = styled.div`
    ${ArrowContainer}
    @media (max-width: 640px) {
        right: 10px;
    }
    right: 20px;
`;

const Arrow = css`
    z-index: 10;
    border: solid #000;
    border-width: 0 0 2px 2px;
    width: 20px;
    height: 20px;
    line-height: 0;
    font-size: 0;
    display: block;
    @media (max-width: 640px) {
        width: 10px;
        height: 10px;
    }
`;

const PrevArrow = styled.i`
    ${Arrow}
    transform: rotate(45deg);
    margin-left: 8px;
    @media (max-width: 640px) {
        margin-left: 8px;
    }
`;

const NextArrow = styled.i`
    ${Arrow}
    transform: rotate(-135deg);
    margin-right: 8px;
    @media (max-width: 640px) {
        margin-right: 8px;
    }
`;

const ActiveImage = styled.img`
    width: 100%;
`;

const Images = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Image = styled.img`
    width: 60px;
    height: 60px;
    object-fit: cover;
    margin: 8px;
    ${props => css`
        outline: ${props.styles.selected ? '2px solid #000' : ''};
        outline-offset: ${props.styles.selected ? '-2px' : ''};
    `}
`;

function Gallery({ images, __images__, __fieldsValue__, staticContext }) {
    const [index, setIndex] = useState(0);

    if (staticContext && staticContext.simplePage) {
        staticContext.simplePage = false;
    }

    return (
        <>
            <ImageContainer>
                <PrevArrowContainer onClick={() => {
                    const newIndex = index - 1;
                    setIndex(newIndex === -1 ? images.length - 1 : newIndex)
                }}>
                    <PrevArrow />
                </PrevArrowContainer>
                <NextArrowContainer onClick={() => {
                    const newIndex = index + 1;
                    setIndex(newIndex === images. length ? 0 : newIndex);
                }}>
                    <NextArrow />
                </NextArrowContainer>
                {images && images.length ? (
                    <div itemScope itemType='http://schema.org/ImageObject'>
                        <ActiveImage
                            itemProp='contentUrl'
                            src={applyImages(__fieldsValue__, __images__, images[index].src)}
                            alt={applyFields(__fieldsValue__, images[index].alt)} />
                    </div>
                ) : null}
            </ImageContainer>
            <Images>
                {images.map((image, i) => {
                    const src = applyImages(__fieldsValue__, __images__, image.src);
                    return src && /^\/uploads/.test(src) ? (
                        <Image
                            itemProp='image'
                            key={image.src}
                            onClick={() => {
                                setIndex(i);
                            }}
                            styles={{
                                selected: index === i
                            }}
                            src={src}
                            alt={applyFields(__fieldsValue__, image.alt)} />
                    ) : null;
                })}
            </Images>
        </>
    );
}

Gallery.propTypes = {
    images: PropTypes.array
};

Gallery.defaultProps = {
    images: []
};

export default memo(Gallery);
