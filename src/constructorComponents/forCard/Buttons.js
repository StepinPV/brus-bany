import React, { memo } from 'react';
import PropTypes from "prop-types";
import styled from '@emotion/styled';
import Button from '../components/Button';
import { css } from '@emotion/core';

const Container = styled.div`
    display: flex;
    padding: 16px;
    ${props => css`
        ${props.containerStyles || ''}
    `}
`;

function Buttons(props) {
    return (
        <Container containerStyles={props.containerStyles}>
            {props.firstButton ? (
                <Button
                    color='{ "type": "base", "value": "black" }'
                    background='{ "type": "base", "value": "yellow" }'
                    size='s'
                    caption={props.firstButton}
                    type='button'
                    containerStyles={css`margin-right: 16px;`}
                    __fieldsValue__={props.__fieldsValue__} />
            ) : null}
            {props.secondButton ? (
                <Button
                    color='{ "type": "base", "value": "black" }'
                    background='{ "type": "base", "value": "yellow" }'
                    size='s'
                    caption={props.secondButton}
                    type='button'
                    __fieldsValue__={props.__fieldsValue__} />
            ) : null}
        </Container>
    );
}

Buttons.propTypes = {
    firstButton: PropTypes.string,
    secondButton: PropTypes.string
};

export default memo(Buttons);
