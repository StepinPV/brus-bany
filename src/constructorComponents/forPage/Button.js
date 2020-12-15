import React, { memo } from 'react';
import PropTypes from "prop-types";
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { getColor, applyFields } from '../helpers';

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    
    ${props => css`
        max-width: ${props.styles.width ? { s: '728px', m: '1200px', l: '100%' }[props.styles.width] : ''};
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? { s: '16px', m: '32px', l: '48px' }[props.styles.paddingTop] : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? { s: '16px', m: '32px', l: '48px' }[props.styles.paddingBottom] : ''};
        padding-left: ${props.styles.paddingLeft && props.styles.paddingLeft !== 'none' ? { s: '16px', m: '32px', l: '48px' }[props.styles.paddingLeft] : ''};
        padding-right: ${props.styles.paddingRight && props.styles.paddingRight !== 'none' ? { s: '16px', m: '32px', l: '48px' }[props.styles.paddingRight] : ''};
        justify-content: ${{ left: 'flex-start', center: 'center', right: 'flex-end' }[props.styles.align]};
    `}
`;

const Content = styled.a`
    border-radius: 5px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    display: block;
    
    ${props => css`
        width: ${props.styles.fullWidth ? '100%' : ''};
        color: ${getColor(props)};
        background-color: ${getColor(props, 'background')};
        line-height: ${{ m: '', s: '18px' }[props.styles.size]};
        
        @media (min-width: 641px) {
            padding: ${{ m: '20px 60px', s: '10px 30px' }[props.styles.size]};
            font-size: ${{ m: '16px', s: '14px' }[props.styles.size]};
        }
        
        @media (max-width: 640px) {
            padding: ${{ m: '20px 42px', s: '10px 16px' }[props.styles.size]};
            font-size: ${{ m: '12px', s: '10px' }[props.styles.size]};
        }
    `}
`;

function Button(props) {
    const options = {
        download: props.download,
        href: props.href
    };

    if (props.targetBlank) {
        options.target = '_blank';
    }

    if (props.noOpener) {
        options.rel = 'noopener noreferrer';
    }

    return (
        <Container
            {...(props.id ? { id: props.id } : {})}
            styles={{
                width: props.containerWidth,
                align: props.align,
                paddingTop: props.paddingTop,
                paddingBottom: props.paddingBottom,
                paddingLeft: props.paddingLeft,
                paddingRight: props.paddingRight
            }}>
            <Content
                dangerouslySetInnerHTML={{ __html: applyFields(props.__fieldsValue__, props.caption) }}
                as={props.type}
                {...options}
                styles={{
                    fullWidth: props.fullWidth,
                    color: props.color,
                    background: props.background,
                    size: props.size
                }}>
            </Content>
        </Container>
    );
}

Button.propTypes = {
    size: PropTypes.oneOf(['s', 'm']),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingLeft: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingRight: PropTypes.oneOf(['none', 's', 'm', 'l']),
    containerWidth: PropTypes.oneOf(['s', 'm', 'l']),
    fullWidth: PropTypes.bool,
    download: PropTypes.bool,
    noOpener: PropTypes.bool,
    targetBlank: PropTypes.bool,
    caption: PropTypes.string,
    href: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.oneOf(['a', 'button']).isRequired
};

Button.defaultProps = {
    size: 'm',
    align: 'center',
    paddingTop: 'm',
    paddingBottom: 'm',
    paddingLeft: 's',
    paddingRight: 's',
    containerWidth: 'm',
    fullWidth: false,
    download: false,
    targetBlank: false,
    noOpener: false,
    type: 'a'
};

export default memo(Button);
