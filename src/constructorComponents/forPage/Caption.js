import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import ContainerComponent from './Container';
import CaptionComponent from '../components/Caption';

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    ${props => css`
        max-width: ${props.styles.width ? props.theme['max-width'][props.styles.width].v : ''};
    `}
`;

function Caption(props) {
    return (
        <ContainerComponent
            paddingLeft
            paddingRight
            id={props.id}
            paddingBottom={props.paddingBottom}
            paddingTop={props.paddingTop}
            background={props.containerBackground}>
            <Container styles={{ width: props.width }}>
                <CaptionComponent
                    children={props.children}
                    size={props.size}
                    color={props.color}
                    align={props.align}
                    tag={props.tag}
                    __fieldsValue__={props.__fieldsValue__} />
            </Container>
        </ContainerComponent>
    );
}

Caption.propTypes = {
    width: PropTypes.oneOf(['l', 'm', 's'])
};

Caption.defaultProps = {
    width: 'm'
};

export default memo(Caption);
