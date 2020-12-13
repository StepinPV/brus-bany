import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Caption, Text, Button } from '../index';
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

function Banner(props) {
    return (
        <Container {...(props.id ? { id: props.id } : {})}>
            <BannerElement
                styles={{
                    backgroundImage: props.image ? `url(${props.__images__[props.image]})` : null
                }} />
            <Layout />
            <Content>
                { props.captionProps ? <Caption {...props.captionProps} /> : null }
                { props.textProps ? <Text {...props.textProps} /> : null }
                { props.buttonProps ? <Button {...props.buttonProps} /> : null }
            </Content>
        </Container>
    )
}

Banner.propTypes = {
    captionProps: PropTypes.object,
    textProps: PropTypes.object,
    buttonProps: PropTypes.object,
    image: PropTypes.string,
    id: PropTypes.string
};

export default memo(Banner);

