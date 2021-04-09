import React, { memo } from 'react';
import PropTypes from "prop-types";
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import TextComponent from '../components/Text';
import ContainerComponent from './Container';

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    ${props => css`
        max-width: ${props.styles.width ? props.theme['max-width'][props.styles.width].v : ''};
    `}
`;

function Text(props) {
    return (
        <ContainerComponent
            paddingLeft
            paddingRight
            id={props.id}
            paddingBottom={props.paddingBottom}
            paddingTop={props.paddingTop}
            background={props.containerBackground}>
            <Container styles={{ width: props.width }}>
                <TextComponent
                    children={props.children}
                    align={props.align}
                    size={props.size}
                    color={props.color}
                    __fieldsValue__={props.__fieldsValue__} />
            </Container>
        </ContainerComponent>
    );
}

Text.propTypes = {
    width: PropTypes.oneOf(['s', 'm', 'l'])
};

Text.defaultProps = {
    width: 'm'
};

export default memo(Text);
