import React, { memo } from 'react';
import PropTypes from "prop-types";
import { Caption, Text, Button } from '../index';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const Container = styled.div`
    display: flex;
    justify-content: center;
    max-width: 1168px;
    margin: 0 auto;
    ${props => css`
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? props.theme['padding-top'][props.styles.paddingTop] : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? props.theme['padding-bottom'][props.styles.paddingBottom] : ''};
    `}
    @media (min-width: 401px) {
        align-items: center;
        padding-left: 16px;
        padding-right: 16px;
    }
    @media (max-width: 400px) {
        flex-direction: column;
        align-items: stretch;
    }
`;

const Image = styled.img`
    display: block;
    max-width: 100%;
    @media (min-width: 401px) {
        margin: 0 16px 0 0;
    }
    @media (max-width: 400px) {
        margin: 0 16px 16px 16px;
    }
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 500px;
`;

function ImageLinkBlock(props) {
    return (
        <Container styles={{ paddingTop: props.paddingTop, paddingBottom: props.paddingBottom }}>
            <Image src={props.__images__[props.image]} alt={props.imageAlt} loading='lazy' />
            <Info>
                <Caption size='s' align='left' paddingTop='s' paddingBottom='s'>{props.caption}</Caption>
                <Text align='left' paddingTop='s' paddingBottom='s' isHTML>{props.text}</Text>
                {props.buttonCaption ? (
                    <Button
                        paddingTop='s'
                        paddingBottom='s'
                        color='{ "type": "base", "value": "white" }'
                        background='{ "type": "base", "value": "red" }'
                        align='left'
                        href={props.buttonHref}
                        caption={props.buttonCaption}
                        fullWidth />
                ) : null}
            </Info>
        </Container>
    );
}

ImageLinkBlock.propTypes = {
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    caption: PropTypes.string,
    text: PropTypes.string,
    buttonCaption: PropTypes.string,
    buttonHref: PropTypes.string
};

ImageLinkBlock.defaultProps = {
    paddingTop: 'm',
    paddingBottom: 'm'
};

export default memo(ImageLinkBlock);
