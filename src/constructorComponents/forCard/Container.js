import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const ContainerElem = styled.div`
    padding-left: 16px;
    padding-right: 16px;
    ${props => css`
        flex-grow: ${props.styles.stretched ? '1' : ''};
        padding-top: ${props.styles.paddingTop && props.styles.paddingTop !== 'none' ? props.theme['padding-top'][props.styles.paddingTop].v : ''};
        padding-bottom: ${props.styles.paddingBottom && props.styles.paddingBottom !== 'none' ? props.theme['padding-bottom'][props.styles.paddingBottom].v : ''};
        background: ${props.styles.background ? props.theme.colors[props.styles.background[0] !== '{' ? props.styles.background : JSON.parse(props.styles.background).value].v : ''};
        ${props.containerStyles || ''}
    `}
`;

function Container(props) {
    return (
        <ContainerElem
            containerStyles={props.containerStyles}
            styles={{
                background: props.background,
                paddingBottom: props.paddingBottom,
                paddingTop: props.paddingTop,
                stretched: props.stretched
            }}>
            {props.children}
        </ContainerElem>
    );
}

Container.propTypes = {
    paddingTop: PropTypes.oneOf(['none', 's', 'm', 'l']),
    paddingBottom: PropTypes.oneOf(['none', 's', 'm', 'l']),
    background: PropTypes.string,
    containerStyles: PropTypes.object,
    stretched: PropTypes.bool
};

Container.defaultProps = {
    paddingTop: 'm',
    paddingBottom: 'm'
};

export default memo(Container);
