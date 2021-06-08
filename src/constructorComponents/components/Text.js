import React, { memo } from 'react';
import PropTypes from "prop-types";
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { applyFields } from '../helpers';

const Container = styled.div`
    ${props => css`
        color: ${props.styles.color ? props.theme.colors[props.styles.color[0] !== '{' ? props.styles.color : JSON.parse(props.styles.color).value].v : ''};
        text-align: ${{ left: 'left', center: 'center', right: 'right' }[props.styles.align]};
        font-size: ${props.theme['text']['size'][props.styles.size].v['standard']['font-size']};
        line-height: ${props.theme['text']['size'][props.styles.size].v['standard']['line-height']};
        @media (max-width: 640px) {
            font-size: ${props.theme['text']['size'][props.styles.size].v['640']['font-size']};
            line-height: ${props.theme['text']['size'][props.styles.size].v['640']['line-height']};
        }
        @media (max-width: 400px) {
            font-size: ${props.theme['text']['size'][props.styles.size].v['400']['font-size']};
            line-height: ${props.theme['text']['size'][props.styles.size].v['400']['line-height']};
        }
        @media (max-width: 350px) {
            font-size: ${props.theme['text']['size'][props.styles.size].v['350']['font-size']};
            line-height: ${props.theme['text']['size'][props.styles.size].v['350']['line-height']};
        }
        ${props.containerStyles || ''}
    `}
`;

function Text(props) {
    return (
        <Container
            containerStyles={props.containerStyles}
            styles={{
                color: props.color,
                align: props.align,
                size: props.size
            }}
            dangerouslySetInnerHTML={{ __html: applyFields(props.__fieldsValue__, props.children) }}
        />
    );
}

Text.propTypes = {
    size: PropTypes.oneOf(['s', 'm', 'l']),
    align: PropTypes.oneOf(['left', 'center', 'right'])
};

Text.defaultProps = {
    size: 'm',
    align: 'center'
};

export default memo(Text);
