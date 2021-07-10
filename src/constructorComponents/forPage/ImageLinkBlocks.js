import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Caption from '../components/Caption';
import Button from '../components/Button';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import ContainerComponent from './Container';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 1200px;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: -webkit-linear-gradient(top, rgba(0,0,0,0.70), rgba(0,0,0,0.50));
`;

const Item = styled.a`
    flex-basis: 560px;
    position: relative;
    margin: 16px;
    cursor: pointer;
    text-decoration: none;
    background-size: cover;
    background-position: center;
    
    ${props => css`
        background-image: ${props.styles.image ? `url(${props.styles.image})` : ''}
    `}
    
    &:hover {
        ${Overlay} {
            background-image: -webkit-linear-gradient(top, rgba(0,0,0,0.40), rgba(0,0,0,0.20));
        }
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
    position: relative;
`;

function ImageLinkBlocks(props) {
    return (
        <ContainerComponent
            id={props.id}
            paddingBottom={props.paddingBottom}
            paddingTop={props.paddingTop}
            background={props.containerBackground}>
            <Container>
                {props.items.map(({ title, link, image, button }) => {
                    return (
                        <Item href={link} key={link} styles={{ image: props.__images__[image] }}>
                            <Overlay />
                            <Content>
                                <Caption
                                    color='{ "type": "base", "value": "white" }'
                                    size='m'
                                    align='center'
                                    containerStyles={css`padding-top: 16px;padding-bottom: 32px;`}
                                    __fieldsValue__={props.__fieldsValue__}>
                                    {title}
                                </Caption>
                                {button ? (
                                    <Button
                                        color={button.color}
                                        background={button.background}
                                        containerStyles={css`margin-top: 16px;margin-bottom: 16px;`}
                                        caption={button.caption}
                                        type='div'
                                        size='m'
                                        __fieldsValue__={props.__fieldsValue__} />
                                ) : null}
                            </Content>
                        </Item>
                    )
                })}
            </Container>
        </ContainerComponent>
    );
}

ImageLinkBlocks.propTypes = {
    items: PropTypes.array
};

ImageLinkBlocks.defaultProps = {
    items: []
};

export default memo(ImageLinkBlocks);
