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
        max-width: ${props.styles.width ? { s: '728px', m: '1200px', l: '100%' }[props.styles.width] : ''};
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? { s: '16px', m: '32px', l: '48px' }[props.styles.paddingTop] : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? { s: '16px', m: '32px', l: '48px' }[props.styles.paddingBottom] : ''};
        text-align: ${{ left: 'left', center: 'center', right: 'right' }[props.styles.align]};
        font-size: ${{ s: '15px', m: '19px', l: '24px' }[props.styles.size]};
        line-height: ${{ s: '20px', m: '24px', l: '30px' }[props.styles.size]};
        @media (max-width: 400px) {
            font-size: ${{ s: '12px', m: '14px', l: '16px' }[props.styles.size]};
            line-height: ${{ s: '16px', m: '18px', l: '20px' }[props.styles.size]};
        }
        @media (max-width: 640px) {
            font-size: ${{ s: '13px', m: '16px', l: '20px' }[props.styles.size]};
            line-height: ${{ s: '16px', m: '18px', l: '20px' }[props.styles.size]};
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
