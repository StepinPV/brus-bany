import React, { memo } from 'react';
import PropTypes from "prop-types";
import Button from '../components/Button';
import { css } from '@emotion/core';
import ContainerComponent from "./Container";

function Buttons(props) {
    return (
        <ContainerComponent
            stretched={props.stretched}
            paddingBottom={props.paddingBottom}
            paddingTop={props.paddingTop}
            background={props.containerBackground}>
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
        </ContainerComponent>
    );
}

Buttons.propTypes = {
    firstButton: PropTypes.string,
    secondButton: PropTypes.string
};

export default memo(Buttons);
