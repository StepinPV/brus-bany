import React, { memo } from 'react';
import PropTypes from "prop-types";
import Caption from '../components/Caption';
import Text from '../components/Text';
import Button from '../components/Button';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import ContainerComponent from './Container';

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin: 0 auto;
    ${props => css`
        max-width: ${props.theme['max-width']['m'].v};
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
    width: 400px;
    height: 300px;
    object-fit: cover;
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
        <ContainerComponent
            paddingLeft
            paddingRight
            id={props.id}
            paddingBottom={props.paddingBottom}
            paddingTop={props.paddingTop}
            background={props.containerBackground}>
            <Container>
                <Image src={props.__images__[props.image]} alt={props.imageAlt} loading='lazy' />
                <Info>
                    <Caption
                        size='s'
                        align='left'
                        containerStyles={css`margin: 16px;`}
                        __fieldsValue__={props.__fieldsValue__}>
                        {props.caption}
                    </Caption>
                    <Text
                        align='left'
                        containerStyles={css`margin: 16px;`}
                        __fieldsValue__={props.__fieldsValue__}>
                        {props.text}
                    </Text>
                    {props.buttonCaption ? (
                        <Button
                            containerStyles={css`margin: 16px;`}
                            color='{ "type": "base", "value": "white" }'
                            background='{ "type": "base", "value": "red" }'
                            href={props.buttonHref}
                            caption={props.buttonCaption}
                            __fieldsValue__={props.__fieldsValue__} />
                    ) : null}
                </Info>
            </Container>
        </ContainerComponent>
    );
}

ImageLinkBlock.propTypes = {
    image: PropTypes.number,
    imageAlt: PropTypes.string,
    caption: PropTypes.string,
    text: PropTypes.string,
    buttonCaption: PropTypes.string,
    buttonHref: PropTypes.string
};

export default memo(ImageLinkBlock);
