import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Caption from '../components/Caption';
import Text from '../components/Text';
import Button from '../components/Button';
import { css } from '@emotion/react';
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
    padding: 0 14%;
    box-sizing: border-box;
    
    ${props => css`
        align-items: ${{ left: 'flex-start', center: 'center', right: 'flex-end' }[props.styles.align]}
    `}
`;

const Buttons = styled.div`
    margin: 16px 8px;
    display: flex;
    justify-content: center;
`;

function Banner(props) {
    return (
        <Container {...(props.id ? { id: props.id } : {})}>
            <BannerElement
                styles={{
                    backgroundImage: props.image ? `url(${props.__images__[props.image]})` : null
                }} />
            {props.overlay ? <Layout /> : null}
            <Content styles={{ align: props.align }}>
                { props.caption ? (
                    <Caption
                        tag='h1'
                        color='white'
                        containerStyles={css`max-width: 1200px; padding: 16px;`}
                        size='l'
                        align={props.align}
                        children={props.caption}
                        __fieldsValue__={props.__fieldsValue__} />
                ) : null }
                { props.text ? (
                    <Text
                        color='white'
                        containerStyles={css`max-width: 1200px; padding: 16px 16px 32px;`}
                        size='l'
                        align={props.align}
                        children={props.text}
                        __fieldsValue__={props.__fieldsValue__} />
                ) : null }
                <Buttons>
                    { props.button ? (
                        <Button
                            background={props.button.background}
                            color={props.button.color}
                            caption={props.button.caption}
                            containerStyles={css`margin: 0 8px`}
                            href={props.button.link}
                            __fieldsValue__={props.__fieldsValue__} />
                    ) : null }
                    { props.button2 ? (
                        <Button
                            background={props.button2.background}
                            color={props.button2.color}
                            caption={props.button2.caption}
                            containerStyles={css`margin: 0 8px`}
                            href={props.button2.link}
                            __fieldsValue__={props.__fieldsValue__} />
                    ) : null }
                </Buttons>
            </Content>
        </Container>
    )
}

Banner.propTypes = {
    caption: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.number,
    id: PropTypes.string,
    align: PropTypes.string,
    overlay: PropTypes.bool
};

Banner.defaultProps = {
    align: 'center',
    overlay: true
}

export default memo(Banner);

