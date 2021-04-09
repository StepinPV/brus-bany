import React, { memo } from 'react';
import PropTypes from "prop-types";
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { applyFields } from '../helpers';

const Container = styled.a`
    border-radius: 5px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    
    ${props => css`
        width: ${props.styles.fullWidth ? '100%' : ''};
        color: ${props.styles.color ? props.theme.colors[props.styles.color[0] !== '{' ? props.styles.color : JSON.parse(props.styles.color).value].v : ''};
        background-color: ${props.styles.background ? props.theme.colors[props.styles.background[0] !== '{' ? props.styles.background : JSON.parse(props.styles.background).value].v : ''};
        line-height: ${{ m: '', s: '18px' }[props.styles.size]};
        
        @media (min-width: 641px) {
            padding: ${{ m: '20px 60px', s: '10px 30px' }[props.styles.size]};
            font-size: ${{ m: '16px', s: '14px' }[props.styles.size]};
        }
        
        @media (max-width: 640px) {
            padding: ${{ m: '20px 42px', s: '10px 16px' }[props.styles.size]};
            font-size: ${{ m: '12px', s: '10px' }[props.styles.size]};
        }
        
        ${props.containerStyles || ''}
    `}
`;

function Button(props) {
    const options = {
        download: props.download,
        href: applyFields(props.__fieldsValue__, props.href),
        containerStyles: props.containerStyles,
        as: props.type,
        dangerouslySetInnerHTML: { __html: applyFields(props.__fieldsValue__, props.caption) }
    };

    if (props.targetBlank) {
        options.target = '_blank';
    }

    if (props.noOpener) {
        options.rel = 'noopener noreferrer';
    }

    return (
        <Container
            {...options}
            styles={{
                fullWidth: props.fullWidth,
                color: props.color,
                background: props.background,
                size: props.size,
            }}>
        </Container>
    );
}

Button.propTypes = {
    size: PropTypes.oneOf(['s', 'm']),
    fullWidth: PropTypes.bool,
    download: PropTypes.bool,
    noOpener: PropTypes.bool,
    targetBlank: PropTypes.bool,
    caption: PropTypes.string,
    href: PropTypes.string,
    type: PropTypes.oneOf(['a', 'button']).isRequired,
    containerStyles: PropTypes.object
};

Button.defaultProps = {
    size: 'm',
    fullWidth: false,
    download: false,
    targetBlank: false,
    noOpener: false,
    type: 'a'
};

export default memo(Button);
