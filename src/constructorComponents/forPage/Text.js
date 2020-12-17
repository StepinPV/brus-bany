import React, { memo } from 'react';
import PropTypes from "prop-types";
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { getColor, applyFields } from '../helpers';

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    padding-left: 16px;
    padding-right: 16px;
    ${props => css`
        background: ${getColor(props, 'background')};
        color: ${getColor(props)};
        max-width: ${props.styles.width ? props.theme['max-width'][props.styles.width].v : ''};
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? props.theme['padding-top'][props.styles.paddingTop].v : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? props.theme['padding-bottom'][props.styles.paddingBottom].v : ''};
        text-align: ${{ left: 'left', center: 'center', right: 'right' }[props.styles.align]};
        font-size: ${props.theme['text']['font-size'][props.styles.size].v['standard']};
        line-height: ${props.theme['text']['line-height'][props.styles.size].v['standard']};
        @media (max-width: 350px) {
            font-size: ${props.theme['text']['font-size'][props.styles.size].v['350']};
            line-height: ${props.theme['text']['line-height'][props.styles.size].v['350']};
        }
        @media (max-width: 400px) {
            font-size: ${props.theme['text']['font-size'][props.styles.size].v['400']};
            line-height: ${props.theme['text']['line-height'][props.styles.size].v['400']};
        }
        @media (max-width: 640px) {
            font-size: ${props.theme['text']['font-size'][props.styles.size].v['640']};
            line-height: ${props.theme['text']['line-height'][props.styles.size].v['640']};
        }
    `}
`;

function Text(props) {
    return (
        <Container
            styles={{
                background: props.background,
                color: props.color,
                width: props.width,
                paddingBottom: props.paddingBottom,
                paddingTop: props.paddingTop,
                align: props.align,
                size: props.size
            }}
            {...(props.id ? { id: props.id } : {})}
            dangerouslySetInnerHTML={{ __html: applyFields(props.__fieldsValue__, props.children) }}
        />
    );
}

Text.propTypes = {
    size: PropTypes.oneOf(['s', 'm', 'l']),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    width: PropTypes.oneOf(['s', 'm', 'l']),
    id: PropTypes.string
};

Text.defaultProps = {
    size: 'm',
    align: 'center',
    paddingTop: 'm',
    paddingBottom: 'm',
    width: 'm'
};

export default memo(Text);
