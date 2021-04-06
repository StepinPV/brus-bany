import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Caption, Text, Button } from '../index';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const Container = styled.div`
    position: relative;
`;

const Banner = styled.div`
    height: 100vh;
    width: 100%;
    
    background-size: cover;
    
    @media (max-width: 640px) {
        background-position-x: 57%;
    }
    
    ${props => css`
        background-image: ${props.styles.image ? `url(${props.styles.image})` : ''}
    `}
`;

const Layout = styled.div`
    height: 100vh;
    width: 100%;
    
    position: absolute;
    top: 0;
    left: 0;
    
    background-image: linear-gradient(126deg,rgb(0, 49, 90) 32%,rgba(0, 49, 90, 0.8) 42%, rgba(0, 49, 90, 0.7) 48%,rgba(0, 49, 90, 0.6) 52.6%,rgba(39, 143, 186, 0) 66.3%) !important;
`;

const ContentContainer = styled.div`
    height: 100vh;
    width: 100%;
    
    position: absolute;
    top: 0;
    left: 0;
`;

const Content = styled.div`
    margin-top: 34vh;
    margin-left: 14%;
    margin-right: 14%;
    
    @media (max-width: 640px) {
        margin-top: 24vh;
    }
`;

const Header = styled.div`
    max-width: 632px;
    
    @media (max-width: 640px) {
        text-align: center;
    }
`;

const Description = styled.div`
    color: #fff;
    opacity: .7;
    max-width: 532px;
    
    @media (max-width: 640px) {
        text-align: center;
    }
`;

const Buttons = styled.div`
    display: flex;
    
    @media (max-width: 640px) {
        flex-direction: column;
    }
`;

function Banner2(props) {
    return (
        <Container>
            <Banner styles={{ image: props.__images__[props.image] }} />
            <Layout />
            <ContentContainer>
                <Content>
                    <Header>
                        <Caption
                            tag='h1'
                            color='white'
                            paddingBottom='s'
                            paddingTop='s'
                            size='l'
                            align='left'
                            __fieldsValue__={props.__fieldsValue__}>
                            {props.caption}
                        </Caption>
                    </Header>
                    <Description>
                        <Text
                            color='white'
                            paddingBottom='m'
                            paddingTop='s'
                            size='l'
                            align='left'
                            __fieldsValue__={props.__fieldsValue__}>
                            {props.text}
                        </Text>
                    </Description>
                    <Buttons>
                        {props.firstButton ? (
                            <Button
                                background='{ "type": "base", "value": "yellow" }'
                                color='{ "type": "base", "value": "black" }'
                                caption={props.firstButton.title}
                                paddingBottom='s'
                                paddingTop='s'
                                href={props.firstButton.href}
                                stretch={false}
                                __fieldsValue__={props.__fieldsValue__} />
                        ) : null}
                        {props.secondButton ? (
                            <Button
                                background='{ "type": "base", "value": "red" }'
                                color='{ "type": "base", "value": "white" }'
                                paddingBottom='s'
                                paddingTop='s'
                                caption={props.secondButton.title}
                                href={props.secondButton.href}
                                stretch={false}
                                __fieldsValue__={props.__fieldsValue__} />
                        ) : null}
                    </Buttons>
                </Content>
            </ContentContainer>
        </Container>
    )
}

Banner2.propTypes = {
    image: PropTypes.string,
    caption: PropTypes.string,
    text: PropTypes.string,
    firstButton: PropTypes.object,
    secondButton: PropTypes.object,
};

export default memo(Banner2);

