import React, { memo } from 'react';
import PropTypes from "prop-types";
import Button from '../components/Button';
import { css } from '@emotion/core';
import ContainerComponent from './Container';
import styled from '@emotion/styled';
import { applyFields } from '../helpers';

const SecondButton = styled.div`
    font-size: 13px;
    font-weight: bold;
    padding: 9px 12px;
    margin-right: 16px;
    border-radius: 4px;
    display: inline-block;
    text-align: center;
    color: #000;
    border: 1px solid #000;
`;

function Buttons(props) {
    return (
        <ContainerComponent
            stretched={props.stretched}
            paddingBottom={props.paddingBottom}
            paddingTop={props.paddingTop}
            background={props.containerBackground}>
            {props.firstButton ? (
                <Button
                    color={props.firstButtonColor}
                    background={props.firstButtonBg}
                    size='s'
                    caption={props.firstButton}
                    type='button'
                    containerStyles={css`margin-right: 16px;`}
                    __fieldsValue__={props.__fieldsValue__} />
            ) : null}
            {props.secondButton ? (
                <SecondButton
                    dangerouslySetInnerHTML={{ __html: applyFields(props.__fieldsValue__, props.secondButton) }} />
            ) : null}
        </ContainerComponent>
    );
}

Buttons.propTypes = {
    firstButton: PropTypes.string,
    secondButton: PropTypes.string,
    firstButtonColor: PropTypes.string,
    firstButtonBg: PropTypes.string
};

export default memo(Buttons);
