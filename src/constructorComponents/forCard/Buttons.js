import React, { memo } from 'react';
import PropTypes from "prop-types";
import styled from '@emotion/styled';
import { Button } from '../index';

const Container = styled.div`
    display: flex;
    padding: 16px;
`;

const ButtonContainer = styled.div`
    display: flex;
`;

function Buttons(props) {
    return (
        <Container>
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
                        type='button' />
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
                        type='button' />
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
