import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Caption, Button } from '../index';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    ${props => css`
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? props.theme['padding-top'][props.styles.paddingTop].v : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? props.theme['padding-bottom'][props.styles.paddingBottom].v : ''};
    `}
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
        <Container styles={{ paddingTop: props.paddingTop, paddingBottom: props.paddingBottom }}>
            {props.items.map(({ title, buttonTitle, link, image }) => {
                return (
                    <Item href={link} key={link} styles={{ image: props.__images__[image] }}>
                        <Overlay />
                        <Content>
                            <Caption
                                color='{ "type": "base", "value": "white" }'
                                size='m'
                                align='center'
                                paddingTop='s'
                                paddingBottom='m'
                                __fieldsValue__={props.__fieldsValue__}>
                                {title}
                            </Caption>
                            <Button
                                color='{ "type": "base", "value": "white" }'
                                background='{ "type": "base", "value": "red" }'
                                paddingTop='s'
                                paddingBottom='s'
                                caption={buttonTitle}
                                type='button'
                                size='m'
                                __fieldsValue__={props.__fieldsValue__} />
                        </Content>
                    </Item>
                )
            })}
        </Container>
    );
}

ImageLinkBlocks.propTypes = {
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    items: PropTypes.array
};

ImageLinkBlocks.defaultProps = {
    paddingTop: 'm',
    paddingBottom: 'm',
    items: []
};

export default memo(ImageLinkBlocks);
