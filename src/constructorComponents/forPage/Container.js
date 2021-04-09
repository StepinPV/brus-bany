import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const ContainerElem = styled.div`
    ${props => css`
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? props.theme['padding-top'][props.styles.paddingTop].v : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? props.theme['padding-bottom'][props.styles.paddingBottom].v : ''};
        padding-left: ${props.styles.paddingLeft ? '16px' : ''};
        padding-right: ${props.styles.paddingRight ? '16px' : ''};
        background: ${props.styles.background ? props.theme.colors[props.styles.background[0] !== '{' ? props.styles.background : JSON.parse(props.styles.background).value].v : ''};
        ${props.containerStyles || ''}
    `}
`;

function Container(props) {
    return (
        <ContainerElem
            id={props.id || null}
            containerStyles={props.containerStyles}
            styles={{
                background: props.background,
                paddingBottom: props.paddingBottom,
                paddingTop: props.paddingTop,
                paddingLeft: props.paddingLeft,
                paddingRight: props.paddingRight
            }}>
            {props.children}
        </ContainerElem>
    );
}

Container.propTypes = {
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingLeft: PropTypes.bool,
    paddingRight: PropTypes.bool,
    background: PropTypes.string,
    containerStyles: PropTypes.object,
    id: PropTypes.string
};

Container.defaultProps = {
    paddingTop: 'm',
    paddingBottom: 'm',
    paddingLeft: true,
    paddingRight: true
};

export default memo(Container);
