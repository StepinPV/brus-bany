import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Caption from '../components/Caption';
import Text from '../components/Text';
import Button from '../components/Button';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const Container = styled.div`
    position: relative;
`;

const BannerLayoutContent = css`
    height: 100vh;
    width: 100%;
`;

const LayoutContent = css`
    position: absolute;
    top: 0;
    left: 0;
`;

const BannerElement = styled.div`
    ${BannerLayoutContent}
    background-size: cover;
    background-position: center;
    
    ${props => css`
        background-image: ${props.styles.backgroundImage || ''}
    `}
`;

const Layout = styled.div`
    ${BannerLayoutContent}
    ${LayoutContent}
    background-image: linear-gradient(to top, rgba(0,0,0,0.70), rgba(0,0,0,0.80)) !important;
`;

const Content = styled.div`
    ${BannerLayoutContent}
    ${LayoutContent}
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 16px;
`;

function Banner(props) {
    return (
        <Container {...(props.id ? { id: props.id } : {})}>
            <BannerElement
                styles={{
                    backgroundImage: props.image ? `url(${props.__images__[props.image]})` : null
                }} />
            <Layout />
            <Content>
                { props.caption ? (
                    <Caption
                        tag='h1'
                        color='white'
                        containerStyles={css`max-width: 1200px; margin: 0 auto; padding: 16px;`}
                        size='l'
                        align='center'
                        children={props.caption}
                        __fieldsValue__={props.__fieldsValue__} />
                ) : null }
                { props.text ? (
                    <Text
                        color='white'
                        containerStyles={css`max-width: 1200px; margin: 0 auto; padding: 16px 16px 32px;`}
                        size='l'
                        align='center'
                        children={props.text}
                        __fieldsValue__={props.__fieldsValue__} />
                ) : null }
                { props.buttonCaption ? (
                    <ButtonContainer>
                        <Button
                            color='white'
                            background='red'
                            size='m'
                            caption={props.buttonCaption}
                            href={props.buttonLink}
                            __fieldsValue__={props.__fieldsValue__} />
                    </ButtonContainer>
                ) : null }
            </Content>
        </Container>
    )
}

Banner.propTypes = {
    caption: PropTypes.string,
    text: PropTypes.string,
    buttonCaption: PropTypes.string,
    buttonLink: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.string
};

export default memo(Banner);

