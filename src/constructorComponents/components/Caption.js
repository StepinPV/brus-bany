import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { applyFields } from '../helpers';

const Container = styled.div`
    font-weight: bold;
    ${props => css`
        color: ${props.styles.color ? props.theme.colors[props.styles.color[0] !== '{' ? props.styles.color : JSON.parse(props.styles.color).value].v : ''};
        font-size: ${props.theme['caption']['size'][props.styles.size].v['standard']};
        text-align: ${{ left: 'left', center: 'center', right: 'right' }[props.styles.align]};
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
            containerStyles={props.containerStyles}
            dangerouslySetInnerHTML={{ __html: applyFields(props.__fieldsValue__, props.children) }}
            styles={{
                color: props.color,
                size: props.size,
                align: props.align
            }}
        />
    );
}

Caption.propTypes = {
    size: PropTypes.oneOf(['s', 'm', 'l']),
    tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'div']),
    align: PropTypes.oneOf(['left', 'center', 'right']),
};

Caption.defaultProps = {
    size: 'm',
    tag: 'div',
    align: 'center'
};

export default memo(Caption);
