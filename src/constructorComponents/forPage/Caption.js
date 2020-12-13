import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { getColor } from '../helpers';

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    font-weight: bold;
    padding-left: 16px;
    padding-right: 16px;
    ${props => css`
        background: ${getColor(props, 'background')};
        color: ${getColor(props)};
        max-width: ${props.styles.width ? { s: '728px', m: '1200px', l: '100%' }[props.styles.width] : ''};
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? { s: '16px', m: '32px', l: '48px' }[props.styles.paddingTop] : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? { s: '16px', m: '32px', l: '48px' }[props.styles.paddingBottom] : ''};
        text-align: ${{ left: 'left', center: 'center', right: 'right' }[props.styles.align]};
        font-size: ${{ s: '26px', m: '42px', l: '52px' }[props.styles.size]};
        @media (max-width: 350px) {
            font-size: ${{ s: '14px', m: '22px', l: '28px' }[props.styles.size]};
        }
        @media (max-width: 400px) {
            font-size: ${{ s: '16px', m: '24px', l: '32px' }[props.styles.size]};
        }
        @media (max-width: 640px) {
            font-size: ${{ s: '22px', m: '30px', l: '38px' }[props.styles.size]};
        }
    `}
`;

function Caption(props) {
    return (
        <Container
            as={props.tag}
            dangerouslySetInnerHTML={{ __html: props.children }}
            id={props.id || null}
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
