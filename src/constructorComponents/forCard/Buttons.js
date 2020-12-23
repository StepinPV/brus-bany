import React, { memo } from 'react';
import PropTypes from "prop-types";
import styled from '@emotion/styled';
import { Button } from '../index';
import { css } from '@emotion/core';

const Container = styled.div`
    display: flex;
    padding: 16px;
    ${props => css`
        ${props.containerStyles || ''}
    `}
`;

const ButtonContainer = styled.div`
    display: flex;
`;

function Buttons(props) {
    return (
        <Container containerStyles={props.containerStyles}>
            {props.firstButton ? (
                <ButtonContainer>
                    <Button
                        color='{ "type": "base", "value": "black" }'
                        background='{ "type": "base", "value": "yellow" }'
                        size='s'
                        paddingBottom='none'
                        paddingTop='none'
                        paddingLeft='none'
                        paddingRight='s'
                        caption={props.firstButton}
                        type='button'
                        __fieldsValue__={props.__fieldsValue__} />
                </ButtonContainer>
            ) : null}
            {props.secondButton ? (
                <ButtonContainer key='secondButton'>
                    <Button
                        color='{ "type": "base", "value": "black" }'
                        background='{ "type": "base", "value": "yellow" }'
                        size='s'
                        paddingBottom='none'
                        paddingTop='none'
                        paddingLeft='none'
                        paddingRight='none'
                        caption={props.secondButton}
                        type='button'
                        __fieldsValue__={props.__fieldsValue__} />
                </ButtonContainer>
            ) : null}
        </Container>
    );
}

Buttons.propTypes = {
    firstButton: PropTypes.string,
    secondButton: PropTypes.string
};

export default memo(Buttons);
