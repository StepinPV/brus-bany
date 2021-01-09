import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { applyFields } from '../helpers';

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    font-weight: bold;
    padding-left: 16px;
    padding-right: 16px;
    ${props => css`
        background: ${props.styles.background ? props.theme.colors[props.styles.background[0] !== '{' ? props.styles.background : JSON.parse(props.styles.background).value].v : ''};
        color: ${props.styles.color ? props.theme.colors[props.styles.color[0] !== '{' ? props.styles.color : JSON.parse(props.styles.color).value].v : ''};
        max-width: ${props.styles.width ? props.theme['max-width'][props.styles.width].v : ''};
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? props.theme['padding-top'][props.styles.paddingTop].v : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? props.theme['padding-bottom'][props.styles.paddingBottom].v : ''};
        text-align: ${{ left: 'left', center: 'center', right: 'right' }[props.styles.align]};
        font-size: ${props.theme['caption']['size'][props.styles.size].v['standard']};
        @media (max-width: 640px) {
            font-size: ${props.theme['caption']['size'][props.styles.size].v['640']};
        }
        @media (max-width: 400px) {
            font-size: ${props.theme['caption']['size'][props.styles.size].v['400']};
        }
        @media (max-width: 350px) {
            font-size: ${props.theme['caption']['size'][props.styles.size].v['350']};
        }
        ${props.containerStyles || ''}
    `}
`;

function Caption(props) {
    return (
        <Container
            as={props.tag}
            dangerouslySetInnerHTML={{ __html: applyFields(props.__fieldsValue__, props.children) }}
            id={props.id || null}
            containerStyles={props.containerStyles}
            styles={{
                background: props.background,
                color: props.color,
                width: props.width,
                paddingBottom: props.paddingBottom,
                paddingTop: props.paddingTop,
                align: props.align,
                size: props.size
            }}
        />
    );
}

Caption.propTypes = {
    size: PropTypes.oneOf(['s', 'm', 'l']),
    tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'div']),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    width: PropTypes.oneOf(['l', 'm', 's']),
    id: PropTypes.string
};

Caption.defaultProps = {
    size: 'm',
    tag: 'div',
    paddingTop: 'm',
    paddingBottom: 'm',
    width: 'm',
    align: 'center'
};

export default memo(Caption);
